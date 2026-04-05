import React from 'react';
import { User, Shield, Moon, Bell, DollarSign, Download, Trash2, LogOut, ChevronRight, Edit2 } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export const Settings = () => {
  const { 
    user,
    role, 
    setRole, 
    isDarkMode, 
    toggleDarkMode, 
    notificationsEnabled, 
    toggleNotifications,
    currency,
    setCurrency,
    setActiveModal,
    showToast
  } = useFinance();

  const handleExport = () => {
    showToast('Preparing full ledger export...');
    setTimeout(() => showToast('Export complete: sovereign_ledger_2023.csv'), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ backgroundColor: isDarkMode ? '#000' : '#fff' }}
      className="max-w-xl mx-auto space-y-10 min-h-screen transition-colors"
    >
      {/* Profile Hero */}
      <section className="flex flex-col items-center text-center space-y-4">
        <div className="relative">
          <div className="w-28 h-28 rounded-full border-4 border-gray-300 shadow-sm overflow-hidden">
            <img
              src={user?.avatar || "https://www.flaticon.com/free-icons/profile-image"}
              alt={user?.name || "User Avatar"}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <button
            onClick={() => setActiveModal('PROFILE_EDIT')}
            className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg border-2 border-white hover:scale-110 transition-transform active:scale-95"
          >
            <Edit2 className="w-3 h-3" />
          </button>
        </div>
        <div>
          <h2 className="text-3xl font-headline font-extrabold tracking-tight"
              style={{ color: isDarkMode ? '#fff' : '#111' }}>
            {user?.name || "Alex Johnson"}
          </h2>
          <p className="font-medium text-sm"
             style={{ color: isDarkMode ? '#aaa' : '#555' }}>
            {user?.email || "alex.johnson@equilibrium.io"}
          </p>
          <div className="mt-4 inline-flex items-center px-3 py-1 bg-tertiary/10 text-tertiary rounded-full text-[10px] font-bold tracking-widest uppercase">
            Member since Oct 2023
          </div>
        </div>
      </section>


      <section className="space-y-4">
        <h3 className="text-[10px] font-bold uppercase tracking-widest px-1"
            style={{ color: isDarkMode ? '#aaa' : '#555' }}>
          Identity & Access
        </h3>
        <div style={{ backgroundColor: isDarkMode ? '#121212' : '#f9f9f9' }}
             className="rounded-2xl p-6 space-y-4 border border-gray-300">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm"
                  style={{ color: isDarkMode ? '#fff' : '#111' }}>
              User Role
            </span>
            <div className="flex bg-gray-200 p-1 rounded-xl">
              {['Viewer', 'Admin'].map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setRole(r);
                    showToast(`Role switched to ${r}`);
                  }}
                  className={cn(
                    "px-6 py-1.5 rounded-lg text-xs font-bold transition-all",
                    role === r 
                      ? "bg-white shadow-sm" 
                      : "text-gray-500 hover:text-gray-900"
                  )}
                  style={{
                    backgroundColor: role === r ? (isDarkMode ? '#000' : '#fff') : 'transparent',
                    color: role === r ? '#3b82f6' : (isDarkMode ? '#aaa' : '#555')
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <p className="text-xs leading-relaxed font-medium"
             style={{ color: isDarkMode ? '#aaa' : '#555' }}>
            Switch to Admin to add or edit transactions. This will grant elevated permissions for ledger management.
          </p>
        </div>
      </section>


      <section className="space-y-4">
        <h3 className="text-[10px] font-bold uppercase tracking-widest px-1"
            style={{ color: isDarkMode ? '#aaa' : '#555' }}>
          Preferences
        </h3>
        <div style={{ backgroundColor: isDarkMode ? '#121212' : '#fff' }}
             className="rounded-2xl divide-y divide-gray-200 border border-gray-300 shadow-sm overflow-hidden">
          {[
            { label: 'Dark Mode', icon: Moon, type: 'toggle', active: isDarkMode, action: toggleDarkMode },
            { label: 'Push Notifications', icon: Bell, type: 'toggle', active: notificationsEnabled, action: toggleNotifications },
            { label: 'Default Currency', icon: DollarSign, type: 'select', value: currency, action: (val) => setCurrency(val) },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between p-5 hover:bg-gray-100 transition-colors"
                 style={{ backgroundColor: isDarkMode ? '#1a1a1a' : 'transparent' }}>
              <div className="flex items-center gap-4">
                <div style={{ backgroundColor: isDarkMode ? '#222' : '#e5e5e5' }}
                     className="w-10 h-10 flex items-center justify-center rounded-xl text-primary">
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="font-bold text-sm" style={{ color: isDarkMode ? '#fff' : '#111' }}>{item.label}</span>
              </div>
              {item.type === 'toggle' ? (
                <div 
                  onClick={item.action}
                  className={cn(
                    "w-11 h-6 rounded-full transition-colors relative cursor-pointer",
                    item.active ? "bg-primary" : "bg-gray-300"
                  )}
                >
                  <div className={cn(
                    "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                    item.active ? "left-6" : "left-1"
                  )} />
                </div>
              ) : (
                <select 
                  value={item.value}
                  onChange={(e) => item.action(e.target.value)}
                  className="bg-transparent border-none text-xs font-bold focus:ring-0 outline-none cursor-pointer text-right"
                  style={{ color: isDarkMode ? '#fff' : '#111' }}
                >
                  <option value="USD ($)">USD ($)</option>
                  <option value="EUR (€)">EUR (€)</option>
                  <option value="GBP (£)">GBP (£)</option>
                </select>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4 pt-4">
        <button 
          onClick={handleExport}
          style={{ backgroundColor: isDarkMode ? '#121212' : '#fff' }}
          className="w-full flex items-center justify-between p-5 border border-gray-300 rounded-2xl hover:bg-gray-100 transition-all group active:scale-[0.98]"
        >
          <div className="flex items-center gap-4">
            <Download className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
            <span style={{ color: isDarkMode ? '#fff' : '#111' }} className="font-bold text-sm">Export Transaction History (CSV)</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        <button 
          onClick={() => setActiveModal('CLEAR_CACHE')}
          style={{ backgroundColor: isDarkMode ? '#121212' : '#fff' }}
          className="w-full flex items-center justify-between p-5 border border-gray-300 rounded-2xl hover:bg-gray-100 transition-all group active:scale-[0.98]"
        >
          <div className="flex items-center gap-4">
            <Trash2 className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
            <span style={{ color: isDarkMode ? '#fff' : '#111' }} className="font-bold text-sm">Clear App Cache</span>
          </div>
          <span className="text-[10px] font-mono font-bold" style={{ color: isDarkMode ? '#aaa' : '#555' }}>128MB</span>
        </button>

        <button 
          onClick={() => setActiveModal('SIGN_OUT')}
          className="w-full mt-8 bg-red-600 text-white py-4 px-6 rounded-full font-bold text-lg flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-red-300/20 hover:bg-opacity-90"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>

        <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] pt-4"
           style={{ color: isDarkMode ? '#aaa' : '#555' }}>
          Equilibrium Finance v2.4.1 (Stable Build)
        </p>
      </section>
    </motion.div>
  );
};