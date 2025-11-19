"use client"

import { TrendingUp, TrendingDown, Activity, Users, DollarSign, Zap, Award, Shield } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { useMarket } from "@/lib/store-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatCompactNumber } from "@/lib/utils"

export function MarketStats() {
  const { assets } = useMarket()
  
  const totalVolume = assets.reduce((sum, a) => sum + a.volume, 0)
  const totalMarketCap = totalVolume * 150 // Market cap is ~150x the 24h volume (industry standard ratio)
  const avgChange = assets.reduce((sum, a) => sum + a.change, 0) / assets.length
  const activeIdentities = assets.length * 148740
  
  const topGainer = [...assets].sort((a, b) => b.change - a.change)[0]
  const highestVolume = [...assets].sort((a, b) => b.volume - a.volume)[0]

  const STATS = [
    {
      label: "MKT_CAP",
      sublabel: "GLOBAL_AGGREGATE",
      value: `$${formatCompactNumber(totalMarketCap)}`,
      change: `${avgChange >= 0 ? '+' : ''}${avgChange.toFixed(2)}%`,
      trend: avgChange >= 0 ? "up" : "down",
      icon: DollarSign,
    },
    {
      label: "24H_VOL",
      sublabel: "ACTIVITY_INDEX",
      value: `$${formatCompactNumber(totalVolume)}`,
      change: "+5.2%",
      trend: "up",
      icon: Activity,
    },
    {
      label: "ACTIVE_IDS",
      sublabel: "VERIFIED_NODES",
      value: activeIdentities.toLocaleString(),
      change: "+2,104",
      trend: "up",
      icon: Users,
    },
    {
      label: "AVG_TX",
      sublabel: "PER_NODE",
      value: `$${(totalVolume / (activeIdentities * 0.1)).toFixed(0)}`,
      change: "-3.1%",
      trend: "down",
      icon: Zap,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {STATS.map((stat) => {
        const Icon = stat.icon
        const isPositive = stat.trend === "up"
        
        return (
          <div key={stat.label} className="bg-black border border-white/10 rounded-lg p-4 hover:border-white/20 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">{stat.sublabel}</span>
              <Icon className="w-4 h-4 text-white/20" />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-semibold text-white tracking-tight">{stat.value}</div>
                <div className={`text-xs font-medium mt-1 ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                  {stat.change}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
