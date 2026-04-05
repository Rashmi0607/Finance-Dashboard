import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_TRANSACTIONS } from '../constants';

const FinanceContext = createContext(undefined);

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
  const [role, setRole] = useState('Viewer');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [currency, setCurrency] = useState('USD ($)');
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [activeModal, setActiveModal] = useState(null);
  const [toast, setToast] = useState(null);

  const addTransaction = (t) => {
    setTransactions(prev => [t, ...prev]);
    setUnreadNotifications(prev => prev + 1);
    showToast('Transaction recorded successfully');
  };

  const clearNotifications = () => {
    setUnreadNotifications(0);
    showToast('Notifications cleared');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(prev => !prev);
    showToast(`Notifications ${!notificationsEnabled ? 'enabled' : 'disabled'}`);
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <FinanceContext.Provider value={{ 
      transactions, 
      role, 
      isDarkMode,
      notificationsEnabled,
      unreadNotifications,
      currency,
      activeModal,
      setRole, 
      addTransaction,
      toggleDarkMode,
      toggleNotifications,
      clearNotifications,
      setCurrency,
      setActiveModal,
      showToast
    }}>
      {children}
      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-100 bg-primary text-white px-6 py-3 rounded-full shadow-2xl font-bold text-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
          {toast}
        </div>
      )}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) throw new Error('useFinance must be used within FinanceProvider');
  return context;
};
