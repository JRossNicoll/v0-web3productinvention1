"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useMarket } from "@/lib/store-context"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ShieldAlert, Wallet, ArrowUpRight, ArrowDownRight, Activity, Lock, Globe } from 'lucide-react'
import { cn } from "@/lib/utils"

interface IntelItem {
  id: string
  type: 'whale' | 'insider' | 'accumulation' | 'bridge'
  message: string
  asset: string
  amount: string
  timestamp: number
  confidence: number
}

export function IntelligenceFeed() {
  const { isGodMode, assets } = useMarket()
  const [intel, setIntel] = useState<IntelItem[]>([])

  useEffect(() => {
    if (!isGodMode) return

    // Generate initial intel
    const initialIntel = Array.from({ length: 5 }).map(() => generateIntel(assets))
    setIntel(initialIntel)

    // Add new intel periodically
    const interval = setInterval(() => {
      setIntel(prev => [generateIntel(assets), ...prev].slice(0, 20))
    }, 4000)

    return () => clearInterval(interval)
  }, [isGodMode, assets])

  if (!isGodMode) return null

  return (
    <Card className="fixed bottom-6 right-6 w-80 z-50 border-neon-blue/30 bg-black/90 backdrop-blur-xl shadow-[0_0_30px_-10px_rgba(0,243,255,0.2)] animate-in slide-in-from-bottom-10 fade-in duration-500">
      <CardHeader className="py-3 px-4 border-b border-neon-blue/20 bg-neon-blue/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-neon-blue animate-pulse" />
            <CardTitle className="text-xs font-bold font-mono uppercase tracking-widest text-neon-blue">
              Live Intelligence
            </CardTitle>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-blue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-blue"></span>
            </span>
            <span className="text-[9px] font-mono text-neon-blue/70">LIVE FEED</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px]">
          <div className="flex flex-col divide-y divide-white/5">
            {intel.map((item) => (
              <div key={item.id} className="p-3 hover:bg-white/5 transition-colors group">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2">
                    {item.type === 'whale' && <Wallet className="w-3 h-3 text-purple-400" />}
                    {item.type === 'insider' && <Lock className="w-3 h-3 text-amber-400" />}
                    {item.type === 'accumulation' && <Activity className="w-3 h-3 text-emerald-400" />}
                    {item.type === 'bridge' && <Globe className="w-3 h-3 text-blue-400" />}
                    <span className={cn(
                      "text-[10px] font-bold font-mono uppercase",
                      item.type === 'whale' ? "text-purple-400" :
                      item.type === 'insider' ? "text-amber-400" :
                      item.type === 'bridge' ? "text-blue-400" : "text-emerald-400"
                    )}>
                      {item.type === 'bridge' ? 'INSTITUTIONAL BRIDGE' : `${item.type} DETECTED`}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-muted-foreground">
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                </div>
                <p className="text-[11px] text-white/90 font-medium leading-snug mb-1.5">
                  {item.message}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[10px] font-mono text-white/60">
                    <span>{item.asset}</span>
                    <span className="text-white/20">|</span>
                    <span className="text-white">{item.amount}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-white/5 px-1.5 py-0.5 rounded border border-white/5">
                    <span className="text-[9px] text-muted-foreground uppercase">Conf.</span>
                    <span className={cn(
                      "text-[9px] font-bold",
                      item.confidence > 90 ? "text-neon-green" : "text-yellow-400"
                    )}>
                      {item.confidence}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

function generateIntel(assets: any[]): IntelItem {
  const types: ('whale' | 'insider' | 'accumulation' | 'bridge')[] = ['whale', 'insider', 'accumulation', 'bridge']
  const type = Math.random() > 0.7 ? 'bridge' : types[Math.floor(Math.random() * types.length)]
  const asset = assets[Math.floor(Math.random() * assets.length)] || { symbol: 'BTC', price: 65000 }
  
  let message = ''
  let amount = ''
  
  if (type === 'whale') {
    const action = Math.random() > 0.5 ? 'Accumulating' : 'Dumping'
    const value = (Math.random() * 500 + 100).toFixed(0)
    message = `Large wallet ${action.toLowerCase()} positions via OTC desk.`
    amount = `$${value}K Inflow`
  } else if (type === 'insider') {
    message = `Unusual options activity detected before announcement.`
    amount = `+${(Math.random() * 20 + 5).toFixed(1)}% Vol`
  } else if (type === 'bridge') {
    const value = (Math.random() * 50 + 10).toFixed(1)
    message = `Massive liquidity bridge detected from Institutional Custody.`
    amount = `+$${value}M Inflow`
  } else {
    message = `Algorithmic accumulation pattern identified in zone.`
    amount = `Zone: $${(asset.price * (1 - Math.random() * 0.05)).toFixed(2)}`
  }

  return {
    id: Math.random().toString(36).substring(7),
    type,
    message,
    asset: asset.symbol,
    amount,
    timestamp: Date.now(),
    confidence: Math.floor(Math.random() * 20 + 80)
  }
}
