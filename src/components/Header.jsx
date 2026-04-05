import React, { useState, useRef, useEffect } from "react";
import { Bell, BellOff, Check, Info } from "lucide-react";
import { useFinance } from "../context/FinanceContext";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

export const Header = () => {
  const {
    unreadNotifications,
    notificationsEnabled,
    clearNotifications,
    role,
  } = useFinance();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifications = [
    {
      id: 1,
      title: "New Transaction",
      message: "A new income of $2,500 was recorded.",
      time: "2m ago",
      type: "success",
    },
    {
      id: 2,
      title: "Budget Alert",
      message: "You have reached 80% of your Housing budget.",
      time: "1h ago",
      type: "warning",
    },
    {
      id: 3,
      title: "System Update",
      message: "Equilibrium Finance v2.4.1 is now live.",
      time: "5h ago",
      type: "info",
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-surface-container-high">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-highest">
            <img
              src="https://www.flaticon.com/free-icons/profile-image"
              alt="Profile"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold font-headline tracking-tight text-primary">
              User 
            </h1>
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
              {role} Access
            </p>
          </div>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="p-2 rounded-full hover:bg-surface-container-low transition-colors relative group"
            title={
              notificationsEnabled
                ? "View notifications"
                : "Notifications disabled"
            }
          >
            {notificationsEnabled ? (
              <motion.div
                animate={
                  unreadNotifications > 0
                    ? {
                        rotate: [0, -10, 10, -10, 10, 0],
                        transition: {
                          repeat: Infinity,
                          duration: 2,
                          repeatDelay: 3,
                        },
                      }
                    : {}
                }
              >
                <Bell className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
              </motion.div>
            ) : (
              <BellOff className="w-5 h-5 text-on-surface-variant/50" />
            )}

            <AnimatePresence>
              {notificationsEnabled && unreadNotifications > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute top-2 right-2 flex items-center justify-center min-w-3 h-3 px-1 bg-error text-[8px] font-bold text-white rounded-full border-2 border-white"
                >
                  {unreadNotifications > 9 ? "9+" : unreadNotifications}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-surface-container-high overflow-hidden z-50"
              >
                <div className="p-4 bg-surface-container-low border-b border-surface-container-high flex justify-between items-center">
                  <h3 className="font-bold text-sm text-primary">
                    Notifications
                  </h3>
                  {unreadNotifications > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        clearNotifications();
                      }}
                      className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="max-h-96 overflow-y-auto divide-y divide-surface-container-low">
                  {notificationsEnabled ? (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className="p-4 hover:bg-surface-container-low transition-colors cursor-pointer group"
                      >
                        <div className="flex gap-3">
                          <div
                            className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                              n.type === "success"
                                ? "bg-tertiary/10 text-tertiary"
                                : n.type === "warning"
                                  ? "bg-error/10 text-error"
                                  : "bg-primary/10 text-primary",
                            )}
                          >
                            {n.type === "success" ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Info className="w-4 h-4" />
                            )}
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between items-center">
                              <h4 className="text-xs font-bold text-on-surface">
                                {n.title}
                              </h4>
                              <span className="text-[9px] text-on-surface-variant font-medium">
                                {n.time}
                              </span>
                            </div>
                            <p className="text-[11px] text-on-surface-variant leading-relaxed">
                              {n.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center space-y-2">
                      <BellOff className="w-8 h-8 text-on-surface-variant/30 mx-auto" />
                      <p className="text-xs text-on-surface-variant font-medium">
                        Notifications are currently disabled in settings.
                      </p>
                    </div>
                  )}
                </div>
                {notificationsEnabled && (
                  <div className="p-3 bg-surface-container-low text-center border-t border-surface-container-high">
                    <button className="text-[10px] font-bold text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest">
                      View all activity
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
