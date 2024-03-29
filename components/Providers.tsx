'use client';

import React, { FC, PropsWithChildren } from 'react';

import { AuthProvider } from '@/context';

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