'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BarChart3, Cpu, Receipt, Leaf, ArrowRight, Zap, Sparkles } from 'lucide-react';
import { EnergyFlowScene } from '@/components/three/EnergyFlowScene';

export default function DashboardOverview() {
  const overviewCards = [
    {
      title: 'Energy Usage & Schedules',
      href: '/energy-usage',
      icon: BarChart3,
      color: 'text-volt-cyan',
      bgLight: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
      stats: [
        { label: "Today's Usage", value: '35.4 kWh' },
        { label: 'Peak Usage', value: '23.2 kWh', highlight: true },
        { label: 'Saved Today', value: '₹47' },
      ],
    },
    {
      title: 'Appliances',
      href: '/appliances',
      icon: Cpu,
      color: 'text-volt-blue',
      bgLight: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      stats: [
        { label: 'Active Now', value: '6 / 9' },
        { label: 'Current Load', value: '1.92 kW' },
        { label: 'Smart Enabled', value: '4' },
      ],
    },
    {
      title: 'Billing & Saving',
      href: '/billing',
      icon: Receipt,
      color: 'text-volt-amber',
      bgLight: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      stats: [
        { label: "This Month's Bill", value: '₹620' },
        { label: 'Monthly Savings', value: '₹227', highlight: true },
        { label: 'Total Saved', value: '₹1,367' },
      ],
    },
    {
      title: 'Carbon Footprints',
      href: '/carbon',
      icon: Leaf,
      color: 'text-volt-green',
      bgLight: 'bg-green-500/10',
      border: 'border-green-500/20',
      stats: [
        { label: 'Total CO₂ Saved', value: '205.9 kg' },
        { label: 'Trees Equivalent', value: '10.5 trees' },
        { label: 'Green Score', value: '78/100', highlight: true },
      ],
    },
  ];

  return (
    <div className="ml-0 lg:ml-[260px] pt-16 min-h-screen bg-[#0a0f1c]">
      <div className="p-6 lg:p-10 max-w-[1200px]">
        
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Welcome to your Dashboard Overview</h1>
          <p className="text-gray-500">A concise snapshot of your home&apos;s energy intelligence.</p>
        </div>

        {/* Quick highlight banner with Optimize button */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-volt-blue to-volt-cyan rounded-2xl p-6 mb-10 flex items-center justify-between text-white shadow-lg shadow-volt-blue/20"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">VoltIQ is actively optimizing your home</h2>
              <p className="text-white/80 text-sm mt-1">Smart scheduling has saved you ₹227 this month.</p>
            </div>
          </div>
          <Link href="/optimization">
            <button className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl font-semibold transition-all flex items-center gap-2 hover:scale-105">
              <Sparkles className="w-5 h-5" />
              Optimize
            </button>
          </Link>
        </motion.div>

        {/* 3D Energy Flow Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <EnergyFlowScene />
        </motion.div>

        {/* 2x2 Grid for Overview Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {overviewCards.map((card, i) => (
            <Link key={card.title} href={card.href}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`group h-full p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-black/20 transition-all duration-300 relative overflow-hidden`}
              >
                {/* Background faint glow */}
                <div className={`absolute top-0 right-0 w-32 h-32 ${card.bgLight} rounded-bl-full -z-10 transition-transform group-hover:scale-110`} />

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl ${card.bgLight} flex items-center justify-center`}>
                      <card.icon className={`w-6 h-6 ${card.color}`} />
                    </div>
                    <h2 className="text-lg font-bold text-white group-hover:text-volt-cyan transition-colors">
                      {card.title}
                    </h2>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-volt-cyan transition-colors transform group-hover:translate-x-1" />
                </div>

                <div className="space-y-4">
                  {card.stats.map((stat, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b border-white/5 pb-3 last:border-0 last:pb-0">
                      <span className="text-sm text-gray-500">{stat.label}</span>
                      <span className={`text-sm font-semibold ${stat.highlight ? card.color : 'text-gray-200'}`}>
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
        
      </div>
    </div>
  );
}
