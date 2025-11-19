"use client"

import { Sparkles, TrendingUp, ExternalLink } from 'lucide-react'

const NATIVE_COIN_ADDRESS = "EMyXs726t4oUL7yCH9kkXCpWp3SdpWRopuewaVYhpump"

export function NativeCoinBanner() {
  return (
    <div className="relative overflow-hidden rounded-lg border-2 border-neon-blue/30 bg-gradient-to-br from-neon-blue/10 via-neon-purple/5 to-transparent p-6 shadow-[0_0_50px_rgba(0,200,255,0.15)]">
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,200,255,0.1),transparent_70%)] animate-pulse" />
      
      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple shadow-lg shadow-neon-blue/30">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold font-mono text-white">$VANT NATIVE TOKEN</h3>
              <div className="px-2 py-0.5 rounded border border-neon-green/30 bg-neon-green/10">
                <span className="text-[10px] font-mono font-bold text-neon-green tracking-wider">LIVE</span>
              </div>
            </div>
            <p className="text-sm text-white/60 font-mono max-w-xl">
              Trade the official Vantage Protocol token on Pump.fun. Exclusive access to platform features and governance.
            </p>
            <div className="flex items-center gap-2 text-[10px] font-mono text-white/40">
              <span className="truncate">{NATIVE_COIN_ADDRESS}</span>
              <button
                onClick={() => navigator.clipboard.writeText(NATIVE_COIN_ADDRESS)}
                className="hover:text-white/60 transition-colors"
              >
                Copy
              </button>
            </div>
          </div>
        </div>

        <a
          href={`https://pump.fun/coin/${NATIVE_COIN_ADDRESS}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple text-white font-bold font-mono text-sm tracking-wider shadow-lg hover:shadow-[0_0_30px_rgba(0,200,255,0.4)] transition-all duration-300 hover:scale-105 group"
        >
          <TrendingUp className="w-4 h-4" />
          <span>TRADE NOW</span>
          <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
        </a>
      </div>
    </div>
  )
}
