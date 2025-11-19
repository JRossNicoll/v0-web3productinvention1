"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useMarket } from "@/lib/store-context"
import { useParams } from 'next/navigation'
import { useEffect, useState } from "react"
import { OrderBook as OrderBookType } from "@/lib/types"

export function OrderBook({ price }: { price?: number }) {
  const params = useParams()
  const id = params.id as string
  const { getOrderBook } = useMarket()
  const [orderBook, setOrderBook] = useState<OrderBookType | undefined>()

  useEffect(() => {
    const interval = setInterval(() => {
      const book = getOrderBook(id)
      if (book) setOrderBook(book)
    }, 1000)
    
    return () => clearInterval(interval)
  }, [id, getOrderBook])

  if (!orderBook) return null

  const { asks, bids } = orderBook
  const maxTotal = Math.max(
    ...asks.map(a => a.total), 
    ...bids.map(b => b.total)
  )

  return (
    <Card className="border-white/5 h-full bg-black/20 backdrop-blur-sm flex flex-col overflow-hidden">
      <CardHeader className="pb-3 pt-4 px-4 border-b border-white/5 bg-white/[0.02]">
        <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex justify-between items-center">
          <span>Order Book</span>
          <span className="flex items-center gap-1.5 text-[10px] bg-white/5 px-2 py-0.5 rounded-full text-white/70 border border-white/5">
            <span className="w-1 h-1 rounded-full bg-neon-green animate-pulse" />
            LIVE
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1 flex flex-col min-h-0">
        <div className="grid grid-cols-3 px-4 py-2 text-[9px] font-mono text-muted-foreground border-b border-white/5 bg-black/20 uppercase tracking-wider">
          <div>PRICE (USD)</div>
          <div className="text-right">SIZE</div>
          <div className="text-right">TOTAL</div>
        </div>
        
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="flex flex-col gap-[1px]">
            {/* Asks (Sells) - Red */}
            <div className="flex flex-col-reverse pb-1">
              {asks.slice(0, 12).map((ask, i) => (
                <div key={i} className="grid grid-cols-3 px-4 py-1 text-[11px] font-mono hover:bg-white/5 relative group cursor-pointer transition-colors">
                  <span className="text-red-400 relative z-10 font-medium">{ask.price.toFixed(2)}</span>
                  <span className="text-right text-white/60 relative z-10">{ask.amount.toFixed(2)}</span>
                  <span className="text-right text-white/40 relative z-10">{Math.round(ask.total).toLocaleString()}</span>
                  <div 
                    className="absolute top-0 right-0 bottom-0 bg-red-500/10 pointer-events-none transition-all duration-300 group-hover:bg-red-500/20 border-l border-red-500/20" 
                    style={{ width: `${(ask.total / maxTotal) * 100}%` }} 
                  />
                </div>
              ))}
            </div>

            {/* Spread */}
            <div className="py-2 px-4 flex justify-between items-center border-y border-white/10 bg-white/[0.03] backdrop-blur-md sticky top-0 bottom-0 z-20 my-1">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-white tracking-tight font-mono">${price?.toFixed(2)}</span>
                {orderBook.spread && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-muted-foreground font-mono border border-white/5">
                    Spread: {((orderBook.spread / (orderBook.midPrice || 1)) * 100).toFixed(3)}%
                  </span>
                )}
              </div>
            </div>

            {/* Bids (Buys) - Green */}
            <div className="flex flex-col pt-1">
              {bids.slice(0, 12).map((bid, i) => (
                <div key={i} className="grid grid-cols-3 px-4 py-1 text-[11px] font-mono hover:bg-white/5 relative group cursor-pointer transition-colors">
                  <span className="text-neon-green relative z-10 font-medium">{bid.price.toFixed(2)}</span>
                  <span className="text-right text-white/60 relative z-10">{bid.amount.toFixed(2)}</span>
                  <span className="text-right text-white/40 relative z-10">{Math.round(bid.total).toLocaleString()}</span>
                  <div 
                    className="absolute top-0 right-0 bottom-0 bg-neon-green/10 pointer-events-none transition-all duration-300 group-hover:bg-neon-green/20 border-l border-neon-green/20" 
                    style={{ width: `${(bid.total / maxTotal) * 100}%` }} 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
