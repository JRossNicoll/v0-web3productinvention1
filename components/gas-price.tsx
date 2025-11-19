"use client"

import { useEffect, useState } from "react"
import { Connection } from "@solana/web3.js"

export function GasPrice() {
  const [tps, setTps] = useState<number | null>(null)

  useEffect(() => {
    const connection = new Connection("https://solana-mainnet.g.alchemy.com/v2/X9KIYdkNu0v5x1pGJkvqB9E83qewiH3x")
    
    const fetchStats = async () => {
      try {
        // Fetch recent performance samples to calculate TPS
        const samples = await connection.getRecentPerformanceSamples(1)
        if (samples.length > 0) {
          const sample = samples[0]
          const calculatedTps = sample.numTransactions / sample.samplePeriodSecs
          setTps(calculatedTps)
        }
      } catch (e) {
        console.error("Failed to fetch TPS", e)
      }
    }

    fetchStats()
    // Update every 3 seconds for a "live" feel
    const interval = setInterval(fetchStats, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-end">
      <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-mono mb-0.5">Solana Live TPS</span>
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
        <span className="text-emerald-400 font-bold font-mono text-sm tabular-nums tracking-tight">
          {tps ? Math.round(tps).toLocaleString() : "INITIALIZING..."}
        </span>
      </div>
    </div>
  )
}
