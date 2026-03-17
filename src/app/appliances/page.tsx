'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AirVent, Droplets, WashingMachine, Tv, Lightbulb, Plug, Refrigerator,
  Fan, Smartphone, Power, Clock, Zap, TrendingDown, AlertTriangle,
} from 'lucide-react';

import { useVoltStore } from '@/lib/store';

const iconMap: Record<string, React.ElementType> = {
  AirVent, Droplets, WashingMachine, Tv, Lightbulb, Plug, Refrigerator, Fan, Smartphone
};

export default function AppliancesPage() {
  const appliances = useVoltStore(state => state.appliances);
  const toggleAppliance = useVoltStore(state => state.toggleAppliance);
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

  return (
    <div className="ml-[260px] pt-16 min-h-screen">
      <div className="p-6 lg:p-8 max-w-[1400px]">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Power, label: 'Active Now', value: `${onCount} / ${appliances.length}`, color: 'text-volt-green', bg: 'bg-green-500/10' },
            { icon: Zap, label: 'Current Load', value: `${totalKW.toFixed(2)} kW`, color: 'text-volt-cyan', bg: 'bg-cyan-500/10' },
            { icon: TrendingDown, label: 'Monthly Cost', value: `₹${totalMonthlyCost}`, color: 'text-volt-blue', bg: 'bg-blue-500/10' },
            { icon: Clock, label: 'Smart Enabled', value: `${smartCount} appliances`, color: 'text-volt-amber', bg: 'bg-amber-500/10' },
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
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Appliance Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((app, i) => {
            const IconComponent = iconMap[app.iconName] || Zap;
            return (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-2xl p-5 border-2 transition-all duration-300 cursor-pointer ${
                app.isOn
                  ? 'bg-white/5 border-volt-cyan/20 shadow-lg shadow-volt-cyan/5'
                  : 'bg-white/[0.03] border-white/5'
              }`}
              onClick={() => setSelectedAppliance(selectedAppliance === app.id ? null : app.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                    app.isOn ? 'bg-volt-cyan/10' : 'bg-white/10'
                  }`}>
                    <IconComponent className={`w-6 h-6 ${app.isOn ? 'text-volt-cyan' : 'text-gray-400'}`} />
                  </div>
                  <div>
                    <div className={`text-sm font-bold ${app.isOn ? 'text-white' : 'text-gray-500'}`}>
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
            );
          })}
        </div>
      </div>
    </div>
  );
}
