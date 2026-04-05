import React from 'react';
import { Home, TrendingDown, Lightbulb, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useFinance } from '../context/FinanceContext';

export const Insights = () => {
  const { showToast } = useFinance();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-12"
    >
      <section>
        <span className="text-primary font-bold tracking-widest uppercase text-[10px]">Financial Intelligence</span>
        <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-on-background mt-2 tracking-tight">Equilibrium Finance</h2>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-surface-container-highest p-8 rounded-2xl relative overflow-hidden group">
            <div className="relative z-10">
              <span className="text-on-surface-variant font-bold text-[10px] uppercase tracking-widest">Highest Category</span>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-4xl font-headline font-bold text-on-background">Housing</span>
                <span className="text-xl font-headline text-primary font-bold">40%</span>
              </div>
              <p className="mt-4 text-on-surface-variant leading-relaxed text-sm">
                Your primary expenditure remains focused on residential stability. This is consistent with premium urban living standards.
              </p>
            </div>
            <Home className="absolute top-4 right-4 w-24 h-24 opacity-5 group-hover:scale-110 transition-transform duration-500" />
          </div>

          <div className="bg-white p-8 rounded-2xl border border-surface-container-high shadow-sm">
            <span className="text-on-surface-variant font-bold text-[10px] uppercase tracking-widest">Monthly Variance</span>
            <div className="mt-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary">
                <TrendingDown className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-headline font-bold text-on-background">12% Lower</span>
                <p className="text-on-surface-variant text-xs font-medium">Compared to last month</p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-surface-container-low">
              <div className="flex justify-between text-xs mb-2 font-bold">
                <span className="text-on-surface-variant">Efficiency Score</span>
                <span className="text-tertiary">92/100</span>
              </div>
              <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '92%' }}
                  className="h-full bg-tertiary" 
                />
              </div>
            </div>
          </div>

          <div className="bg-primary-container p-8 rounded-2xl text-white relative overflow-hidden shadow-xl shadow-primary/10">
            <div className="flex items-start justify-between mb-8">
              <div className="p-3 bg-primary rounded-xl">
                <Lightbulb className="w-6 h-6 fill-current" />
              </div>
              <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Smart Savings</span>
            </div>
            <h3 className="text-2xl font-headline font-bold mb-4">Subscription Audit</h3>
            <p className="text-white/80 leading-relaxed mb-6 text-sm italic">
              "Great work! You spent <span className="text-white font-bold">$150 less</span> on subscriptions this month by consolidating streaming services."
            </p>
            <button 
              onClick={() => showToast('Subscription audit details: 3 duplicate services removed.')}
              className="w-full py-4 bg-white text-primary font-bold rounded-full transition-all active:scale-95 hover:bg-opacity-90"
            >
              View Details
            </button>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-8">
          <div className="bg-surface-container-low p-8 rounded-2xl border border-surface-container-high">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
              <div>
                <h3 className="text-xl font-headline font-bold text-on-background">Income vs. Expenses</h3>
                <p className="text-on-surface-variant text-xs font-medium">Bi-annual comparative performance</p>
              </div>
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary"></span>
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Income</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-secondary-fixed-dim"></span>
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Expenses</span>
                </div>
              </div>
            </div>
            
            <div className="h-80 flex items-end justify-between gap-4 pb-4">
              {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'].map((month, i) => (
                <div key={month} className="flex-1 flex flex-col items-center gap-3 h-full justify-end">
                  <div className="w-full flex justify-center items-end gap-1.5 h-full">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${[85, 75, 90, 80, 95, 100][i]}%` }}
                      className="w-4 bg-primary rounded-t-sm" 
                    />
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${[60, 55, 45, 70, 50, 40][i]}%` }}
                      className="w-4 bg-secondary-fixed-dim rounded-t-sm" 
                    />
                  </div>
                  <span className="text-[10px] font-bold text-on-surface-variant tracking-tighter">{month}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface-container-highest p-8 rounded-2xl">
              <div className="flex justify-between items-start mb-6">
                <h4 className="font-headline font-bold text-on-background">Asset Allocation</h4>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <ArrowRight className="w-4 h-4 -rotate-45" />
                </div>
              </div>
              <ul className="space-y-4">
                {[
                  { label: 'Liquid Cash', value: '$42,500' },
                  { label: 'Investments', value: '$128,900' },
                  { label: 'Real Estate', value: '$450,000' },
                ].map(item => (
                  <li key={item.label} className="flex justify-between items-center">
                    <span className="text-sm text-on-surface-variant font-medium">{item.label}</span>
                    <span className="font-headline font-bold text-on-surface">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-surface-container-high shadow-sm">
              <h4 className="font-headline font-bold text-on-background mb-6">Financial Health</h4>
              <div className="space-y-8">
                {[
                  { label: 'Debt-to-Income', value: '14%', color: 'bg-primary' },
                  { label: 'Savings Rate', value: '38%', color: 'bg-tertiary' },
                ].map(item => (
                  <div key={item.label}>
                    <div className="flex justify-between mb-2">
                      <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">{item.label}</span>
                      <span className="text-xs font-bold text-on-surface">{item.value}</span>
                    </div>
                    <div className="w-full h-1 bg-surface-container rounded-full">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: item.value }}
                        className={cn("h-full rounded-full", item.color)} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
