"use client"

import { useState } from "react"
import { X, ExternalLink, TrendingUp, ShieldCheck, ArrowRight, Lock } from 'lucide-react'
import { Button } from "@/components/ui/button"

const NATIVE_COIN_ADDRESS = "EMyXs726t4oUL7yCH9kkXCpWp3SdpWRopuewaVYhpump"
const PUMP_FUN_URL = `https://pump.fun/coin/${NATIVE_COIN_ADDRESS}`

export function PumpFunWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity animate-pulse" />
          
          {/* Button */}
          <div className="relative flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full shadow-2xl group-hover:shadow-[0_0_40px_rgba(0,200,255,0.5)] transition-all duration-300 group-hover:scale-105">
            <TrendingUp className="w-5 h-5 text-white" />
            <span className="text-sm font-bold font-mono text-white tracking-wider">TRADE $VANTAGE</span>
          </div>
        </div>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#0A0A0A] border-2 border-white/20 rounded-lg shadow-[0_0_100px_rgba(0,200,255,0.3)] overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
                  <span className="text-sm font-bold font-mono text-white tracking-wider">VANTAGE NATIVE TOKEN</span>
                </div>
                <div className="px-3 py-1 border border-white/20 bg-white/5 rounded">
                  <span className="text-[10px] font-mono text-white/60 tracking-wider">PUMP.FUN</span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded transition-colors group"
              >
                <X className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
              </button>
            </div>

            {/* Content - Replaced iframe with Gateway UI */}
            <div className="p-12 flex flex-col items-center justify-center text-center space-y-8 bg-[url('/grid-pattern.svg')] bg-center">
              
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center border border-white/10 mb-4 relative group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
                <ShieldCheck className="w-10 h-10 text-white" />
              </div>

              <div className="space-y-2 max-w-md">
                <h3 className="text-2xl font-bold text-white">Secure Trading Terminal</h3>
                <p className="text-white/60">
                  For your security, Pump.fun requires trading to happen in a secure external window.
                </p>
              </div>

              <div className="flex flex-col gap-4 w-full max-w-sm">
                <a
                  href={PUMP_FUN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg font-bold text-white hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg shadow-neon-blue/20 group"
                >
                  <span>Launch Terminal</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                
                <div className="flex items-center justify-center gap-2 text-xs text-white/40">
                  <Lock className="w-3 h-3" />
                  <span>End-to-end encrypted connection</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  )
}
