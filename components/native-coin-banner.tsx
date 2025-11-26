"use client"

import { useState } from "react"
import { Sparkles, Copy, Check } from "lucide-react"

const CONTRACT_ADDRESS = "0xFb1A3F6c8e0155F03ED7D381B7680Fcb40d54Bf8"

export function NativeCoinBanner() {
  const [copied, setCopied] = useState(false)

  const copyAddress = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS)
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
              The official Vantage Protocol governance token. Exclusive access to platform features and premium data.
            </p>
            <button
              onClick={copyAddress}
              className="group flex items-center gap-2 mt-2 px-3 py-1.5 border border-white/10 bg-white/[0.02] hover:bg-white/5 rounded-lg transition-all"
            >
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">CA:</span>
              <code className="text-[11px] font-mono text-white/60 group-hover:text-white/80 transition-colors">
                {CONTRACT_ADDRESS}
              </code>
              {copied ? (
                <Check className="w-3 h-3 text-emerald-400 ml-1" />
              ) : (
                <Copy className="w-3 h-3 text-white/40 group-hover:text-white/60 transition-colors ml-1" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
