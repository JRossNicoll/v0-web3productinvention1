"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useMarket } from "@/lib/store-context"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatCompactNumber } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const PLATFORM_ICONS = {
  github: 'Github',
  twitter: 'Twitter',
  linkedin: 'Linkedin',
  globe: 'Globe',
}

export function AssetTable({ showFilters = false }: { showFilters?: boolean }) {
  const [search, setSearch] = useState("")
  const { assets } = useMarket()
  
  const filteredAssets = assets.filter(asset => 
    asset.name.toLowerCase().includes(search.toLowerCase()) ||
    asset.id.toLowerCase().includes(search.toLowerCase()) ||
    asset.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="w-full bg-black border border-white/10 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <h3 className="text-sm font-medium text-white">Market Overview</h3>
        {showFilters && (
          <div className="relative">
            <Input 
              placeholder="Search assets..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-xs bg-white/5 border-white/10 h-8 text-xs rounded-md focus:border-white/30 transition-colors"
            />
          </div>
        )}
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-xs font-medium text-muted-foreground h-10">Asset</TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground h-10">Rank</TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground text-right h-10">Price</TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground text-right h-10">24h %</TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground text-right h-10">Monthly PnL</TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground text-right h-10">Win Rate</TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground text-right h-10">Volume</TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground text-right h-10 pr-6">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssets.map((asset, index) => {
              const isPositive = asset.change > 0
              
              return (
                <TableRow key={asset.id} className="border-white/5 hover:bg-white/5 transition-colors">
                  <TableCell className="py-3">
                    <Link href={`/market/asset/${asset.id}`} className="flex items-center gap-3 group">
                      <Avatar className="h-8 w-8 rounded-full border border-white/10 group-hover:border-white/30 transition-colors">
                        <AvatarImage src={asset.image || "/placeholder.svg"} alt={asset.name} className="object-cover" />
                        <AvatarFallback className="bg-white/10 text-[10px] text-white">
                          {asset.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm text-white group-hover:text-white/90 transition-colors">{asset.name}</div>
                        <div className="text-[10px] text-muted-foreground">{asset.symbol}</div>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="py-3">
                    <span className="text-xs text-muted-foreground">#{asset.kolStats?.rank || index + 1}</span>
                  </TableCell>
                  <TableCell className="text-right font-medium text-sm text-white py-3">
                    ${asset.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right py-3">
                    <span className={`text-xs font-medium ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                      {isPositive ? '+' : ''}{asset.change.toFixed(1)}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium text-sm text-emerald-500 py-3">
                    {asset.kolStats ? `+$${formatCompactNumber(asset.kolStats.monthlyPnL)}` : '-'}
                  </TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground py-3">
                    {asset.kolStats ? `${asset.kolStats.winRate}%` : '-'}
                  </TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground py-3">
                    ${formatCompactNumber(asset.volume)}
                  </TableCell>
                  <TableCell className="text-right py-3 pr-6">
                    <Link href={`/market/asset/${asset.id}`}>
                      <Button size="sm" variant="outline" className="h-7 text-xs border-white/10 hover:bg-white hover:text-black transition-colors rounded-md px-3">
                        Trade
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
