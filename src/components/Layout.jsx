import React from 'react';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { useFinance } from '../context/FinanceContext';
import { Plus } from 'lucide-react';

export const Layout = ({ children, activeTab, setActiveTab }) => {
  const { setActiveModal, role } = useFinance();

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />


      {role === 'Admin' && (
        <div className="hidden md:flex fixed right-8 bottom-8 flex-col gap-4">
          <button 
            onClick={() => setActiveModal('ADD_TRANSACTION')}
            className="w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 group"
            title="Record Entry"
          >
            <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>
      )}
    </div>
  );
};
