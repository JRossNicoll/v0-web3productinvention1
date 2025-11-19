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
      label: "Total Market Cap",
      sublabel: "Across All Assets",
      value: `$${formatCompactNumber(totalMarketCap)}`,
      change: `${avgChange >= 0 ? '+' : ''}${avgChange.toFixed(2)}%`,
      trend: avgChange >= 0 ? "up" : "down",
      icon: DollarSign,
    },
    {
      label: "24h Volume",
      sublabel: "Trading Activity",
      value: `$${formatCompactNumber(totalVolume)}`,
      change: "+5.2%",
      trend: "up",
      icon: Activity,
    },
    {
      label: "Active Identities",
      sublabel: "Verified Traders",
      value: activeIdentities.toLocaleString(),
      change: "+2,104",
      trend: "up",
      icon: Users,
    },
    {
      label: "Avg. Transaction",
      sublabel: "Per Identity",
      value: `$${(totalVolume / (activeIdentities * 0.1)).toFixed(0)}`,
      change: "-3.1%",
      trend: "down",
      icon: Zap,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="border-white/10 bg-gradient-to-br from-neon-green/8 via-black/60 to-black/80 backdrop-blur-xl hover:border-neon-green/40 hover:shadow-[0_0_30px_-10px_var(--color-neon-green)] transition-all duration-500 group relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-neon-green/10 blur-3xl rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
        <div className="absolute top-3 right-3 p-1 rounded-md bg-neon-green/10 border border-neon-green/20">
          <Award className="w-3 h-3 text-neon-green" />
        </div>
        <CardContent className="pt-6 pb-5 relative">
          <div className="mb-4">
            <p className="text-[9px] font-mono text-neon-green/70 uppercase tracking-widest font-bold mb-0.5">Top Performer</p>
            <p className="text-[10px] text-muted-foreground font-medium">24h Change Leader</p>
          </div>
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-white/10 group-hover:border-neon-green/50 transition-all duration-300 shadow-[0_0_20px_-8px_var(--color-neon-green)]">
              <AvatarImage src={topGainer?.image || "/placeholder.svg"} alt={topGainer?.name} className="object-cover" />
              <AvatarFallback className="bg-neon-green/20 text-neon-green font-bold">{topGainer?.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="font-bold text-base text-white group-hover:text-neon-green transition-colors mb-0.5">{topGainer?.name}</div>
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-3 h-3 text-neon-green" />
                <span className="text-xs font-mono text-neon-green font-bold">+{topGainer?.change.toFixed(2)}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-white/10 bg-gradient-to-br from-neon-blue/8 via-black/60 to-black/80 backdrop-blur-xl hover:border-neon-blue/40 hover:shadow-[0_0_30px_-10px_var(--color-neon-blue)] transition-all duration-500 group relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/10 blur-3xl rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
        <div className="absolute top-3 right-3 p-1 rounded-md bg-neon-blue/10 border border-neon-blue/20">
          <Shield className="w-3 h-3 text-neon-blue" />
        </div>
        <CardContent className="pt-6 pb-5 relative">
          <div className="mb-4">
            <p className="text-[9px] font-mono text-neon-blue/70 uppercase tracking-widest font-bold mb-0.5">Most Active</p>
            <p className="text-[10px] text-muted-foreground font-medium">Highest Trading Volume</p>
          </div>
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-white/10 group-hover:border-neon-blue/50 transition-all duration-300 shadow-[0_0_20px_-8px_var(--color-neon-blue)]">
              <AvatarImage src={highestVolume?.image || "/placeholder.svg"} alt={highestVolume?.name} className="object-cover" />
              <AvatarFallback className="bg-neon-blue/20 text-neon-blue font-bold">{highestVolume?.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="font-bold text-base text-white group-hover:text-neon-blue transition-colors mb-0.5">{highestVolume?.name}</div>
              <div className="flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-neon-blue" />
                <span className="text-xs font-mono text-muted-foreground font-medium">${formatCompactNumber(highestVolume?.volume || 0)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {STATS.slice(0, 2).map((stat) => {
        const Icon = stat.icon
        const isPositive = stat.trend === "up"
        
        return (
          <Card key={stat.label} className="border-white/10 bg-gradient-to-br from-white/[0.03] via-black/60 to-black/80 backdrop-blur-xl hover:bg-white/[0.05] hover:border-white/20 hover:shadow-[0_8px_32px_-12px_rgba(255,255,255,0.1)] transition-all duration-500 group">
            <CardContent className="pt-6 pb-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-0.5 font-bold">
                    {stat.label}
                  </p>
                  <p className="text-[10px] text-muted-foreground/70 mb-3 font-medium">
                    {stat.sublabel}
                  </p>
                  <p className="text-2xl font-bold tracking-tight mb-2 text-white group-hover:scale-105 transition-transform origin-left">
                    {stat.value}
                  </p>
                  <div className="flex items-center gap-1.5">
                    {isPositive ? (
                      <TrendingUp className="w-3.5 h-3.5 text-neon-green" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5 text-red-500" />
                    )}
                    <span className={`text-xs font-mono font-bold ${isPositive ? 'text-neon-green' : 'text-red-500'}`}>
                      {stat.change}
                    </span>
                    <span className="text-[10px] text-muted-foreground ml-1">24h</span>
                  </div>
                </div>
                <div className="p-2.5 bg-white/5 rounded-lg group-hover:bg-white/10 transition-all border border-white/5 group-hover:border-white/10">
                  <Icon className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" strokeWidth={2.5} />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
