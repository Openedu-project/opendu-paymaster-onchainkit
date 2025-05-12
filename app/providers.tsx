'use client';

import { baseSepolia } from 'viem/chains';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import type { ReactNode } from 'react';

export function Providers(props: { children: ReactNode }) {
  const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID;

  if (!projectId) {
    console.error('WalletConnect Project ID is not defined');
  }

  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={baseSepolia}
      projectId={projectId}
      config={{
        appearance: {
          mode: 'auto',
        },
        paymaster: process.env.NEXT_PUBLIC_PAYMASTER_URL,
      }}
    >
      {props.children}
    </OnchainKitProvider>
  );
}

