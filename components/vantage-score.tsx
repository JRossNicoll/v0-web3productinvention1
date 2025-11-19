"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function VantageScore() {
  const [score, setScore] = useState(0)
  
  useEffect(() => {
    // Animate score up to target
    const target = 842
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setScore(target)
        clearInterval(timer)
      } else {
        setScore(Math.floor(current))
      }
    }, duration / steps)
    
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px] flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite] opacity-10">
        <circle cx="50%" cy="50%" r="48%" fill="none" stroke="url(#gradient1)" strokeWidth="0.5" strokeDasharray="8 8" />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(59, 130, 246)" />
            <stop offset="100%" stopColor="rgb(147, 51, 234)" />
          </linearGradient>
        </defs>
      </svg>
      <svg className="absolute inset-0 w-full h-full animate-[spin_25s_linear_infinite_reverse] opacity-15">
        <circle cx="50%" cy="50%" r="42%" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 12" className="text-white" />
      </svg>
      <svg className="absolute inset-0 w-full h-full animate-[spin_30s_linear_infinite] opacity-20">
        <circle cx="50%" cy="50%" r="36%" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 6" className="text-neon-blue" />
      </svg>
      
      <div className="relative z-10 flex flex-col items-center justify-center text-center bg-gradient-to-br from-black/80 via-black/60 to-black/80 backdrop-blur-2xl rounded-full w-52 h-52 md:w-64 md:h-64 border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.05)]">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-blue/5 via-transparent to-transparent" />
        <div className="relative space-y-3">
          <span className="text-[10px] font-mono text-muted-foreground tracking-[0.25em] uppercase">Vantage Score</span>
          <div className="relative">
            <span className="absolute inset-0 text-7xl md:text-8xl font-bold tracking-tighter text-white tabular-nums blur-sm opacity-50">
              {score}
            </span>
            <span className="relative text-7xl md:text-8xl font-bold tracking-tighter text-white tabular-nums">
              {score}
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 pt-1">
            <div className="relative">
              <span className="absolute inset-0 w-2 h-2 rounded-full bg-neon-green blur-sm" />
              <span className="relative block w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            </div>
            <span className="text-sm font-mono text-neon-green font-bold">+12.4%</span>
          </div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, x: -30, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
        className="absolute top-8 md:top-12 left-0 bg-black/90 border border-white/10 p-3 rounded-xl backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
      >
        <div className="text-[9px] font-mono text-muted-foreground tracking-wider uppercase mb-1">Github Activity</div>
        <div className="text-base md:text-lg font-bold text-white">TOP 1%</div>
        <div className="mt-1 h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div className="h-full w-[99%] bg-gradient-to-r from-neon-blue to-neon-green rounded-full" />
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 30, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.9, type: "spring", stiffness: 100 }}
        className="absolute bottom-16 md:bottom-20 right-0 bg-black/90 border border-white/10 p-3 rounded-xl backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
      >
        <div className="text-[9px] font-mono text-muted-foreground tracking-wider uppercase mb-1">On-Chain Assets</div>
        <div className="text-base md:text-lg font-bold text-white tabular-nums">$142,000</div>
        <div className="text-[10px] text-neon-green font-mono mt-0.5">+$8.2K TODAY</div>
      </motion.div>
    </div>
  )
}
