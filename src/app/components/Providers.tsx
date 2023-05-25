'use client';

import React, {ReactNode} from 'react';
import {TrpcProvider} from '@/utils/trpc-provider';
import {SessionProvider} from 'next-auth/react';

interface Props {
  children?: ReactNode;
}

const Providers = ({children}: Props) => {
  return (
    <SessionProvider>
      <TrpcProvider>{children}</TrpcProvider>
    </SessionProvider>
  );
};

export default Providers;
