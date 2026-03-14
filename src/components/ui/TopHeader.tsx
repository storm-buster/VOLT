'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, User, X, Zap, TrendingDown, AlertTriangle, Leaf, IndianRupee, Clock } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface Notification {
  id: string;
  type: 'alert' | 'saving' | 'info';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'alert',
    title: 'Peak Tariff Alert!',
    message: 'Tariff shifted to ₹8.5/kWh. Avoid heavy appliances for the next 2 hours.',
    time: '2 min ago',
    read: false,
  },
  {
    id: '2',
    type: 'saving',
    title: 'You saved ₹47 today!',
    message: 'Smart scheduling saved you ₹47 by shifting your geyser to Sasta tariff hours.',
    time: '1 hr ago',
    read: false,
  },
  {
    id: '3',
    type: 'info',
    title: 'Weekly Report Ready',
    message: 'Your weekly energy report shows 23% savings over baseline. Keep it up!',
    time: '3 hrs ago',
    read: true,
  },
  {
    id: '4',
    type: 'saving',
    title: 'Monthly savings: ₹1,240',
    message: 'You\'re the #3 saver in your colony this month. ₹1,240 saved vs baseline.',
    time: '1 day ago',
    read: true,
  },
  {
    id: '5',
    type: 'alert',
    title: 'AC running during Peak',
    message: 'Your AC has been running for 3 hours during peak tariff. Consider reducing temperature.',
    time: '1 day ago',
    read: true,
  },
  {
    id: '6',
    type: 'info',
    title: 'CO₂ Milestone!',
    message: 'You\'ve saved 100 kg of CO₂ this quarter — equivalent to planting 5 trees! 🌳',
    time: '2 days ago',
    read: true,
  },
];

const typeConfig = {
  alert: { icon: AlertTriangle, color: 'text-volt-red', bg: 'bg-red-50', border: 'border-red-200/50' },
  saving: { icon: IndianRupee, color: 'text-volt-green', bg: 'bg-green-50', border: 'border-green-200/50' },
  info: { icon: Zap, color: 'text-volt-blue', bg: 'bg-blue-50', border: 'border-blue-200/50' },
};

export function TopHeader() {
  const pathname = usePathname();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Don't show on landing page
  if (pathname === '/') return null;

  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  // Page title mapping
  const pageTitles: Record<string, string> = {
    '/energy-usage': 'Energy Usage & Daily Schedules',
    '/appliances': 'Appliances',
    '/billing': 'Billing & Saving',
    '/carbon': 'Carbon Footprints',
    '/dashboard': 'Colony Dashboard',
    '/grid-impact': 'Grid Impact',
    '/billing-sim': 'Billing Simulator',
    '/architecture': 'Architecture',
  };

  const pageTitle = pageTitles[pathname] || 'Dashboard';

  return (
    <>
      <header className="fixed top-0 right-0 left-[260px] h-16 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 z-30 flex items-center justify-between px-6">
        {/* Page title */}
        <div>
          <h1 className="text-lg font-bold text-volt-dark">{pageTitle}</h1>
          <p className="text-xs text-gray-400">Welcome back, Avinash</p>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Notification bell */}
          <button
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
            className="relative w-10 h-10 rounded-xl bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-volt-red text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Profile */}
          <button
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-volt-blue to-volt-cyan flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-sm font-semibold text-volt-dark">Avinash</div>
              <div className="text-[10px] text-gray-400">Flat A-301</div>
            </div>
          </button>
        </div>
      </header>

      {/* Notification Panel */}
      <AnimatePresence>
        {notifOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setNotifOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed top-16 right-6 w-96 max-h-[70vh] bg-white rounded-2xl shadow-2xl border border-gray-200/50 z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-volt-blue" />
                  <span className="font-bold text-volt-dark">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 bg-volt-red/10 text-volt-red text-xs font-bold rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setNotifOpen(false)}
                  className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Notifications list */}
              <div className="overflow-y-auto max-h-[55vh] scrollbar-hide">
                {mockNotifications.map((notif, i) => {
                  const config = typeConfig[notif.type];
                  return (
                    <motion.div
                      key={notif.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`px-5 py-4 border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${
                        !notif.read ? 'bg-blue-50/30' : ''
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className={`w-9 h-9 ${config.bg} rounded-lg flex items-center justify-center shrink-0`}>
                          <config.icon className={`w-4 h-4 ${config.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <span className={`text-sm font-semibold text-volt-dark ${!notif.read ? '' : 'text-gray-600'}`}>
                              {notif.title}
                            </span>
                            {!notif.read && (
                              <span className="w-2 h-2 rounded-full bg-volt-blue shrink-0 mt-1.5" />
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{notif.message}</p>
                          <div className="flex items-center gap-1 mt-2 text-[10px] text-gray-400">
                            <Clock className="w-3 h-3" />
                            {notif.time}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50">
                <button className="text-sm text-volt-blue font-medium hover:underline w-full text-center">
                  Mark all as read
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Profile Dropdown */}
      <AnimatePresence>
        {profileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setProfileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed top-16 right-6 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200/50 z-50 overflow-hidden"
            >
              {/* Profile header */}
              <div className="p-5 bg-gradient-to-br from-volt-blue/5 to-volt-cyan/5 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-volt-blue to-volt-cyan flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-volt-dark">Avinash</div>
                    <div className="text-xs text-gray-500">Flat A-301 • GreenValley</div>
                  </div>
                </div>
              </div>

              {/* Quick stats */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <TrendingDown className="w-4 h-4 text-volt-green" />
                    This month savings
                  </div>
                  <span className="text-sm font-bold text-volt-green">₹1,240</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Leaf className="w-4 h-4 text-emerald-500" />
                    CO₂ saved
                  </div>
                  <span className="text-sm font-bold text-emerald-600">36.9 kg</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Zap className="w-4 h-4 text-volt-amber" />
                    Energy score
                  </div>
                  <span className="text-sm font-bold text-volt-amber">⚡94</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
