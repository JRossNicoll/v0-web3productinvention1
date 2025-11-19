"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownLeft, PieChart, DollarSign, Loader2 } from 'lucide-react'
import { AllocationChart } from "@/components/allocation-chart"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useMarket } from "@/lib/store-context"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { SolanaTradeService } from "@/lib/services/solana-trade-service"

export function PortfolioView() {
  const { connected, publicKey, wallet } = useWallet()
  const { connection } = useConnection()
  const { setVisible } = useWalletModal()
  const [isClient, setIsClient] = useState(false)
  const [realVantBalance, setRealVantBalance] = useState<number>(0)
  
  const { userState, assets } = useMarket()

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!publicKey || !connection) return

    const tradeService = new SolanaTradeService(connection.rpcEndpoint)
    
    const fetchBalance = async () => {
      try {
        const balance = await tradeService.getVantBalance(publicKey)
        setRealVantBalance(balance)
      } catch (error) {
        console.error("Failed to fetch VANT balance:", error)
      }
    }

    fetchBalance()
    const interval = setInterval(fetchBalance, 10000) // Refresh every 10s
    return () => clearInterval(interval)
  }, [publicKey, connection])

  if (!isClient) return null

  if (!connected) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2 tracking-tight font-mono">PORTFOLIO_ACCESS</h2>
          <p className="text-muted-foreground text-sm font-mono">AUTHENTICATION REQUIRED</p>
        </div>
        <Card className="border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden relative group border-dashed">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <CardContent className="pt-6 relative z-10">
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-24 h-24 bg-white/5 flex items-center justify-center mb-8 relative border border-white/10 group-hover:border-white/30 transition-all duration-500">
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/30" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30" />
                <Wallet className="w-10 h-10 text-muted-foreground group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-3xl font-bold mb-4 tracking-tight font-mono uppercase">Connect_Wallet</h3>
              <p className="text-muted-foreground text-base max-w-md mb-10 leading-relaxed font-mono text-sm">
                Link your Solana wallet to view holdings, track performance, and manage your human equity portfolio.
              </p>
              <div className="relative group">
                <div className="absolute -inset-1 bg-white/20 rounded blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                <Button 
                  onClick={() => setVisible(true)}
                  className="relative bg-white text-black hover:bg-white/90 font-mono font-bold h-14 px-10 text-base rounded-none border border-transparent hover:border-white/20 transition-all duration-300"
                >
                  INITIALIZE CONNECTION
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const portfolioAssets = userState.portfolio.map(item => {
    const asset = assets.find(a => a.id === item.assetId)
    if (!asset) return null
    
    const currentValue = item.amount * asset.price
    const costBasis = item.amount * item.averageBuyPrice
    const pnl = currentValue - costBasis
    const pnlPercent = (pnl / costBasis) * 100
    
    return {
      id: asset.id,
      name: asset.name,
      amount: item.amount,
      value: currentValue,
      change: pnlPercent,
      allocation: 0 // Will calculate below
    }
  }).filter(Boolean)

  const VANT_PRICE = 0.00001650
  
  const vantAsset = {
    id: "$VANT",
    name: "Vantage Token",
    symbol: "$VANT",
    image: "/vantage-token.jpg", // Updated to use the correct token image
    quantity: realVantBalance, 
    avgPrice: VANT_PRICE, // Updated to real price
    currentPrice: VANT_PRICE, // Updated to real price
    value: realVantBalance * VANT_PRICE, // Calculate real value
    change24h: 0,
    pnl: 0,
    pnlPercent: 0,
    amount: realVantBalance,
    change: 0,
    allocation: 0
  }

  const allAssets = [...portfolioAssets, vantAsset]
  const totalValue = allAssets.reduce((sum, a) => sum + a.value, 0)
  
  // Calculate allocations
  allAssets.forEach(asset => {
    asset.allocation = totalValue > 0 ? (asset.value / totalValue) * 100 : 0
  })

  // Calculate 24h P&L
  const dailyPnL = userState.portfolio.reduce((sum, item) => {
    const asset = assets.find(a => a.id === item.assetId)
    if (!asset) return sum
    const dailyChange = (asset.change / 100) * (item.amount * asset.price)
    return sum + dailyChange
  }, 0)

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1 font-mono">PORTFOLIO OVERVIEW</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            CONNECTED: {publicKey?.toBase58().slice(0, 4)}...{publicKey?.toBase58().slice(-4)}
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-white/10 hover:bg-white/5 font-mono text-xs">
            <ArrowDownLeft className="w-3 h-3 mr-2" />
            DEPOSIT
          </Button>
          <Button className="bg-white text-black hover:bg-white/90 font-mono text-xs font-bold">
            <ArrowUpRight className="w-3 h-3 mr-2" />
            WITHDRAW
          </Button>
        </div>
      </div>

      {/* Portfolio Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-white/10 bg-black/40 backdrop-blur-md">
          <CardContent className="p-6">
            <div className="text-[10px] font-bold text-muted-foreground tracking-widest mb-2 font-mono">TOTAL BALANCE</div>
            <div className="text-4xl font-bold tracking-tight font-mono text-white">
              ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="flex items-center gap-2 mt-2 text-xs font-mono">
              <span className={`flex items-center gap-1 px-1.5 py-0.5 rounded ${
                dailyPnL >= 0 ? 'text-neon-green bg-neon-green/10' : 'text-red-500 bg-red-500/10'
              }`}>
                <TrendingUp className="w-3 h-3" />
                {dailyPnL >= 0 ? '+' : ''}{((dailyPnL / totalValue) * 100).toFixed(2)}%
              </span>
              <span className="text-muted-foreground">24H CHANGE</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-black/40 backdrop-blur-md">
          <CardContent className="p-6">
            <div className="text-[10px] font-bold text-muted-foreground tracking-widest mb-2 font-mono">24H P&L</div>
            <div className={`text-4xl font-bold tracking-tight font-mono text-white ${dailyPnL >= 0 ? 'text-neon-green' : 'text-red-500'}`}>
              {dailyPnL >= 0 ? '+' : ''}${dailyPnL.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="flex items-center gap-2 mt-2 text-xs font-mono">
              <span className="text-muted-foreground">REALIZED YIELD</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-black/40 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-xs font-mono text-muted-foreground flex items-center gap-2 tracking-widest">
              <PieChart className="w-3 h-3" />
              ALLOCATION
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AllocationChart assets={allAssets} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Asset Allocation */}
        <Card className="border-white/10 lg:col-span-1 bg-black/40">
          <CardHeader>
            <CardTitle className="text-xs font-mono text-muted-foreground tracking-widest">ALLOCATION</CardTitle>
          </CardHeader>
          <CardContent>
            <AllocationChart assets={allAssets} />
          </CardContent>
        </Card>

        {/* Holdings Table */}
        <Card className="border-white/10 lg:col-span-2 bg-black/40">
          <CardHeader>
            <CardTitle className="text-xs font-mono text-muted-foreground tracking-widest">HOLDINGS</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {allAssets.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground text-sm font-mono">
                NO HOLDINGS DETECTED. INITIATE TRADES TO BUILD PORTFOLIO.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-white/5 hover:bg-transparent">
                    <TableHead className="font-mono text-[10px] tracking-wider text-muted-foreground">ASSET</TableHead>
                    <TableHead className="font-mono text-[10px] tracking-wider text-muted-foreground text-right">BALANCE</TableHead>
                    <TableHead className="font-mono text-[10px] tracking-wider text-muted-foreground text-right">VALUE</TableHead>
                    <TableHead className="font-mono text-[10px] tracking-wider text-muted-foreground text-right">ALLOCATION</TableHead>
                    <TableHead className="font-mono text-[10px] tracking-wider text-muted-foreground text-right">P&L</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allAssets.map((asset) => (
                    <TableRow key={asset.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                      <TableCell className="py-4">
                        <Link href={asset.id === "$VANT" ? "#" : `/market/asset/${asset.id}`} className="flex items-center gap-4">
                          <Avatar className="h-8 w-8 border border-white/10 rounded-none">
                            <AvatarImage src={(asset as any).image || "/placeholder.svg"} alt={asset.name} className="object-cover" />
                            <AvatarFallback className="rounded-none bg-white/5 font-mono text-xs">{asset.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-bold text-sm text-white group-hover:text-neon-blue transition-colors font-mono">{asset.name}</div>
                            <div className="text-[10px] text-muted-foreground font-mono">{asset.id}</div>
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm text-white/90">
                        {asset.amount.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                      </TableCell>
                      <TableCell className="text-right font-bold font-mono text-sm text-white">
                        ${asset.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell className="text-right w-[200px]">
                        <div className="flex items-center justify-end gap-3">
                          <span className="text-[10px] font-mono text-muted-foreground w-12 text-right">{asset.allocation.toFixed(1)}%</span>
                          <div className="w-16 h-1 bg-white/5 overflow-hidden">
                            <div 
                              className="h-full bg-white" 
                              style={{ width: `${Math.min(asset.allocation, 100)}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {asset.change !== 0 && (
                          <span className={`font-mono text-xs ${asset.change > 0 ? 'text-neon-green' : 'text-red-500'}`}>
                            {asset.change > 0 ? '+' : ''}{asset.change.toFixed(2)}%
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
