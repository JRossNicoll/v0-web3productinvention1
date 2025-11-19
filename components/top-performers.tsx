"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Crown, Medal, Award, Users, Activity, Zap, ShieldAlert } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useMarket } from "@/lib/store-context"
import Link from "next/link"

export function TopPerformers({ expanded = false }: { expanded?: boolean }) {
  const { assets } = useMarket()
  
  // Sort by score and get top performers
  const topPerformers = [...assets]
    .sort((a, b) => b.score - a.score)
    .slice(0, expanded ? 10 : 5)
  
  const rankIcons = [Crown, Medal, Award]
  
  return (
    <Card className="border border-white/10 bg-black h-full rounded-none">
      <CardHeader className="pb-3 border-b border-white/10 bg-white/[0.02]">
        <CardTitle className="text-xs font-bold font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <TrendingUp className="w-3 h-3 text-white" />
          :: TOP_PERFORMERS
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 px-0">
        <div className="divide-y divide-white/5">
          {topPerformers.map((asset, index) => {
            const rank = index + 1
            
            return (
              <Link href={`/market/asset/${asset.id}`} key={asset.id} className="block hover:bg-white/[0.02] transition-colors group">
                <div className="flex items-center gap-3 p-3">
                  <div className="relative shrink-0">
                    <Avatar className="h-8 w-8 rounded-none border border-white/20 transition-colors">
                      <AvatarImage src={asset.image || "/placeholder.svg"} alt={asset.name} className="object-cover" />
                      <AvatarFallback className="bg-white/5 text-[9px] font-mono rounded-none">
                        {asset.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-1 -left-1 flex items-center justify-center w-3 h-3 bg-black border border-white/20 text-[8px] font-mono text-white">
                      {rank}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <div className="font-bold text-xs font-mono text-white transition-colors truncate">{asset.name}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="text-[9px] text-muted-foreground font-mono">
                        {asset.id}
                      </div>
                      <div className="w-px h-2 bg-white/10" />
                      <div className="flex items-center gap-1 text-[9px] text-muted-foreground font-mono">
                        <span className="text-white/40">
                          SCR:{asset.sentimentScore || 50}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0 pl-1">
                    <div className={`text-xs font-bold font-mono ${asset.change >= 0 ? 'text-neon-green' : 'text-red-500'}`}>
                      {asset.change >= 0 ? '+' : ''}{asset.change.toFixed(1)}%
                    </div>
                    <div className="text-[10px] text-white/40 font-mono mt-0.5">
                      ${asset.price.toFixed(2)}
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
