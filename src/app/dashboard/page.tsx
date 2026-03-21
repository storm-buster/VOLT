'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BarChart3, Cpu, Receipt, Leaf, ArrowRight, Zap, Sparkles, Trophy, MessageSquare, Phone, Mail, ChevronRight } from 'lucide-react';
import { EnergyFlowScene } from '@/components/three/EnergyFlowScene';
import { useVoltStore } from '@/lib/store';
import { useState } from 'react';

export default function DashboardOverview() {
  const { colonyData } = useVoltStore();
  const [complaintText, setComplaintText] = useState('');
  const [complaintSubmitted, setComplaintSubmitted] = useState(false);

  const handleComplaintSubmit = () => {
    if (complaintText.trim()) {
      setComplaintSubmitted(true);
      setComplaintText('');
      setTimeout(() => setComplaintSubmitted(false), 3000);
    }
  };

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

        {/* Society Ranking Table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-10"
        >
          <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-volt-amber/20 rounded-xl flex items-center justify-center">
                <Trophy className="w-5 h-5 text-volt-amber" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Society Leaderboard</h2>
                <p className="text-sm text-gray-500">Your ranking among {colonyData.totalHomes} homes</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Rank</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Flat</th>
                    <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Energy Score</th>
                    <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Usage (kW)</th>
                    <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Savings</th>
                  </tr>
                </thead>
                <tbody>
                  {colonyData.flats.map((flat, i) => {
                    const isYou = flat.flat === 'A-301'; // Assuming user is A-301
                    return (
                      <motion.tr
                        key={flat.flat}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`border-b border-white/5 transition-colors ${
                          isYou 
                            ? 'bg-volt-cyan/10 border-volt-cyan/20' 
                            : 'hover:bg-white/5'
                        }`}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            {flat.rank <= 3 ? (
                              <span className={`text-lg ${
                                flat.rank === 1 ? 'text-yellow-400' :
                                flat.rank === 2 ? 'text-gray-400' :
                                'text-amber-600'
                              }`}>
                                {flat.rank === 1 ? '🥇' : flat.rank === 2 ? '🥈' : '🥉'}
                              </span>
                            ) : (
                              <span className="text-gray-500 font-mono w-6 text-center">#{flat.rank}</span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`font-semibold ${isYou ? 'text-volt-cyan' : 'text-white'}`}>
                            {flat.flat}
                            {isYou && <span className="ml-2 text-xs bg-volt-cyan/20 px-2 py-0.5 rounded-full">You</span>}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-volt-green to-volt-cyan rounded-full"
                                style={{ width: `${flat.energyScore}%` }}
                              />
                            </div>
                            <span className="text-sm font-semibold text-white">{flat.energyScore}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="text-sm text-gray-400">{flat.kw.toFixed(2)} kW</span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="text-sm font-semibold text-volt-green">₹{flat.savings}</span>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Complaint & Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 grid md:grid-cols-2 gap-6 pb-20 lg:pb-0"
        >
          {/* Complaint Form */}
          <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-volt-red/20 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-volt-red" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Submit Complaint</h2>
                <p className="text-sm text-gray-500">Report issues or share feedback</p>
              </div>
            </div>

            {complaintSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-volt-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✅</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Complaint Submitted!</h3>
                <p className="text-gray-400 text-sm">We&apos;ll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Describe your issue
                  </label>
                  <textarea
                    value={complaintText}
                    onChange={(e) => setComplaintText(e.target.value)}
                    placeholder="Enter your complaint or feedback..."
                    className="w-full h-32 p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-volt-cyan/50 focus:ring-2 focus:ring-volt-cyan/20 transition-all resize-none"
                  />
                </div>
                <button
                  onClick={handleComplaintSubmit}
                  disabled={!complaintText.trim()}
                  className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                    complaintText.trim()
                      ? 'bg-gradient-to-r from-volt-cyan to-volt-blue text-white hover:shadow-lg hover:shadow-volt-cyan/20'
                      : 'bg-white/10 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Submit Complaint
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Contact Us */}
          <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-volt-blue/20 rounded-xl flex items-center justify-center">
                <Phone className="w-5 h-5 text-volt-blue" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Contact Us</h2>
                <p className="text-sm text-gray-500">Get in touch with our support team</p>
              </div>
            </div>

            <div className="space-y-4">
              <a 
                href="tel:1800-XXX-XXXX"
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:border-volt-cyan/30 hover:bg-volt-cyan/5 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-volt-cyan" />
                  <div>
                    <p className="text-sm font-semibold text-white">Toll Free</p>
                    <p className="text-xs text-gray-500">1800-XXX-XXXX</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-volt-cyan transition-colors" />
              </a>

              <a 
                href="mailto:support@voltiq.in"
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:border-volt-cyan/30 hover:bg-volt-cyan/5 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-volt-green" />
                  <div>
                    <p className="text-sm font-semibold text-white">Email Support</p>
                    <p className="text-xs text-gray-500">support@voltiq.in</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-volt-cyan transition-colors" />
              </a>

              <Link 
                href="/chat"
                className="flex items-center justify-between p-4 bg-gradient-to-r from-volt-cyan/10 to-volt-blue/10 rounded-xl border border-volt-cyan/20 hover:border-volt-cyan/40 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-volt-amber" />
                  <div>
                    <p className="text-sm font-semibold text-white">AI Chat Assistant</p>
                    <p className="text-xs text-gray-500">Get instant help 24/7</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-volt-cyan group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>
        </motion.div>
        
      </div>
    </div>
  );
}
