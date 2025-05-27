'use client';

import { ReactNode } from 'react';
import config from '@/config';

interface AuthWrapperProps {
  children: ReactNode;
}

// This is a client component that conditionally renders children
const AuthWrapper = ({ children }: AuthWrapperProps) => {
  // If you want to disable auth, just render children
  return <>{children}</>;
};

export default AuthWrapper;
