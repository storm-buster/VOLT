'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useVoltStore } from '@/lib/store';
import { connectWebSocket, disconnectWebSocket, startMockUpdates } from '@/lib/websocket';

const publicRoutes = ['/', '/login', '/onboarding'];

export default function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useVoltStore((s) => s.isAuthenticated);
  const user = useVoltStore((s) => s.user);
  const hasCompletedOnboarding = !!user?.meterNumber;

  // Initialize WebSocket/mock data on authentication
  useEffect(() => {
    if (isAuthenticated && hasCompletedOnboarding) {
      // Try WebSocket, falls back to mock updates automatically
      connectWebSocket();
      return () => disconnectWebSocket();
    } else if (isAuthenticated && !hasCompletedOnboarding) {
      // During onboarding, start mock updates for preview data
      startMockUpdates();
    }
  }, [isAuthenticated, hasCompletedOnboarding]);

  useEffect(() => {
    const isPublicRoute = publicRoutes.includes(pathname);

    // If not authenticated and trying to access protected route, redirect to login
    if (!isAuthenticated && !isPublicRoute) {
      router.push('/login');
      return;
    }

    // If authenticated but trying to access login, redirect to appropriate page
    if (isAuthenticated && pathname === '/login') {
      router.push(hasCompletedOnboarding ? '/dashboard' : '/onboarding');
      return;
    }

    // If authenticated without completing onboarding and trying to access protected route
    if (isAuthenticated && !hasCompletedOnboarding && !isPublicRoute) {
      router.push('/onboarding');
      return;
    }
  }, [isAuthenticated, pathname, router, hasCompletedOnboarding]);

  return <>{children}</>;
}
