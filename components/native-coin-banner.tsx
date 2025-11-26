"use client"

import { Sparkles } from "lucide-react"

export function NativeCoinBanner() {
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
              The official Vantage Protocol governance token. Exclusive access to platform features and premium data.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
