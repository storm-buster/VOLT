'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AirVent, Droplets, WashingMachine, Tv, Lightbulb, Plug, Refrigerator,
  Fan, Smartphone, Power, Clock, Zap, TrendingDown, AlertTriangle,
} from 'lucide-react';

interface Appliance {
  id: string;
  name: string;
  icon: React.ElementType;
  kw: number;
  isOn: boolean;
  dailyHours: number;
  monthlyCost: number;
  category: string;
  smartEnabled: boolean;
  schedule?: string;
}

const appliancesData: Appliance[] = [
  { id: 'ac', name: 'Air Conditioner', icon: AirVent, kw: 1.5, isOn: true, dailyHours: 8, monthlyCost: 540, category: 'Cooling', smartEnabled: true, schedule: '9AM–12PM, 2PM–6PM' },
  { id: 'geyser', name: 'Geyser', icon: Droplets, kw: 2.0, isOn: false, dailyHours: 0.5, monthlyCost: 93, category: 'Heating', smartEnabled: true, schedule: '5:30AM – Sasta tariff' },
  { id: 'fridge', name: 'Refrigerator', icon: Refrigerator, kw: 0.15, isOn: true, dailyHours: 24, monthlyCost: 108, category: 'Kitchen', smartEnabled: false },
  { id: 'wm', name: 'Washing Machine', icon: WashingMachine, kw: 0.5, isOn: false, dailyHours: 0.75, monthlyCost: 35, category: 'Cleaning', smartEnabled: true, schedule: '6AM – Sasta tariff' },
  { id: 'tv', name: 'Television', icon: Tv, kw: 0.1, isOn: true, dailyHours: 5, monthlyCost: 15, category: 'Entertainment', smartEnabled: false },
  { id: 'lights', name: 'LED Lights (8)', icon: Lightbulb, kw: 0.08, isOn: true, dailyHours: 6, monthlyCost: 14, category: 'Lighting', smartEnabled: true },
  { id: 'fan', name: 'Ceiling Fan (3)', icon: Fan, kw: 0.075, isOn: true, dailyHours: 10, monthlyCost: 68, category: 'Cooling', smartEnabled: false },
  { id: 'router', name: 'Wi-Fi Router', icon: Smartphone, kw: 0.012, isOn: true, dailyHours: 24, monthlyCost: 9, category: 'Electronics', smartEnabled: false },
  { id: 'iron', name: 'Iron', icon: Plug, kw: 1.0, isOn: false, dailyHours: 0.3, monthlyCost: 23, category: 'Utilities', smartEnabled: false },
];

export default function AppliancesPage() {
  const [appliances, setAppliances] = useState(appliancesData);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAppliance, setSelectedAppliance] = useState<string | null>(null);

  const categories = ['All', ...Array.from(new Set(appliances.map(a => a.category)))];

  const filtered = selectedCategory === 'All'
    ? appliances
    : appliances.filter(a => a.category === selectedCategory);

  const totalKW = appliances.filter(a => a.isOn).reduce((s, a) => s + a.kw, 0);
  const totalMonthlyCost = appliances.reduce((s, a) => s + a.monthlyCost, 0);
  const smartCount = appliances.filter(a => a.smartEnabled).length;
  const onCount = appliances.filter(a => a.isOn).length;

  const toggleAppliance = (id: string) => {
    setAppliances(prev => prev.map(a => a.id === id ? { ...a, isOn: !a.isOn } : a));
  };

  return (
    <div className="ml-[260px] pt-16 min-h-screen bg-volt-bg">
      <div className="p-6 lg:p-8 max-w-[1400px]">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Power, label: 'Active Now', value: `${onCount} / ${appliances.length}`, color: 'text-volt-green', bg: 'bg-green-50' },
            { icon: Zap, label: 'Current Load', value: `${totalKW.toFixed(2)} kW`, color: 'text-volt-cyan', bg: 'bg-cyan-50' },
            { icon: TrendingDown, label: 'Monthly Cost', value: `₹${totalMonthlyCost}`, color: 'text-volt-blue', bg: 'bg-blue-50' },
            { icon: Clock, label: 'Smart Enabled', value: `${smartCount} appliances`, color: 'text-volt-amber', bg: 'bg-amber-50' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-light rounded-2xl p-5"
            >
              <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Category filter */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-volt-blue text-white shadow-md'
                  : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Appliance Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((app, i) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-2xl p-5 border-2 transition-all duration-300 cursor-pointer ${
                app.isOn
                  ? 'bg-white border-volt-cyan/20 shadow-lg shadow-volt-cyan/5'
                  : 'bg-gray-50/50 border-gray-200/50'
              }`}
              onClick={() => setSelectedAppliance(selectedAppliance === app.id ? null : app.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                    app.isOn ? 'bg-volt-cyan/10' : 'bg-gray-100'
                  }`}>
                    <app.icon className={`w-6 h-6 ${app.isOn ? 'text-volt-cyan' : 'text-gray-400'}`} />
                  </div>
                  <div>
                    <div className={`text-sm font-bold ${app.isOn ? 'text-volt-dark' : 'text-gray-500'}`}>
                      {app.name}
                    </div>
                    <div className="text-xs text-gray-400">{app.category}</div>
                  </div>
                </div>

                {/* Toggle */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleAppliance(app.id); }}
                  className={`w-12 h-7 rounded-full transition-all duration-300 relative ${
                    app.isOn ? 'bg-volt-cyan' : 'bg-gray-300'
                  }`}
                >
                  <motion.div
                    animate={{ x: app.isOn ? 22 : 2 }}
                    className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-md"
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className={`font-bold ${app.isOn ? 'text-volt-cyan' : 'text-gray-400'}`}>
                    {app.kw} kW
                  </span>
                  <span>{app.dailyHours} hrs/day</span>
                </div>
                <span className="text-sm font-bold text-volt-blue">₹{app.monthlyCost}/mo</span>
              </div>

              {/* Smart badge */}
              {app.smartEnabled && (
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-volt-cyan/10 text-volt-cyan rounded-full">
                    ⚡ VoltIQ Smart
                  </span>
                  {app.schedule && (
                    <span className="text-[10px] text-gray-400">{app.schedule}</span>
                  )}
                </div>
              )}

              {/* Expanded details */}
              <AnimatePresence>
                {selectedAppliance === app.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Daily energy</span>
                        <span className="font-semibold">{(app.kw * app.dailyHours).toFixed(2)} kWh</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Monthly energy</span>
                        <span className="font-semibold">{(app.kw * app.dailyHours * 30).toFixed(1)} kWh</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">% of total bill</span>
                        <span className="font-semibold">{((app.monthlyCost / totalMonthlyCost) * 100).toFixed(1)}%</span>
                      </div>
                      {!app.smartEnabled && (
                        <div className="flex items-center gap-1 text-xs text-volt-amber mt-2">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Enable smart scheduling to save more</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
