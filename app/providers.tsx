"use client"

import { MarketProvider } from "@/lib/store-context"
import { SolanaProvider } from "@/components/solana-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SolanaProvider>
      <MarketProvider>
        {children}
      </MarketProvider>
    </SolanaProvider>
  )
}
