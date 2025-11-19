"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Github, Twitter, Linkedin, Globe } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useMarket } from "@/lib/store-context"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatCompactNumber } from "@/lib/utils"

const PLATFORM_ICONS = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  globe: Globe,
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
    <Card className="border-white/5 bg-white/5">
      <CardHeader className="border-b border-white/5 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">
            Trending Assets
          </CardTitle>
          {showFilters && (
            <div className="relative">
              <Input 
                placeholder="Search assets..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-xs bg-white/5 border-white/10 h-9 text-sm pl-9"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-white/5 hover:bg-transparent bg-white/[0.02]">
              <TableHead className="font-mono text-xs text-muted-foreground py-3 uppercase tracking-wider pl-6">Asset</TableHead>
              <TableHead className="font-mono text-xs text-muted-foreground py-3 uppercase tracking-wider">Category</TableHead>
              <TableHead className="font-mono text-xs text-muted-foreground text-right py-3 uppercase tracking-wider">Price</TableHead>
              <TableHead className="font-mono text-xs text-muted-foreground text-right py-3 uppercase tracking-wider">24H</TableHead>
              <TableHead className="font-mono text-xs text-muted-foreground text-right py-3 uppercase tracking-wider">Volume</TableHead>
              <TableHead className="font-mono text-xs text-muted-foreground text-right py-3 uppercase tracking-wider">Score</TableHead>
              <TableHead className="font-mono text-xs text-muted-foreground py-3 uppercase tracking-wider">Links</TableHead>
              <TableHead className="font-mono text-xs text-muted-foreground text-right py-3 uppercase tracking-wider pr-6">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssets.map((asset) => {
              const isPositive = asset.change > 0
              
              return (
                <TableRow key={asset.id} className="border-white/5 hover:bg-white/[0.03] cursor-pointer group">
                  <TableCell className="py-3 pl-6">
                    <Link href={`/market/asset/${asset.id}`} className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-white/10">
                        <AvatarImage src={asset.image || "/placeholder.svg"} alt={asset.name} className="object-cover" />
                        <AvatarFallback className="bg-white/5 text-xs font-bold">
                          {asset.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-bold text-sm">{asset.name}</div>
                        <div className="text-xs text-muted-foreground font-mono">{asset.id}</div>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="py-3">
                    <Badge variant="outline" className="border-white/10 bg-white/5 text-xs">
                      {asset.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono font-bold text-sm py-3">
                    ${asset.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      {isPositive ? (
                        <TrendingUp className="w-3 h-3 text-neon-green" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-500" />
                      )}
                      <span className={`text-xs font-mono font-bold ${isPositive ? 'text-neon-green' : 'text-red-500'}`}>
                        {isPositive ? '+' : ''}{asset.change.toFixed(1)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono text-xs text-muted-foreground py-3">
                    ${formatCompactNumber(asset.volume)}
                  </TableCell>
                  <TableCell className="text-right py-3">
                    <span className="font-mono font-bold text-sm text-neon-blue">{asset.score}</span>
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex items-center gap-1">
                      {asset.platforms.map((platform) => {
                        const Icon = PLATFORM_ICONS[platform as keyof typeof PLATFORM_ICONS]
                        return Icon ? (
                          <div key={platform} className="p-1.5 bg-white/5 rounded hover:bg-white/10 transition-colors">
                            <Icon className="w-3 h-3 text-muted-foreground" />
                          </div>
                        ) : null
                      })}
                    </div>
                  </TableCell>
                  <TableCell className="text-right py-3 pr-6">
                    <Link href={`/market/asset/${asset.id}`}>
                      <Button size="sm" variant="outline" className="h-7 text-xs font-mono border-white/10 hover:bg-white/10">
                        TRADE
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
