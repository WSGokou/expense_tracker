'use client';

import React, {ReactNode} from 'react';
import {TrpcProvider} from '@/utils/trpc-provider';
import {SessionProvider} from 'next-auth/react';
import {ToastProvider} from '@/utils/toastContext';

interface Props {
  children?: ReactNode;
}

const Providers = ({children}: Props) => {
  return (
    <SessionProvider>
      <TrpcProvider>
        <ToastProvider>{children}</ToastProvider>
      </TrpcProvider>
    </SessionProvider>
  );
};

export default Providers;
