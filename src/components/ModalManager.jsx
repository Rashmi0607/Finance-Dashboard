import React, { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import { X, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
export const ModalManager = () => {
  const { activeModal, setActiveModal, addTransaction, showToast } =
    useFinance();

  const [newTx, setNewTx] = useState({
    title: "",
    category: "Food",
    amount: "",
    type: "Expense",
  });

  if (!activeModal) return null;

  const closeModal = () => setActiveModal(null);

  const handleAddTx = (e) => {
    e.preventDefault();
    if (!newTx.title || !newTx.amount) return;

    addTransaction({
      id: Math.random().toString(36).substr(2, 9),
      title: newTx.title,
      category: newTx.category,
      amount: parseFloat(newTx.amount) * (newTx.type === "Expense" ? -1 : 1),
      date: new Date().toISOString().split("T")[0],
      status: "Cleared",
      type: newTx.type,
    });
    closeModal();
  };

  const renderModalContent = () => {
    switch (activeModal) {
      case "ADD_TRANSACTION":
        return (
          <div className="p-8 space-y-6">
            <h3 className="text-2xl font-headline font-extrabold text-primary">
              Record New Entry
            </h3>
            <form onSubmit={handleAddTx} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1 block">
                  Title
                </label>
                <input
                  type="text"
                  value={newTx.title}
                  onChange={(e) =>
                    setNewTx({ ...newTx, title: e.target.value })
                  }
                  className="w-full bg-surface-container-low border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="e.g. Weekly Groceries"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1 block">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={newTx.amount}
                    onChange={(e) =>
                      setNewTx({ ...newTx, amount: e.target.value })
                    }
                    className="w-full bg-surface-container-low border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                    placeholder="0.00"
                    step="0.01"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1 block">
                    Type
                  </label>
                  <select
                    value={newTx.type}
                    onChange={(e) =>
                      setNewTx({ ...newTx, type: e.target.value })
                    }
                    className="w-full bg-surface-container-low border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                  >
                    <option value="Expense">Expense</option>
                    <option value="Income">Income</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1 block">
                  Category
                </label>
                <select
                  value={newTx.category}
                  onChange={(e) =>
                    setNewTx({ ...newTx, category: e.target.value })
                  }
                  className="w-full bg-surface-container-low border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                >
                  <option value="Food">Food</option>
                  <option value="Housing">Housing</option>
                  <option value="Transport">Transport</option>
                  <option value="Leisure">Leisure</option>
                  <option value="Investments">Investments</option>
                  <option value="Professional Services">
                    Professional Services
                  </option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-4 rounded-full font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all"
              >
                Confirm Entry
              </button>
            </form>
          </div>
        );
      case "INVEST":
        return (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
              <Info className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-headline font-extrabold text-primary">
              Investment Portal
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Redirecting to your brokerage account. Please ensure your
              multi-factor authentication is active.
            </p>
            <button
              onClick={closeModal}
              className="w-full bg-primary text-white py-4 rounded-full font-bold active:scale-95 transition-all"
            >
              Proceed to Brokerage
            </button>
          </div>
        );
      case "SAVINGS_GOAL":
        return (
          <div className="p-8 space-y-6">
            <h3 className="text-2xl font-headline font-extrabold text-primary">
              Set Savings Goal
            </h3>
            <div className="space-y-4">
              <input
                type="number"
                placeholder="Target Amount"
                className="w-full bg-surface-container-low border-none rounded-xl p-4 text-sm outline-none"
              />
              <input
                type="text"
                placeholder="Goal Name (e.g. New Car)"
                className="w-full bg-surface-container-low border-none rounded-xl p-4 text-sm outline-none"
              />
              <button
                onClick={() => {
                  showToast("Savings goal set!");
                  closeModal();
                }}
                className="w-full bg-primary text-white py-4 rounded-full font-bold active:scale-95 transition-all"
              >
                Save Goal
              </button>
            </div>
          </div>
        );
      case "SIGN_OUT":
        return (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-error/10 text-error rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-headline font-extrabold text-on-surface">
              Sign Out?
            </h3>
            <p className="text-on-surface-variant text-sm">
              Are you sure you want to end your session? All unsaved local
              changes will be lost.
            </p>
            <div className="flex gap-4">
              <button
                onClick={closeModal}
                className="flex-1 py-4 bg-surface-container-highest rounded-full font-bold text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  showToast("Signed out successfully");
                  closeModal();
                }}
                className="flex-1 py-4 bg-error text-white rounded-full font-bold text-sm"
              >
                Sign Out
              </button>
            </div>
          </div>
        );
      case "CLEAR_CACHE":
        return (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-headline font-extrabold text-on-surface">
              Clear Cache
            </h3>
            <p className="text-on-surface-variant text-sm">
              This will clear 128MB of local data. The app will reload to apply
              changes.
            </p>
            <button
              onClick={() => {
                showToast("Cache cleared");
                closeModal();
              }}
              className="w-full bg-primary text-white py-4 rounded-full font-bold active:scale-95 transition-all"
            >
              Confirm Purge
            </button>
          </div>
        );
      case "PROFILE_EDIT":
        return (
          <div className="p-8 space-y-6">
            <h3 className="text-2xl font-headline font-extrabold text-primary">
              Edit Profile
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                defaultValue="Alex Johnson"
                className="w-full bg-surface-container-low border-none rounded-xl p-4 text-sm outline-none"
              />
              <input
                type="email"
                defaultValue="alex.johnson@equilibrium.io"
                className="w-full bg-surface-container-low border-none rounded-xl p-4 text-sm outline-none"
              />
              <button
                onClick={() => {
                  showToast("Profile updated");
                  closeModal();
                }}
                className="w-full bg-primary text-white py-4 rounded-full font-bold active:scale-95 transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-surface-container-low transition-colors"
          >
            <X className="w-5 h-5 text-on-surface-variant" />
          </button>
          {renderModalContent()}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
