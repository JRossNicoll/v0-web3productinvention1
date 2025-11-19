"use client"

import { useParams } from 'next/navigation'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarketChart } from "@/components/market-chart"
import { RealTradePanel } from "@/components/real-trade-panel"
import { OrderBook } from "@/components/order-book"
import { ActivityFeed } from "@/components/activity-feed"
import { Github, Twitter, Linkedin, Globe, Share2, Star, ShieldCheck, TrendingUp, Activity, BarChart3, ExternalLink, Zap, AlertTriangle } from 'lucide-react'
import { useMarket } from "@/lib/store-context"
import { useEffect, useState } from "react"
import { TechnicalIndicators } from "@/lib/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { InsiderTrades } from "@/components/insider-trades"
import { NewsFeed } from "@/components/news-feed"
import { OrderManagement } from "@/components/order-management"

export default function AssetPage() {
  const params = useParams()
  const id = params.id as string
  const { getAsset, getTechnicalIndicators } = useMarket()
  const asset = getAsset(id)
  const [indicators, setIndicators] = useState<TechnicalIndicators | null>(null)

  useEffect(() => {
    const updateIndicators = () => {
      const data = getTechnicalIndicators(id)
      setIndicators(data)
    }
    
    updateIndicators()
    const interval = setInterval(updateIndicators, 2000)
    return () => clearInterval(interval)
  }, [id, getTechnicalIndicators])

  if (!asset) {
    return <div className="p-12 text-center text-muted-foreground">Asset not found</div>
  }

  const isPositive = asset.change >= 0

  return (
    <div className="space-y-6">
      {/* Asset Header */}
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between pb-6 border-b border-white/5">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border border-white/10">
            <AvatarImage src={asset.image || "/placeholder.svg"} alt={asset.name} className="object-cover" />
            <AvatarFallback className="text-xl font-bold bg-white/5">
              {asset.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">{asset.name}</h1>
              <Badge variant="outline" className="border-neon-green/30 text-neon-green bg-neon-green/5 text-xs">
                VERIFIED
              </Badge>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
              <span className="font-mono">${asset.id}</span>
              <span>•</span>
              <span>{asset.category}</span>
              {asset.socials && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    {asset.socials.github && (
                      <a href={asset.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {asset.socials.twitter && (
                      <a href={asset.socials.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                        <Twitter className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {asset.socials.linkedin && (
                      <a href={asset.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {asset.socials.website && (
                      <a href={asset.socials.website} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                        <Globe className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" className="border-white/10 hover:bg-white/5">
            <Share2 className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" className="border-white/10 hover:bg-white/5">
            <Star className="w-4 h-4" />
          </Button>
          <div className="text-right px-4 py-2 bg-white/5 rounded-lg border border-white/5">
            <div className="text-2xl font-bold font-mono">${asset.price.toFixed(2)}</div>
            <div className={`text-xs font-mono flex justify-end items-center gap-1 ${isPositive ? 'text-neon-green' : 'text-red-500'}`}>
              {isPositive ? '+' : ''}{asset.change.toFixed(1)}% <span className="text-muted-foreground">(24h)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chart Section */}
          <Card className="border-white/5 bg-white/5">
            <CardContent className="p-6">
              <MarketChart assetId={id} />
            </CardContent>
          </Card>

          {/* Technical Indicators Bar */}
          {indicators && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="border-white/5 bg-white/5">
                <CardContent className="p-4">
                  <div className="text-xs text-muted-foreground font-mono mb-1 uppercase tracking-wider">RSI (14)</div>
                  <div className={`text-xl font-bold font-mono ${indicators.rsi > 70 ? 'text-red-500' : indicators.rsi < 30 ? 'text-neon-green' : 'text-white'}`}>
                    {indicators.rsi.toFixed(2)}
                  </div>
                </CardContent>
              </Card>
              <Card className="border-white/5 bg-white/5">
                <CardContent className="p-4">
                  <div className="text-xs text-muted-foreground font-mono mb-1 uppercase tracking-wider">MACD</div>
                  <div className={`text-xl font-bold font-mono ${indicators.macd.histogram > 0 ? 'text-neon-green' : 'text-red-500'}`}>
                    {indicators.macd.value.toFixed(2)}
                  </div>
                </CardContent>
              </Card>
              <Card className="border-white/5 bg-white/5">
                <CardContent className="p-4">
                  <div className="text-xs text-muted-foreground font-mono mb-1 uppercase tracking-wider">Volatility</div>
                  <div className="text-xl font-bold font-mono text-white">
                    {indicators.volatility.toFixed(2)}%
                  </div>
                </CardContent>
              </Card>
              <Card className="border-white/5 bg-white/5">
                <CardContent className="p-4">
                  <div className="text-xs text-muted-foreground font-mono mb-1 uppercase tracking-wider">24h Volume</div>
                  <div className="text-xl font-bold font-mono text-white">
                    ${indicators.volume24h.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Market Cap", value: `$${asset.marketCap.toLocaleString()}` },
              { label: "Volume (24h)", value: `$${asset.volume.toLocaleString()}` },
              { label: "Circulating", value: "118,000" },
              { label: "All Time High", value: `$${(asset.price * 1.4).toFixed(2)}` },
              { label: "Holders", value: asset.holders?.toLocaleString() || "N/A" },
              { label: "Sector Dom.", value: asset.sectorDominance ? `${asset.sectorDominance}%` : "N/A" },
              { label: "Sentiment", value: asset.sentimentScore ? `${asset.sentimentScore}/100` : "N/A" },
              { label: "Volatility", value: indicators ? `${indicators.volatility.toFixed(1)}%` : "N/A" },
              { label: "Risk Rating", value: asset.riskRating || "N/A" },
              { label: "Smart Money", value: asset.smartMoneyFlow ? (asset.smartMoneyFlow > 0 ? `+${asset.smartMoneyFlow}` : `${asset.smartMoneyFlow}`) : "N/A" },
            ].map((stat) => (
              <Card key={stat.label} className="border-white/5 bg-white/5">
                <CardContent className="p-4">
                  <div className="text-xs text-muted-foreground font-mono mb-1 uppercase tracking-wider flex items-center gap-1">
                    {stat.label === "Risk Rating" && <AlertTriangle className="w-3 h-3" />}
                    {stat.label === "Smart Money" && <Zap className="w-3 h-3" />}
                    {stat.label}
                  </div>
                  <div className={`text-lg font-bold font-mono ${
                    stat.label === "Risk Rating" ? (
                      stat.value === "Low" ? "text-neon-green" :
                      stat.value === "Medium" ? "text-yellow-400" :
                      stat.value === "High" ? "text-orange-500" :
                      stat.value === "Extreme" ? "text-red-500" : "text-white"
                    ) : stat.label === "Smart Money" ? (
                      parseInt(stat.value) > 0 ? "text-neon-blue" : "text-white/60"
                    ) : "text-white"
                  }`}>
                    {stat.value}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabs for Info/Activity */}
          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="bg-white/5 border border-white/5 w-full justify-start">
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="insider">Insider Trades</TabsTrigger>
              <TabsTrigger value="news">News</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>
            <TabsContent value="activity" className="mt-4">
              <div className="grid grid-cols-1 gap-6">
                <OrderManagement />
                <ActivityFeed />
              </div>
            </TabsContent>
            <TabsContent value="insider" className="mt-4">
              <InsiderTrades assetId={id} />
            </TabsContent>
            <TabsContent value="news" className="mt-4">
              <NewsFeed assetId={id} />
            </TabsContent>
            <TabsContent value="about" className="mt-4">
              <Card className="border-white/5 bg-white/5">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-bold text-lg">About {asset.name}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    High impact individual in the {asset.category} space. 
                    Consistently delivering value and growing their influence network.
                  </p>
                  
                  {asset.socials && (
                    <div className="pt-4 border-t border-white/5">
                      <div className="text-xs text-muted-foreground mb-3 uppercase tracking-wider font-mono">Social Links</div>
                      <div className="flex flex-wrap gap-2">
                        {asset.socials.twitter && (
                          <a 
                            href={asset.socials.twitter} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm"
                          >
                            <Twitter className="w-4 h-4" />
                            <span>Twitter</span>
                            <ExternalLink className="w-3 h-3 opacity-50" />
                          </a>
                        )}
                        {asset.socials.github && (
                          <a 
                            href={asset.socials.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm"
                          >
                            <Github className="w-4 h-4" />
                            <span>GitHub</span>
                            <ExternalLink className="w-3 h-3 opacity-50" />
                          </a>
                        )}
                        {asset.socials.linkedin && (
                          <a 
                            href={asset.socials.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm"
                          >
                            <Linkedin className="w-4 h-4" />
                            <span>LinkedIn</span>
                            <ExternalLink className="w-3 h-3 opacity-50" />
                          </a>
                        )}
                        {asset.socials.website && (
                          <a 
                            href={asset.socials.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm"
                          >
                            <Globe className="w-4 h-4" />
                            <span>Website</span>
                            <ExternalLink className="w-3 h-3 opacity-50" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1 font-mono uppercase tracking-wider">Vantage Score</div>
                      <div className="text-2xl font-bold font-mono text-neon-blue">{asset.score}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1 font-mono uppercase tracking-wider">Influence Rank</div>
                      <div className="text-2xl font-bold font-mono">#{Math.floor(Math.random() * 100) + 1}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar - Right Column */}
        <div className="space-y-6">
          <RealTradePanel symbol={asset.id} price={asset.price} />
          <OrderBook price={asset.price} />
        </div>
      </div>
    </div>
  )
}
