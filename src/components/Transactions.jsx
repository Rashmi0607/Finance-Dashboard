import React, { useState } from 'react';
import { Search, Filter, ArrowUpDown, Plus, ReceiptText, TrendingUp } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export const Transactions = () => {
  const { transactions, role, setActiveModal, showToast } = useFinance();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('desc');

  const filteredTransactions = transactions
    .filter(t => {
      const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || 
                           t.category.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === 'All' || 
                           (filter === 'Income' && t.type === 'Income') || 
                           (filter === 'Expenses' && t.type === 'Expense');
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

  const handleExport = (format) => {
    showToast(`Exporting history as ${format}...`);
    setTimeout(() => showToast(`Download complete: transactions.${format.toLowerCase()}`), 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <section>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl font-headline font-bold tracking-tight text-primary mb-2">Transactions</h2>
            <p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest">Movement of Capital • October 2023</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search entries..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-surface-container-low border-none rounded-full py-3 pl-12 pr-6 w-full md:w-64 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              />
            </div>
            {role === 'Admin' && (
              <button 
                onClick={() => setActiveModal('ADD_TRANSACTION')}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-bold transition-transform active:scale-95 shadow-lg shadow-primary/20"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden md:inline">Record Entry</span>
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {['All', 'Income', 'Expenses'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-5 py-2 rounded-full font-bold text-xs transition-all",
                filter === f 
                  ? "bg-primary text-white" 
                  : "bg-surface-container-highest text-on-surface-variant hover:bg-surface-container-high"
              )}
            >
              {f === 'All' ? 'All Capital' : f}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 bg-surface-container-low px-4 py-2 rounded-xl">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">Sorted By:</span>
          <div 
            onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
            className="flex items-center gap-1 text-xs font-bold text-primary cursor-pointer select-none"
          >
            <span>{sortOrder === 'desc' ? 'Newest Date' : 'Oldest Date'}</span>
            <ArrowUpDown className={cn("w-3 h-3 transition-transform", sortOrder === 'asc' && "rotate-180")} />
          </div>
        </div>
      </section>

      <div className="bg-white rounded-2xl overflow-hidden border border-surface-container-high shadow-sm">
        <div className="divide-y divide-surface-container-low">
          {filteredTransactions.map((t) => (
            <div 
              key={t.id} 
              onClick={() => showToast(`Transaction: ${t.title}`)}
              className="p-6 hover:bg-surface-container-low transition-colors flex items-center justify-between group cursor-pointer active:bg-surface-container-high"
            >
              <div className="flex items-center gap-6">
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105",
                  t.type === 'Income' ? "bg-tertiary-fixed text-tertiary" : "bg-primary/10 text-primary"
                )}>
                  <ReceiptText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-primary tracking-tight">{t.title}</h4>
                  <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest">{t.category} • {new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
              </div>
              <div className="text-right">
                <div className={cn(
                  "text-xl font-bold font-headline",
                  t.type === 'Income' ? "text-tertiary" : "text-error"
                )}>
                  {t.type === 'Income' ? '+' : '-'}${Math.abs(t.amount).toFixed(2)}
                </div>
                <div className={cn(
                  "text-[9px] font-bold uppercase tracking-widest mt-1",
                  t.status === 'Cleared' ? "text-tertiary" : "text-on-surface-variant"
                )}>
                  {t.status}
                </div>
              </div>
            </div>
          ))}
          {filteredTransactions.length === 0 && (
            <div className="p-12 text-center text-on-surface-variant">
              No transactions found matching your criteria.
            </div>
          )}
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-primary p-8 rounded-2xl text-white relative overflow-hidden shadow-xl shadow-primary/10">
          <div className="relative z-10">
            <h5 className="text-[10px] uppercase tracking-widest opacity-70 mb-1 font-bold">Inbound Capital</h5>
            <p className="text-3xl font-bold font-headline">$16,750.00</p>
            <div className="mt-4 flex items-center gap-2 text-xs text-tertiary-fixed font-bold">
              <TrendingUp className="w-3 h-3" />
              <span>12.4% vs last month</span>
            </div>
          </div>
          <ReceiptText className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 rotate-12" />
        </div>
        <div className="bg-surface-container-highest p-8 rounded-2xl relative overflow-hidden border border-surface-container-high">
          <div className="relative z-10">
            <h5 className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1 font-bold">Allocated Capital</h5>
            <p className="text-3xl font-bold font-headline text-primary">$8,484.30</p>
            <div className="mt-4 flex items-center gap-2 text-xs text-error font-bold">
              <ArrowUpDown className="w-3 h-3" />
              <span>4.2% vs last month</span>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-low p-8 rounded-2xl flex flex-col justify-center border border-surface-container-high">
          <h5 className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-4 font-bold">Quick Export</h5>
          <div className="flex gap-2">
            {['CSV', 'PDF', 'OFX'].map(ext => (
              <button 
                key={ext} 
                onClick={() => handleExport(ext)}
                className="flex-1 py-3 bg-white hover:bg-surface-container-highest border border-surface-container-high rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all active:scale-95"
              >
                {ext}
              </button>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};
