'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useVoltStore } from '@/lib/store';
import { connectWebSocket, disconnectWebSocket, startMockUpdates } from '@/lib/websocket';
import { TariffBanner } from '@/components/dashboard/TariffBanner';
import { ColonyStats } from '@/components/dashboard/ColonyStats';
import { Leaderboard } from '@/components/dashboard/Leaderboard';
import { SavingsCard } from '@/components/dashboard/SavingsCard';
import { Wifi, WifiOff } from 'lucide-react';

export default function DashboardPage() {
  const wsConnected = useVoltStore((s) => s.wsConnected);

  useEffect(() => {
    // Try WebSocket first, falls back to mock data
    connectWebSocket();
    // Start mock updates immediately for demo reliability
    startMockUpdates();

    return () => {
      disconnectWebSocket();
    };
  }, []);

  return (
    <div className="min-h-screen bg-volt-bg pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-volt-dark">Colony Dashboard</h1>
            <p className="text-gray-500 mt-1">GreenValley Residency • 200 Homes</p>
          </div>
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
              wsConnected
                ? 'bg-green-50 text-volt-green border border-green-200'
                : 'bg-amber-50 text-amber-600 border border-amber-200'
            }`}>
              {wsConnected ? (
                <>
                  <Wifi className="w-4 h-4" />
                  <span>Live</span>
                  <span className="w-2 h-2 rounded-full bg-volt-green animate-pulse" />
                </>
              ) : (
                <>
                  <WifiOff className="w-4 h-4" />
                  <span>Mock Data</span>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Tariff Banner */}
        <TariffBanner />

        {/* Stats Grid */}
        <div className="mt-8">
          <ColonyStats />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <Leaderboard />
          </div>
          <div>
            <SavingsCard />
          </div>
        </div>
      </div>
    </div>
  );
}
