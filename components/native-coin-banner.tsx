"use client"

import { Sparkles, TrendingUp, ExternalLink } from 'lucide-react'

const NATIVE_COIN_ADDRESS = "EMyXs726t4oUL7yCH9kkXCpWp3SdpWRopuewaVYhpump"

export function NativeCoinBanner() {
  return (
    <div className="relative overflow-hidden border border-white/20 bg-black p-6">
      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-12 h-12 border border-white/20 bg-white/5">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold font-mono text-white">$VANT NATIVE TOKEN</h3>
              <div className="px-2 py-0.5 border border-white/20 bg-white/5">
                <span className="text-[10px] font-mono font-bold text-white tracking-wider">LIVE</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground font-mono max-w-xl">
              Trade the official Vantage Protocol token on Pump.fun. Exclusive access to platform features and governance.
            </p>
            <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
              <span className="truncate">{NATIVE_COIN_ADDRESS}</span>
              <button
                onClick={() => navigator.clipboard.writeText(NATIVE_COIN_ADDRESS)}
                className="hover:text-white transition-colors underline decoration-dotted"
              >
                COPY_ADDR
              </button>
            </div>
          </div>
        </div>

        <a
          href={`https://pump.fun/coin/${NATIVE_COIN_ADDRESS}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-white/90 font-bold font-mono text-sm tracking-wider transition-all group"
        >
          <TrendingUp className="w-4 h-4" />
          <span>TRADE_NOW</span>
          <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
        </a>
      </div>
    </div>
  )
}
