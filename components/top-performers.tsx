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
    <Card className="border-white/5 bg-black/20 backdrop-blur-sm h-full">
      <CardHeader className="pb-4 border-b border-white/5">
        <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-neon-green" />
          Top Performers
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          {topPerformers.map((asset, index) => {
            const RankIcon = rankIcons[index]
            const rank = index + 1
            
            return (
              <Link href={`/market/asset/${asset.id}`} key={asset.id}>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer group border border-transparent hover:border-white/10 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5">
                  <div className="relative shrink-0">
                    <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border-2 border-white/10 group-hover:border-neon-blue transition-colors shadow-md">
                      <AvatarImage src={asset.image || "/placeholder.svg"} alt={asset.name} className="object-cover" />
                      <AvatarFallback className="bg-white/5 text-xs font-bold">
                        {asset.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full font-bold text-[10px] border-2 border-black shadow-sm transition-transform group-hover:scale-110 ${
                      index === 0 ? 'bg-yellow-400 text-black' : 
                      index === 1 ? 'bg-gray-300 text-black' : 
                      index === 2 ? 'bg-amber-600 text-white' : 
                      'bg-white/10 text-white backdrop-blur-md'
                    }`}>
                      {RankIcon ? <RankIcon className="w-3 h-3" /> : rank}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <div className="font-bold text-sm text-white group-hover:text-neon-blue transition-colors truncate pr-2">{asset.name}</div>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <div className="text-[10px] text-muted-foreground font-mono bg-white/5 px-1.5 py-0.5 rounded shrink-0">
                        {asset.id}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground shrink-0">
                        <Activity className="w-3 h-3" />
                        <span className={asset.sentimentScore && asset.sentimentScore > 70 ? "text-neon-green" : "text-white/60"}>
                          {asset.sentimentScore || 50}/100
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground hidden xl:flex shrink-0">
                        <Users className="w-3 h-3" />
                        <span>{(asset.holders || 0).toLocaleString()}</span>
                      </div>
                      {asset.smartMoneyFlow !== undefined && (
                        <div className="flex items-center gap-1 text-[10px] hidden 2xl:flex shrink-0" title="Smart Money Flow">
                          <Zap className={`w-3 h-3 ${asset.smartMoneyFlow > 0 ? 'text-yellow-400' : 'text-muted-foreground'}`} />
                          <span className={asset.smartMoneyFlow > 0 ? "text-yellow-400" : "text-muted-foreground"}>
                            {asset.smartMoneyFlow > 0 ? '+' : ''}{asset.smartMoneyFlow}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right shrink-0 pl-1">
                    <div className={`text-sm font-bold font-mono ${asset.change >= 0 ? 'text-neon-green' : 'text-red-500'} flex items-center justify-end gap-1`}>
                      {asset.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingUp className="w-3 h-3 rotate-180" />}
                      {asset.change >= 0 ? '+' : ''}{asset.change.toFixed(1)}%
                    </div>
                    <div className="text-xs text-white/60 font-mono mt-0.5">
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
