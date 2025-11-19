"use client"

import { useState, useEffect } from "react"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { PublicKey } from "@solana/web3.js"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Wallet, ArrowDownUp, Loader2, ExternalLink, Info } from 'lucide-react'
import { SolanaTradeService } from "@/lib/services/solana-trade-service"
import { NumberInput } from "@/components/ui/number-input"
import { useToast } from "@/hooks/use-toast"
import { useMarket } from "@/lib/store-context"

const NATIVE_TOKEN_SYMBOL = "$VANT"

export function RealTradePanel({ symbol, price }: { symbol: string, price: number }) {
  const [amount, setAmount] = useState("")
  const [sliderValue, setSliderValue] = useState([0])
  const [activeTab, setActiveTab] = useState("buy")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [vantBalance, setVantBalance] = useState(0)
  
  const { publicKey, signTransaction } = useWallet()
  const { connection } = useConnection()
  const { toast } = useToast()
  const { processTrade } = useMarket()
  
  const tradeService = new SolanaTradeService(connection.rpcEndpoint)

  useEffect(() => {
    if (!publicKey) return
    
    const fetchBalances = async () => {
      try {
        const vantBal = await tradeService.getVantBalance(publicKey)
        setVantBalance(vantBal)
      } catch (error) {
        console.error('[v0] Error fetching VANT balance:', error)
      }
    }
    
    fetchBalances()
    const interval = setInterval(fetchBalances, 10000) // Refresh every 10s
    
    return () => clearInterval(interval)
  }, [publicKey, connection])

  const handleTrade = async () => {
    if (!publicKey || !signTransaction) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your Solana wallet to trade",
        variant: "destructive"
      })
      return
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount",
        variant: "destructive"
      })
      return
    }
    
    if (activeTab === "sell") {
      toast({
        title: "Sell not available",
        description: "Selling requires backend treasury integration",
        variant: "destructive"
      })
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const vantAmount = parseFloat(amount)
      
      if (vantAmount > vantBalance) {
        toast({
          title: "Insufficient balance",
          description: `You need ${vantAmount.toFixed(4)} ${NATIVE_TOKEN_SYMBOL} but only have ${vantBalance.toFixed(4)}`,
          variant: "destructive"
        })
        setIsSubmitting(false)
        return
      }
      
      toast({
        title: "Confirm in Wallet",
        description: "Please approve the transaction in your wallet...",
        duration: 5000,
      })
      
      const result = await tradeService.buyAsset(publicKey, signTransaction, vantAmount)
      
      if (result.success) {
        processTrade(symbol, vantAmount, 'buy')

        toast({
          title: "Purchase successful!",
          description: (
            <div className="flex flex-col gap-2">
              <p>Sent {vantAmount.toFixed(4)} {NATIVE_TOKEN_SYMBOL} to treasury</p>
              <a 
                href={`https://solscan.io/tx/${result.signature}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-neon-blue hover:underline text-xs"
              >
                View on Solscan <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ),
        })
        
        // Reset form
        setAmount("")
        setSliderValue([0])
        
        // Refresh balance
        const vantBal = await tradeService.getVantBalance(publicKey)
        setVantBalance(vantBal)
      } else {
        toast({
          title: "Transaction failed",
          description: result.error || "Please try again",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('[v0] Trade error:', error)
      toast({
        title: "Transaction failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value)
    const percentage = value[0] / 100
    const vantAmount = vantBalance * percentage
    setAmount(vantAmount.toFixed(4))
  }

  if (!publicKey) {
    return (
      <Card className="border-white/5 bg-black/40 backdrop-blur-xl sticky top-20 shadow-2xl shadow-black/50">
        <CardContent className="pt-12 pb-12 flex flex-col items-center justify-center gap-4">
          <Wallet className="w-12 h-12 text-muted-foreground opacity-20" />
          <div className="text-center">
            <p className="text-sm font-medium text-white mb-1">Connect Wallet to Trade</p>
            <p className="text-xs text-muted-foreground">Connect your Solana wallet to start trading</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-white/5 bg-black/40 backdrop-blur-xl sticky top-20 shadow-2xl shadow-black/50 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-blue opacity-50" />
      <CardHeader className="pb-4 space-y-4 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xs font-mono text-muted-foreground font-bold tracking-widest uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
            Trade {symbol}
          </CardTitle>
          <div className="flex items-center gap-2 text-[10px] font-mono">
            <div className="px-2 py-1 bg-neon-blue/10 border border-neon-blue/20 rounded text-neon-blue">
              LIVE ON SOLANA
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-black/40 p-1 h-11 mb-6 rounded-xl border border-white/5">
            <TabsTrigger 
              value="buy" 
              className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white font-bold rounded-lg transition-all duration-300 text-xs tracking-wide hover:bg-emerald-500/20"
            >
              BUY
            </TabsTrigger>
            <TabsTrigger 
              value="sell" 
              className="data-[state=active]:bg-red-500 data-[state=active]:text-white font-bold rounded-lg transition-all duration-300 text-xs tracking-wide hover:bg-red-500/20"
              disabled
            >
              SELL (SOON)
            </TabsTrigger>
          </TabsList>
          
          <div className="space-y-5">
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                <span>Pay with {NATIVE_TOKEN_SYMBOL}</span>
                <span className="flex items-center gap-1.5 text-white/80 font-mono">
                  <Wallet className="w-3 h-3" /> 
                  {vantBalance.toFixed(4)} {NATIVE_TOKEN_SYMBOL}
                </span>
              </div>
              <div className="relative group">
                <NumberInput 
                  placeholder="0.00" 
                  className="bg-black/20 border-white/10 text-right pr-20 text-lg font-mono h-12 rounded-xl focus:border-neon-blue/50 transition-all hover:border-white/20"
                  value={amount}
                  onChange={setAmount}
                  step={10000}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground pointer-events-none font-mono">
                  {NATIVE_TOKEN_SYMBOL}
                </div>
              </div>
            </div>

            <div className="flex justify-center -my-3 relative z-10">
              <Button variant="ghost" size="icon" className="rounded-full bg-card border border-white/10 hover:bg-white/10 h-8 w-8 shadow-lg hover:scale-110 transition-transform duration-300">
                <ArrowDownUp className="w-3.5 h-3.5 text-muted-foreground" />
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                <span>Receive {symbol}</span>
                <span className="font-mono">Price: {price.toFixed(2)} {NATIVE_TOKEN_SYMBOL}</span>
              </div>
              <div className="relative">
                <Input 
                  type="number" 
                  placeholder="0.00" 
                  className="bg-black/20 border-white/10 text-right pr-24 text-lg font-mono h-12 rounded-xl focus:border-neon-blue/50 transition-all hover:border-white/20"
                  value={amount ? (parseFloat(amount) / price).toFixed(4) : ""}
                  readOnly
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground font-mono">
                  {symbol}
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <Slider 
                value={sliderValue}
                max={100} 
                step={25} 
                className="py-2 [&>.relative>.absolute]:bg-neon-blue"
                onValueChange={handleSliderChange}
              />
              <div className="flex justify-between text-[10px] font-mono text-muted-foreground uppercase tracking-widest px-1">
                <span className="cursor-pointer hover:text-white transition-colors" onClick={() => handleSliderChange([0])}>0%</span>
                <span className="cursor-pointer hover:text-white transition-colors" onClick={() => handleSliderChange([25])}>25%</span>
                <span className="cursor-pointer hover:text-white transition-colors" onClick={() => handleSliderChange([50])}>50%</span>
                <span className="cursor-pointer hover:text-white transition-colors" onClick={() => handleSliderChange([75])}>75%</span>
                <span className="cursor-pointer hover:text-white transition-colors" onClick={() => handleSliderChange([100])}>100%</span>
              </div>
            </div>

            <div className="bg-neon-blue/5 border border-neon-blue/20 rounded-xl p-3 flex items-start gap-3">
              <Info className="w-4 h-4 text-neon-blue mt-0.5 shrink-0" />
              <div className="text-[10px] text-neon-blue/80 font-medium leading-relaxed">
                Real Solana transactions. You pay with {NATIVE_TOKEN_SYMBOL} tokens which are sent to treasury: 7p23...tpeD
              </div>
            </div>

            <Button 
              className="w-full font-bold h-12 text-sm rounded-xl shadow-lg transition-all duration-300 tracking-wide bg-emerald-500 text-white hover:bg-emerald-600 shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)] hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.6)] hover:-translate-y-0.5"
              onClick={handleTrade}
              disabled={isSubmitting || !amount || parseFloat(amount) <= 0}
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              BUY WITH {NATIVE_TOKEN_SYMBOL}
            </Button>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
