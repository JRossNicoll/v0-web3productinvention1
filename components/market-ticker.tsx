"use client"

import { useMarket } from "@/lib/store-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TrendingUp, TrendingDown } from 'lucide-react'

export function MarketTicker() {
  const { assets } = useMarket()
  
  // Take top 7 assets for ticker
  const tickerItems = assets.slice(0, 7).map(asset => ({
    symbol: asset.id,
    name: asset.name,
    price: asset.price.toFixed(2),
    change: asset.change,
    changeText: `${asset.change >= 0 ? '+' : ''}${asset.change.toFixed(1)}%`,
    image: asset.image
  }))

  return (
    <div className="flex overflow-hidden whitespace-nowrap py-3">
      <div className="flex animate-ticker">
        {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
          <div 
            key={i} 
            className="group flex items-center gap-3 px-6 border-r border-white/5 min-w-[240px] hover:bg-white/[0.02] transition-colors cursor-pointer"
          >
            <Avatar className="h-8 w-8 border border-white/10 ring-1 ring-white/5 group-hover:ring-white/10 transition-all">
              <AvatarImage src={item.image || "/placeholder.svg"} alt={item.name} className="object-cover" />
              <AvatarFallback className="text-xs bg-gradient-to-br from-white/10 to-white/5">
                {item.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-bold text-white group-hover:text-neon-blue transition-colors">{item.name}</span>
              <div className="flex items-center gap-3 text-xs">
                <span className="font-mono text-white/80 tabular-nums">${item.price}</span>
                <div className={`flex items-center gap-1 font-mono font-medium ${item.change >= 0 ? "text-neon-green" : "text-neon-red"}`}>
                  {item.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {item.changeText}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
