'use client';

import { AuthProvider } from '@/context';
import React, { FC, PropsWithChildren } from 'react';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const Providers: FC<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <AuthProvider>
      { children }
    </AuthProvider>
  )
}

export default Providers;