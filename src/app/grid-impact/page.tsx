'use client';

import { motion } from 'framer-motion';
import { useVoltStore } from '@/lib/store';
import { Zap, Factory, TreePine, Award, Globe } from 'lucide-react';

export default function GridImpactPage() {
  const homesValue = useVoltStore((s) => s.homesSliderValue);
  const setHomesValue = useVoltStore((s) => s.setHomesSliderValue);

  // Calculate MW: homes × 0.06kW / 1000
  const mw = (homesValue * 0.06) / 1000;
  const gw = mw / 1000;

  // Format homes number
  const formatHomes = (n: number) => {
    if (n >= 10000000) return `${(n / 10000000).toFixed(1)} Crore`;
    if (n >= 100000) return `${(n / 100000).toFixed(1)} Lakh`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return n.toString();
  };

  // Format power
  const formatPower = () => {
    if (gw >= 1) return `${gw.toFixed(1)} GW`;
    if (mw >= 1) return `${mw.toFixed(1)} MW`;
    return `${(homesValue * 0.06).toFixed(1)} kW`;
  };

  // Log scale conversion
  const logMin = Math.log10(100);
  const logMax = Math.log10(10000000);
  const sliderToValue = (pos: number) => {
    const log = logMin + (pos / 100) * (logMax - logMin);
    return Math.round(Math.pow(10, log));
  };
  const valueToSlider = (val: number) => {
    return ((Math.log10(val) - logMin) / (logMax - logMin)) * 100;
  };

  const sliderPos = valueToSlider(homesValue);

  // Milestones
  const milestones = [
    { threshold: 100, label: '100 Homes', desc: 'One colony', icon: '🏘️', achieved: homesValue >= 100 },
    { threshold: 1000, label: '1,000 Homes', desc: 'One neighbourhood', icon: '🏙️', achieved: homesValue >= 1000 },
    { threshold: 100000, label: '1 Lakh Homes', desc: 'One district', icon: '⚡', achieved: homesValue >= 100000 },
    { threshold: 1000000, label: '10 Lakh Homes', desc: 'One city', icon: '🌆', achieved: homesValue >= 1000000 },
    { threshold: 10000000, label: '1 Crore Homes', desc: 'All of India', icon: '🇮🇳', achieved: homesValue >= 10000000 },
  ];

  const isHeroMode = homesValue >= 10000000;

  return (
    <div className="min-h-screen bg-volt-dark pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Globe className="w-5 h-5 text-volt-cyan" />
            <span className="text-volt-cyan font-semibold text-sm tracking-widest uppercase">
              Grid Impact Calculator
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white">
            What if <span className="text-gradient">VoltIQ</span> scaled?
          </h1>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">
            Drag the slider to see the impact on India&apos;s power grid.
          </p>
        </motion.div>

        {/* Main power display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-12"
        >
          <div className={`inline-flex flex-col items-center p-8 rounded-3xl transition-all duration-700 ${
            isHeroMode
              ? 'glass border-2 border-volt-cyan/30 glow-cyan'
              : 'glass'
          }`}>
            <span className="text-gray-400 text-sm font-medium mb-2">
              Peak demand reduction
            </span>
            <motion.div
              key={formatPower()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`font-black transition-colors duration-500 ${
                isHeroMode ? 'text-7xl md:text-9xl text-volt-cyan' : 'text-5xl md:text-7xl text-white'
              }`}
            >
              {formatPower()}
            </motion.div>
            <div className="text-lg text-gray-400 mt-2">
              from <span className="text-white font-bold">{formatHomes(homesValue)}</span> homes
            </div>
          </div>
        </motion.div>

        {/* Slider */}
        <div className="max-w-3xl mx-auto mb-16 px-4">
          <div className="relative">
            <input
              type="range"
              min={0}
              max={100}
              step={0.1}
              value={sliderPos}
              onChange={(e) => setHomesValue(sliderToValue(parseFloat(e.target.value)))}
              className="w-full h-3 rounded-full appearance-none cursor-pointer bg-white/10"
              style={{
                background: `linear-gradient(to right, #00BCD4 0%, #00BCD4 ${sliderPos}%, rgba(255,255,255,0.1) ${sliderPos}%, rgba(255,255,255,0.1) 100%)`,
              }}
            />
            {/* Tick marks */}
            <div className="flex justify-between mt-3 text-xs text-gray-500">
              <span>100</span>
              <span>1K</span>
              <span>10K</span>
              <span>1L</span>
              <span>10L</span>
              <span>1Cr</span>
            </div>
          </div>
        </div>

        {/* Milestone Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {milestones.map((ms, i) => (
            <motion.div
              key={ms.threshold}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: ms.achieved ? 1 : 0.3, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`rounded-2xl p-4 text-center transition-all duration-500 border ${
                ms.achieved
                  ? 'glass border-volt-cyan/30 shadow-lg shadow-volt-cyan/10'
                  : 'bg-white/5 border-white/5'
              }`}
            >
              <div className="text-2xl mb-2">{ms.icon}</div>
              <div className={`text-sm font-bold ${ms.achieved ? 'text-white' : 'text-gray-600'}`}>
                {ms.label}
              </div>
              <div className={`text-xs mt-1 ${ms.achieved ? 'text-gray-400' : 'text-gray-700'}`}>
                {ms.desc}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hero Card at 1 Crore */}
        {isHeroMode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-gradient-to-br from-volt-cyan/20 to-volt-blue/20 rounded-3xl p-10 text-center border-2 border-volt-cyan/30 glow-cyan relative overflow-hidden">
              {/* Background particles */}
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-volt-cyan rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 2, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}

              <Award className="w-16 h-16 text-volt-cyan mx-auto mb-6" />
              <h2 className="text-5xl md:text-6xl font-black text-white mb-3">
                6 GW
              </h2>
              <p className="text-2xl font-bold text-volt-cyan mb-4">
                Zero new power plants.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-gray-400">
                <div className="flex items-center gap-2">
                  <Factory className="w-5 h-5 text-volt-green" />
                  <span>= 10 coal plants avoided</span>
                </div>
                <div className="flex items-center gap-2">
                  <TreePine className="w-5 h-5 text-volt-green" />
                  <span>= 28M tons CO₂/year</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-volt-amber" />
                  <span>= ₹42,000 Cr saved</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
