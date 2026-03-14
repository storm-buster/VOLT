'use client';

import { motion } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-volt-dark via-[#0d1529] to-volt-dark" />

      {/* Animated particles background */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-volt-cyan rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-volt-cyan/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-volt-blue/10 rounded-full blur-[100px]" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-volt-cyan/10 border border-volt-cyan/20 rounded-full px-5 py-2 mb-8">
            <Zap className="w-4 h-4 text-volt-cyan" />
            <span className="text-volt-cyan text-sm font-medium">Ready to save?</span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
            Your meter is smart.
            <br />
            <span className="text-gradient">Make your bill smarter.</span>
          </h2>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            Join 200+ homes already saving with VoltIQ. No hardware needed — just your existing smart meter.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/billing-sim" className="btn-glow text-lg flex items-center gap-2 group">
              <Zap className="w-5 h-5" />
              Start Saving Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/architecture"
              className="px-8 py-4 rounded-xl text-gray-400 font-medium hover:text-white transition-colors"
            >
              How it works →
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-volt-bg to-transparent" />
    </section>
  );
}
