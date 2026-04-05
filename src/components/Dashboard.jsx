import React from 'react';
import { TrendingUp, ArrowDown, ArrowUp, Plus, ReceiptText } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TREND_DATA, CATEGORY_DATA } from '../constants';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useFinance } from '../context/FinanceContext';

export const Dashboard = ({ setActiveTab }) => {
  const { setActiveModal, showToast } = useFinance();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12"
    >
      {/* Hero Summary */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 bg-linear-to-br from-primary to-primary-container p-8 rounded-2xl text-white flex flex-col justify-between min-h-70 shadow-xl shadow-primary/10">
          <div>
            <p className="text-xs uppercase tracking-widest opacity-70 mb-2 font-medium">Total Balance</p>
            <h2 className="text-5xl md:text-6xl font-headline font-extrabold tracking-tighter">$12,450.25</h2>
          </div>
          <div className="flex items-center gap-4 mt-8">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-semibold">+4.2% from last month</span>
            </div>
            <button 
              onClick={() => setActiveModal('INVEST')}
              className="bg-white text-primary px-6 py-2 rounded-full font-bold text-sm hover:bg-opacity-90 transition-all active:scale-95"
            >
              Invest Now
            </button>
          </div>
        </div>

        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl flex items-center gap-4 shadow-sm border border-surface-container-high">
            <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary">
              <ArrowDown className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Monthly Income</p>
              <p className="text-2xl font-headline font-bold text-on-surface">$4,500.00</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl flex items-center gap-4 shadow-sm border border-surface-container-high">
            <div className="w-12 h-12 rounded-full bg-error-container flex items-center justify-center text-error">
              <ArrowUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Monthly Expenses</p>
              <p className="text-2xl font-headline font-bold text-on-surface">$2,150.75</p>
            </div>
          </div>
          <div 
            onClick={() => setActiveModal('SAVINGS_GOAL')}
            className="bg-secondary-container p-6 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-opacity-80 transition-all active:scale-95"
          >
            <span className="text-sm font-bold text-on-secondary-container">Set Savings Goal</span>
            <Plus className="w-5 h-5 text-on-secondary-container" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-surface-container-high shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-headline font-bold text-on-surface">Balance Trend</h3>
            <div className="flex gap-2 bg-surface-container-low p-1 rounded-lg">
              <button className="px-3 py-1 bg-white text-[10px] font-bold rounded-md shadow-sm">30 Days</button>
              <button className="px-3 py-1 text-[10px] font-bold text-on-surface-variant">90 Days</button>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TREND_DATA}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00342b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00342b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#edeeef" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#3f4945' }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="balance" 
                  stroke="#00342b" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorBalance)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-surface-container-high shadow-sm">
          <h3 className="text-xl font-headline font-bold text-on-surface mb-8">Categories</h3>
          <div className="space-y-6">
            {CATEGORY_DATA.map((cat) => (
              <div key={cat.name}>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-on-surface">{cat.name}</span>
                  <span className="text-on-surface-variant">${cat.value}</span>
                </div>
                <div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="bg-primary h-full rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setActiveTab('insights')}
            className="w-full mt-10 py-3 text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/10 rounded-full hover:bg-primary/5 transition-colors active:scale-95"
          >
            View Full Analysis
          </button>
        </div>
      </div>

      {/* Recent Activity Mini-List */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <h3 className="text-2xl font-headline font-bold text-on-surface">Recent Activity</h3>
          <button 
            onClick={() => setActiveTab('transactions')}
            className="text-sm font-bold text-primary hover:underline"
          >
            View All History
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Apple Store Soho', cat: 'Leisure', time: '2 hours ago', amount: -149.00, type: 'Expense' },
            { title: 'Monthly Salary', cat: 'Income', time: '1 day ago', amount: 4500.00, type: 'Income' },
            { title: 'The Green Bistro', cat: 'Food', time: '2 days ago', amount: -84.20, type: 'Expense' },
          ].map((item, i) => (
            <div 
              key={i} 
              onClick={() => showToast(`Details for ${item.title}`)}
              className="bg-white p-5 rounded-2xl flex items-center gap-4 group hover:bg-surface-container-low transition-all cursor-pointer border border-transparent hover:border-surface-container-high active:scale-[0.98]"
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                item.type === 'Income' ? "bg-tertiary/10 text-tertiary" : "bg-primary/10 text-primary"
              )}>
                <ReceiptText className="w-5 h-5" />
              </div>
              <div className="grow">
                <p className="text-sm font-bold text-on-surface">{item.title}</p>
                <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-wider">{item.cat} • {item.time}</p>
              </div>
              <div className="text-right">
                <p className={cn(
                  "text-sm font-bold font-headline",
                  item.type === 'Income' ? "text-tertiary" : "text-error"
                )}>
                  {item.type === 'Income' ? '+' : '-'}${Math.abs(item.amount).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};
