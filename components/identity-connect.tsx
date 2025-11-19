"use client"

import { useState } from "react"
import { ArrowRight, Loader2, ShieldCheck } from 'lucide-react'

export function IdentityConnect() {
  const [isLoading, setIsLoading] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  const handleConnect = () => {
    setIsLoading(true)
    // Simulate connection delay
    setTimeout(() => {
      setIsLoading(false)
      setIsConnected(true)
    }, 1500)
  }

  if (isConnected) {
    return (
      <div className="flex items-center gap-3 p-1.5 pr-4 border border-neon-green/20 bg-neon-green/5 rounded-full backdrop-blur-md transition-all animate-in fade-in zoom-in-95 duration-300">
        <div className="p-1.5 bg-neon-green/10 rounded-full text-neon-green shadow-[0_0_10px_rgba(34,197,94,0.2)]">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div className="flex flex-col">
          <div className="text-xs font-bold text-white leading-none mb-0.5">IDENTITY VERIFIED</div>
          <div className="text-[10px] text-neon-green/70 font-mono leading-none">0x71C...9A23</div>
        </div>
        <button className="ml-3 text-[10px] font-bold bg-neon-green/10 text-neon-green border border-neon-green/20 px-3 py-1 rounded-full hover:bg-neon-green/20 transition-all hover:scale-105">
          ENTER
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3">
      <button 
        onClick={handleConnect}
        disabled={isLoading}
        className="group relative flex items-center justify-center gap-2 h-10 bg-white text-black px-6 rounded-full text-sm font-bold tracking-wide hover:bg-gray-100 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            CONNECT IDENTITY
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>
      
      <div className="flex items-center gap-2 h-10 px-4 border border-white/5 rounded-full bg-white/[0.02] backdrop-blur-md text-[10px] font-medium tracking-widest text-zinc-400 uppercase shadow-inner">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
        </span>
        Secure Enclave
      </div>
    </div>
  )
}
