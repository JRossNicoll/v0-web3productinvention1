"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react'
import { useMarket } from "@/lib/store-context"

export function ActivityFeed() {
  const { userState } = useMarket()
  const trades = userState.trades

  return (
    <Card className="border-white/5">
      <CardContent className="p-0">
        {trades.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground text-sm">
            No recent activity
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {trades.map((trade) => {
              const isBuy = trade.side === "buy"
              const timeAgo = Math.floor((Date.now() - trade.timestamp) / 1000 / 60)
              
              return (
                <div key={trade.id} className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${isBuy ? 'bg-neon-green/10 text-neon-green' : 'bg-red-500/10 text-red-500'}`}>
                      {isBuy ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="font-bold text-sm">
                        {isBuy ? "Bought" : "Sold"} <span className="text-white">{trade.amount.toFixed(4)}</span>
                      </div>
                      <div className="text-xs text-muted-foreground font-mono">
                        {trade.assetId}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm font-bold">${trade.price.toFixed(2)}</div>
                    <div className="text-xs text-muted-foreground">
                      {timeAgo < 1 ? 'Just now' : `${timeAgo}m ago`}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
