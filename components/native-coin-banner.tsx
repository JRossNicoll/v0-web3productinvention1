"use client"

import { Sparkles, TrendingUp, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { cn } from "@/lib/utils"

const NATIVE_COIN_ADDRESS = "EMyXs726t4oUL7yCH9kkXCpWp3SdpWRopuewaVYhpump"

export function NativeCoinBanner() {
  const [copied, setCopied] = useState(false)

  const copyAddress = () => {
    navigator.clipboard.writeText(NATIVE_COIN_ADDRESS)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/50 p-6 backdrop-blur-sm transition-all hover:border-white/20">
      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-5">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 shadow-inner">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-white tracking-tight">$VANT NATIVE TOKEN</h3>
              <div className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-[10px] font-medium text-emerald-500 tracking-wide flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                  LIVE
                </span>
              </div>
            </div>
            <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">
              Trade the official Vantage Protocol token on Pump.fun. Exclusive access to platform features and governance.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={copyAddress}
                className="group flex items-center gap-2 px-2 py-1 -ml-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <code className="text-[10px] text-zinc-500 font-mono transition-colors group-hover:text-zinc-300">
                  {NATIVE_COIN_ADDRESS}
                </code>
                {copied ? (
                  <Check className="w-3 h-3 text-emerald-500" />
                ) : (
                  <Copy className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400" />
                )}
              </button>
            </div>
          </div>
        </div>

        <a
          href={`https://pump.fun/coin/${NATIVE_COIN_ADDRESS}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 bg-white text-black hover:bg-zinc-200 rounded-full font-medium text-sm transition-all shadow-lg shadow-white/5 hover:shadow-white/10 hover:-translate-y-0.5"
        >
          <TrendingUp className="w-4 h-4" />
          <span>Trade Now</span>
        </a>
      </div>
    </div>
  )
}
