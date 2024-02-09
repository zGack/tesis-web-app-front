'use client';

import React, { FC, PropsWithChildren } from 'react';

import { SessionProvider } from 'next-auth/react';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const Providers: FC<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <SessionProvider>
      { children }
    </SessionProvider>
  )
}

export default Providers;