'use client';

import { motion } from 'framer-motion';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { MapPin, TrendingDown, Zap } from 'lucide-react';
import Link from 'next/link';

export function GridStorySection() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-volt-green font-semibold text-sm tracking-widest uppercase">
            The Vision
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-volt-dark mt-3">
            What if <span className="text-volt-green">every home</span> could save?
          </h2>
        </motion.div>

        {/* India Map visualization placeholder + stats */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square max-w-md mx-auto relative">
              {/* Stylized India outline */}
              <div className="absolute inset-0 bg-gradient-to-br from-volt-dark to-gray-900 rounded-3xl overflow-hidden">
                {/* Grid lines */}
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,188,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,188,212,0.5) 1px, transparent 1px)`,
                    backgroundSize: '30px 30px',
                  }}
                />

                {/* City nodes */}
                {[
                  { top: '20%', left: '55%', label: 'Delhi', size: 'large' },
                  { top: '35%', left: '25%', label: 'Mumbai', size: 'large' },
                  { top: '55%', left: '35%', label: 'Bangalore', size: 'medium' },
                  { top: '45%', left: '65%', label: 'Kolkata', size: 'medium' },
                  { top: '50%', left: '50%', label: 'Hyderabad', size: 'medium' },
                  { top: '30%', left: '40%', label: 'Jaipur', size: 'small' },
                  { top: '60%', left: '45%', label: 'Chennai', size: 'small' },
                  { top: '40%', left: '50%', label: 'Pune', size: 'small' },
                ].map((city, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{ top: city.top, left: city.left }}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                  >
                    <div className="relative">
                      <div className={`rounded-full bg-volt-cyan animate-glow-pulse ${
                        city.size === 'large' ? 'w-4 h-4' : city.size === 'medium' ? 'w-3 h-3' : 'w-2 h-2'
                      }`} />
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1">
                        <span className="text-[10px] text-gray-400 whitespace-nowrap font-medium">
                          {city.label}
                        </span>
                      </div>
                      {/* Pulse ring */}
                      <div className={`absolute inset-0 rounded-full bg-volt-cyan/30 animate-ping ${
                        city.size === 'large' ? 'w-4 h-4' : city.size === 'medium' ? 'w-3 h-3' : 'w-2 h-2'
                      }`} />
                    </div>
                  </motion.div>
                ))}

                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <line x1="55" y1="22" x2="25" y2="37" stroke="rgba(0,188,212,0.15)" strokeWidth="0.3" />
                  <line x1="55" y1="22" x2="65" y2="47" stroke="rgba(0,188,212,0.15)" strokeWidth="0.3" />
                  <line x1="25" y1="37" x2="35" y2="57" stroke="rgba(0,188,212,0.15)" strokeWidth="0.3" />
                  <line x1="50" y1="52" x2="35" y2="57" stroke="rgba(0,188,212,0.15)" strokeWidth="0.3" />
                </svg>
              </div>

              {/* Corner badge */}
              <div className="absolute -top-3 -right-3 bg-volt-green text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                8 Cities
              </div>
            </div>
          </motion.div>

          {/* Story side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              {[
                {
                  icon: Zap,
                  value: 100,
                  suffix: ' homes',
                  title: 'One colony',
                  desc: '6 kW demand reduction. Enough to power 3 streetlights.',
                  color: 'text-volt-cyan',
                  bg: 'bg-cyan-50',
                },
                {
                  icon: TrendingDown,
                  value: 10,
                  suffix: ' lakh homes',
                  title: 'One city',
                  desc: '600 MW. That\'s an entire coal plant we don\'t need to build.',
                  color: 'text-volt-amber',
                  bg: 'bg-amber-50',
                },
                {
                  icon: MapPin,
                  value: 1,
                  suffix: ' crore homes',
                  title: 'All of India',
                  desc: '6 GW peak shaving. Zero new power plants.',
                  color: 'text-volt-green',
                  bg: 'bg-green-50',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  className="flex gap-4 p-5 rounded-2xl glass-light hover:shadow-lg transition-shadow group"
                >
                  <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-2xl font-black ${item.color}`}>
                        <AnimatedCounter end={item.value} duration={1.5} suffix={item.suffix} />
                      </span>
                    </div>
                    <p className="text-sm font-bold text-gray-800">{item.title}</p>
                    <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link href="/grid-impact" className="inline-flex items-center gap-2 btn-primary">
              Explore Grid Impact →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
