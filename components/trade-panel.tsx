"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Wallet, ArrowDownUp, Loader2, Settings2, AlertTriangle } from 'lucide-react'
import { useMarket } from "@/lib/store-context"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { NumberInput } from "@/components/ui/number-input"

export function TradePanel({ symbol, price }: { symbol: string, price: number }) {
  const [amount, setAmount] = useState("")
  const [limitPrice, setLimitPrice] = useState("")
  const [sliderValue, setSliderValue] = useState([0])
  const [activeTab, setActiveTab] = useState("buy")
  const [orderType, setOrderType] = useState<"market" | "limit">("market")
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Advanced Order State
  const [stopLoss, setStopLoss] = useState(false)
  const [stopLossPrice, setStopLossPrice] = useState("")
  const [takeProfit, setTakeProfit] = useState(false)
  const [takeProfitPrice, setTakeProfitPrice] = useState("")
  
  const { userState, placeOrder } = useMarket()
  
  useEffect(() => {
    if (orderType === 'market') {
      setLimitPrice(price.toFixed(2))
    }
  }, [symbol, price, orderType])
  
  const portfolioItem = userState.portfolio.find(p => p.assetId === symbol)
  const assetBalance = portfolioItem?.amount || 0
  
  const handleTrade = async () => {
    if (!amount || parseFloat(amount) <= 0) return
    
    setIsSubmitting(true)
    
    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, 500))
    
    try {
      const value = parseFloat(amount)
      const executionPrice = orderType === 'limit' ? parseFloat(limitPrice) : price
      
      if (activeTab === "buy") {
        const assetAmount = value / executionPrice
        placeOrder(symbol, 'buy', orderType, assetAmount, executionPrice)
        
        // Place conditional orders if enabled
        if (stopLoss && stopLossPrice) {
          placeOrder(symbol, 'sell', 'stop-loss', assetAmount, undefined, parseFloat(stopLossPrice))
        }
        if (takeProfit && takeProfitPrice) {
          placeOrder(symbol, 'sell', 'take-profit', assetAmount, undefined, parseFloat(takeProfitPrice))
        }
      } else {
        placeOrder(symbol, 'sell', orderType, value, executionPrice)
      }
      
      setAmount("")
      setSliderValue([0])
      setStopLoss(false)
      setTakeProfit(false)
    } catch (error) {
      console.error("Trade failed:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value)
    const percentage = value[0] / 100
    
    if (activeTab === "buy") {
      const usdcAmount = userState.balance * percentage
      setAmount(usdcAmount.toFixed(2))
    } else {
      const assetAmount = assetBalance * percentage
      setAmount(assetAmount.toFixed(4))
    }
  }

  return (
    <Card className="border-white/5 bg-black/40 backdrop-blur-xl sticky top-20 shadow-2xl shadow-black/50 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-blue opacity-50" />
      <CardHeader className="pb-4 space-y-4 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xs font-mono text-muted-foreground font-bold tracking-widest uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse" />
            Trade {symbol}
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex bg-black/40 rounded-lg p-0.5 border border-white/5">
              <button 
                onClick={() => setOrderType("market")}
                className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all duration-300 ${orderType === "market" ? "bg-white/10 text-white shadow-sm" : "text-muted-foreground hover:text-white"}`}
              >
                MARKET
              </button>
              <button 
                onClick={() => setOrderType("limit")}
                className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all duration-300 ${orderType === "limit" ? "bg-white/10 text-white shadow-sm" : "text-muted-foreground hover:text-white"}`}
              >
                LIMIT
              </button>
            </div>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5">
                  <Settings2 className="w-3.5 h-3.5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-black/90 border-white/10 backdrop-blur-xl shadow-2xl">
                {/* ... existing popover content ... */}
                <div className="space-y-4">
                  <h4 className="font-medium leading-none text-white text-sm">Advanced Order Settings</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-white text-xs">Stop Loss</Label>
                        <div className="text-[10px] text-muted-foreground">Trigger sell if price drops</div>
                      </div>
                      <Switch checked={stopLoss} onCheckedChange={setStopLoss} />
                    </div>
                    {stopLoss && (
                      <div className="relative">
                        <NumberInput 
                          value={stopLossPrice} 
                          onChange={setStopLossPrice}
                          placeholder={(price * 0.95).toFixed(2)}
                          className="bg-white/5 border-white/10 h-9 text-sm"
                          step={0.01}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground pointer-events-none font-mono">USDC</span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-white text-xs">Take Profit</Label>
                        <div className="text-[10px] text-muted-foreground">Trigger sell if price rises</div>
                      </div>
                      <Switch checked={takeProfit} onCheckedChange={setTakeProfit} />
                    </div>
                    {takeProfit && (
                      <div className="relative">
                        <NumberInput 
                          value={takeProfitPrice} 
                          onChange={setTakeProfitPrice}
                          placeholder={(price * 1.1).toFixed(2)}
                          className="bg-white/5 border-white/10 h-9 text-sm"
                          step={0.01}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground pointer-events-none font-mono">USDC</span>
                      </div>
                    )}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
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
              className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-white/20 font-bold rounded-lg transition-all duration-300 text-xs tracking-wide hover:bg-white/5"
            >
              SELL
            </TabsTrigger>
          </TabsList>
          
          <div className="space-y-5">
            {orderType === "limit" && (
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                  <span>Limit Price</span>
                  <span className="text-neon-blue cursor-pointer hover:underline" onClick={() => setLimitPrice(price.toFixed(2))}>
                    Current: ${price.toFixed(2)}
                  </span>
                </div>
                <div className="relative group">
                  <NumberInput 
                    placeholder="0.00" 
                    className="bg-black/20 border-white/10 text-right pr-16 text-lg font-mono h-12 rounded-xl focus:border-neon-blue/50 transition-all hover:border-white/20"
                    value={limitPrice}
                    onChange={setLimitPrice}
                    step={0.01}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground pointer-events-none font-mono">
                    USDC
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex justify-between text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                <span>{activeTab === "buy" ? "Pay with" : "Sell amount"}</span>
                <span className="flex items-center gap-1.5 text-white/80 font-mono">
                  <Wallet className="w-3 h-3" /> 
                  {activeTab === "buy" 
                    ? `${userState.balance.toLocaleString(undefined, { maximumFractionDigits: 2 })} USDC`
                    : `${assetBalance.toFixed(4)} ${symbol}`
                  }
                </span>
              </div>
              <div className="relative group">
                <NumberInput 
                  placeholder="0.00" 
                  className="bg-black/20 border-white/10 text-right pr-16 text-lg font-mono h-12 rounded-xl focus:border-neon-blue/50 transition-all hover:border-white/20"
                  value={amount}
                  onChange={setAmount}
                  step={activeTab === "buy" ? 10 : 0.0001}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground pointer-events-none font-mono">
                  {activeTab === "buy" ? "USDC" : symbol}
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
                <span>{activeTab === "buy" ? "Receive" : "Receive (est)"}</span>
                <span className="font-mono">Price: ${orderType === 'limit' ? limitPrice : price.toFixed(2)}</span>
              </div>
              <div className="relative">
                <Input 
                  type="number" 
                  placeholder="0.00" 
                  className="bg-black/20 border-white/10 text-right pr-16 text-lg font-mono h-12 rounded-xl focus:border-neon-blue/50 transition-all hover:border-white/20"
                  value={amount ? (activeTab === "buy" 
                    ? (parseFloat(amount) / (orderType === 'limit' ? parseFloat(limitPrice) : price)).toFixed(4) 
                    : (parseFloat(amount) * (orderType === 'limit' ? parseFloat(limitPrice) : price)).toFixed(2)) : ""}
                  readOnly
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground font-mono">
                  {activeTab === "buy" ? symbol : "USDC"}
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

            {(stopLoss || takeProfit) && activeTab === 'buy' && (
              <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-3 flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                <div className="text-[10px] text-yellow-500/80 leading-relaxed font-medium">
                  Conditional orders will be placed automatically after purchase execution.
                </div>
              </div>
            )}

            <Button 
              className={`w-full font-bold h-12 text-sm rounded-xl shadow-lg transition-all duration-300 tracking-wide ${
                activeTab === "buy" 
                  ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)] hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.6)] hover:-translate-y-0.5" 
                  : "bg-black text-white border border-white/20 hover:bg-white/10 shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_-5px_rgba(255,255,255,0.2)] hover:-translate-y-0.5"
              }`}
              onClick={handleTrade}
              disabled={isSubmitting || !amount || parseFloat(amount) <= 0}
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              {activeTab === "buy" 
                ? (orderType === 'limit' ? "PLACE BUY LIMIT ORDER" : "PLACE BUY MARKET ORDER")
                : (orderType === 'limit' ? "PLACE SELL LIMIT ORDER" : "PLACE SELL MARKET ORDER")
              }
            </Button>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
