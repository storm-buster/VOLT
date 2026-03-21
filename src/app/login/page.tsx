'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Zap, Sparkles } from 'lucide-react';
import PhoneInput from '@/components/auth/PhoneInput';
import OTPInput from '@/components/auth/OTPInput';
import { useVoltStore } from '@/lib/store';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const login = useVoltStore((s) => s.login);
  const user = useVoltStore((s) => s.user);

  const handleSendOTP = async () => {
    setLoading(true);
    setError('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setLoading(false);
    setStep('otp');
  };

  const handleVerifyOTP = async (otp: string) => {
    setLoading(true);
    setError('');
    
    const success = await login(phone, otp);
    
    if (success) {
      // Check if user needs onboarding
      if (!user?.meterNumber) {
        router.push('/onboarding');
      } else {
        router.push('/dashboard');
      }
    } else {
      setError('Invalid OTP. Please try again.');
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1c] relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-volt-cyan/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-volt-blue/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-volt-green/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Logo and header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-volt-cyan to-volt-blue flex items-center justify-center relative">
                <Zap className="w-8 h-8 text-white" fill="white" />
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-volt-cyan/30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>
              <div>
                <h1 className="text-4xl font-black text-white">
                  Volt<span className="text-volt-cyan">IQ</span>
                </h1>
              </div>
            </div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-lg"
            >
              Smart Energy, Smarter Savings
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-volt-green/10 border border-volt-green/20 rounded-full"
            >
              <Sparkles className="w-4 h-4 text-volt-green" />
              <span className="text-sm text-volt-green font-semibold">
                Save up to 23% on electricity bills
              </span>
            </motion.div>
          </motion.div>

          {/* Auth forms */}
          <AnimatePresence mode="wait">
            {step === 'phone' ? (
              <PhoneInput
                key="phone"
                value={phone}
                onChange={setPhone}
                onSubmit={handleSendOTP}
                loading={loading}
              />
            ) : (
              <OTPInput
                key="otp"
                phoneNumber={phone}
                onComplete={handleVerifyOTP}
                onResend={handleResendOTP}
                onBack={() => setStep('phone')}
                loading={loading}
              />
            )}
          </AnimatePresence>

          {/* Error message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-4 bg-volt-red/10 border border-volt-red/20 rounded-xl"
              >
                <p className="text-sm text-volt-red text-center">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-8 grid grid-cols-3 gap-4"
          >
            {[
              { icon: '⚡', label: 'Real-time\nTracking' },
              { icon: '🤖', label: 'AI-Powered\nOptimization' },
              { icon: '💰', label: 'Instant\nSavings' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="text-center p-4 rounded-xl bg-white/5 border border-white/5"
              >
                <div className="text-2xl mb-2">{feature.icon}</div>
                <p className="text-xs text-gray-400 whitespace-pre-line leading-tight">
                  {feature.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center text-xs text-gray-600 mt-8"
          >
            Trusted by 3 Cr+ smart meters across India
          </motion.p>
        </div>
      </div>
    </div>
  );
}
