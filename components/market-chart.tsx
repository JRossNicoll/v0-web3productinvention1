"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Line, ComposedChart, Bar, ReferenceLine, Cell } from "recharts"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings2 } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useMarket } from "@/lib/store-context"
import { marketEngine } from "@/lib/market-engine"

const chartConfig = {
  value: {
    label: "Price",
    color: "hsl(var(--neon-blue))",
  },
  volume: {
    label: "Volume",
    color: "rgba(255, 255, 255, 0.2)",
  },
  sma: {
    label: "SMA (20)",
    color: "#fbbf24", // amber-400
  },
  ema: {
    label: "EMA (50)",
    color: "#f472b6", // pink-400
  },
  accumulation: {
    label: "Accumulation Zone",
    color: "rgba(0, 243, 255, 0.1)",
  }
}

export function MarketChart({ assetId }: { assetId?: string }) {
  const [timeframe, setTimeframe] = useState<"1H" | "1D" | "1W">("1D")
  const [showSMA, setShowSMA] = useState(false)
  const [showEMA, setShowEMA] = useState(false)
  const { assets, getAsset, isGodMode } = useMarket()
  
  const data = useMemo(() => {
    let ohlcv = []
    
    if (assetId) {
      ohlcv = marketEngine.getOHLCV(assetId, timeframe)
    } else {
      ohlcv = marketEngine.getMarketIndexOHLCV(timeframe)
    }

    if (!ohlcv.length) return []

    const prices = ohlcv.map(c => c.close)
    const sma20 = calculateSMA(prices, 20)
    const ema50 = calculateEMA(prices, 50)

    const accumulationZone = prices.map(p => p * (0.95 + Math.random() * 0.02))

    return ohlcv.map((candle, i) => ({
      date: new Date(candle.time).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        ...(timeframe === '1H' && { hour: 'numeric' }),
        ...(timeframe === '1W' && { year: '2-digit' })
      }),
      value: candle.close,
      candleBody: [Math.min(candle.open, candle.close), Math.max(candle.open, candle.close)],
      candleWick: [candle.low, candle.high],
      isUp: candle.close >= candle.open,
      volume: candle.volume,
      sma: sma20[i],
      ema: ema50[i],
      accumulation: accumulationZone[i],
      high: candle.high,
      low: candle.low,
      open: candle.open
    }))
  }, [assetId, assets, getAsset, timeframe])

  const yDomain = useMemo(() => {
    if (!data.length) return ['auto', 'auto']
    const highs = data.map(d => d.high || d.value)
    const lows = data.map(d => d.low || d.value)
    const min = Math.min(...lows)
    const max = Math.max(...highs)
    const padding = (max - min) * 0.1
    return [min - padding, max + padding]
  }, [data])

  return (
    <Card className="border-white/5 bg-black/20 backdrop-blur-xl overflow-hidden">
      <CardHeader className="border-b border-white/5 pb-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-bold tracking-tight">
              {assetId ? 'Price Action' : 'Market Overview'}
            </CardTitle>
            <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Real-time Data</p>
          </div>
          <div className="flex items-center gap-2">
            {assetId && (
              <Popover>
                <PopoverTrigger asChild>
                  <button className="p-2 hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-white/10">
                    <Settings2 className="w-4 h-4 text-muted-foreground" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-56 bg-black/90 border-white/10 backdrop-blur-xl shadow-2xl">
                  <div className="space-y-4">
                    <h4 className="font-medium leading-none text-white text-sm">Chart Indicators</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-muted-foreground text-xs font-mono uppercase">SMA (20)</Label>
                        <Switch checked={showSMA} onCheckedChange={setShowSMA} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-muted-foreground text-xs font-mono uppercase">EMA (50)</Label>
                        <Switch checked={showEMA} onCheckedChange={setShowEMA} />
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
            <Tabs value={timeframe} onValueChange={(v) => setTimeframe(v as any)}>
              <TabsList className="bg-black/40 border border-white/10 p-1 h-9 rounded-lg">
                <TabsTrigger value="1H" className="text-[10px] font-mono h-7 px-3 data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md transition-all">1H</TabsTrigger>
                <TabsTrigger value="1D" className="text-[10px] font-mono h-7 px-3 data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md transition-all">1D</TabsTrigger>
                <TabsTrigger value="1W" className="text-[10px] font-mono h-7 px-3 data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md transition-all">1W</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <ComposedChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--neon-blue))" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="hsl(var(--neon-blue))" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorAccumulation" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--neon-blue))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--neon-blue))" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
            <XAxis 
              dataKey="date" 
              stroke="rgba(255,255,255,0.2)"
              style={{ fontSize: '10px', fontFamily: 'var(--font-mono)' }}
              minTickGap={40}
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            <YAxis 
              yAxisId="left"
              stroke="rgba(255,255,255,0.2)"
              style={{ fontSize: '10px', fontFamily: 'var(--font-mono)' }}
              domain={assetId ? yDomain : ['auto', 'auto']}
              tickFormatter={(value) => assetId ? `$${value.toFixed(0)}` : `$${(value / 1000000000).toFixed(1)}B`}
              axisLine={false}
              tickLine={false}
              width={60}
              dx={-10}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke="rgba(255,255,255,0.1)"
              style={{ fontSize: '10px', fontFamily: 'var(--font-mono)' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              width={40}
            />
            <ChartTooltip 
              cursor={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1, strokeDasharray: '4 4' }}
              content={
                <ChartTooltipContent 
                  className="bg-black/90 border-white/10 backdrop-blur-xl shadow-2xl rounded-lg p-3"
                  formatter={(value, name, props) => {
                    if (name === 'value') return [`$${Number(value).toFixed(2)}`, 'Price']
                    if (name === 'candleBody' || name === 'candleWick') return undefined
                    if (name === 'volume') return [`${Number(value).toLocaleString()}`, 'Volume']
                    return [Number(value).toFixed(2), chartConfig[name as keyof typeof chartConfig]?.label || name]
                  }}
                  labelFormatter={(label) => <span className="text-white font-bold font-mono text-xs mb-2 block">{label}</span>}
                />
              } 
            />
            <Bar 
              yAxisId="right"
              dataKey="volume" 
              fill="rgba(255, 255, 255, 0.05)" 
              barSize={12}
              radius={[2, 2, 0, 0]}
            />
            
            {isGodMode && (
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="accumulation"
                stroke="none"
                fill="url(#colorAccumulation)"
                fillOpacity={0.2}
              />
            )}

            <>
              {/* Wicks */}
              <Bar 
                yAxisId="left"
                dataKey="candleWick" 
                barSize={1}
                isAnimationActive={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`wick-${index}`} fill={entry.isUp ? 'var(--neon-green)' : '#ef4444'} />
                ))}
              </Bar>
              {/* Bodies */}
              <Bar 
                yAxisId="left"
                dataKey="candleBody" 
                barSize={8}
                isAnimationActive={false}
                radius={[1, 1, 1, 1]}
              >
                {data.map((entry, index) => (
                  <Cell key={`body-${index}`} fill={entry.isUp ? 'var(--neon-green)' : '#ef4444'} />
                ))}
              </Bar>
              {/* Line Overlay */}
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--neon-blue))" 
                strokeWidth={1.5}
                dot={false}
                opacity={0.3}
                activeDot={{ r: 4, fill: "hsl(var(--neon-blue))", strokeWidth: 0 }}
              />
            </>

            {data.length > 0 && (
              <ReferenceLine 
                yAxisId="left" 
                y={data[data.length - 1].value} 
                stroke="hsl(var(--neon-blue))" 
                strokeDasharray="3 3" 
                strokeOpacity={0.6}
              >
                <Label 
                  value={data[data.length - 1].value.toFixed(2)} 
                  position="right" 
                  fill="hsl(var(--neon-blue))" 
                  fontSize={10} 
                  fontFamily="var(--font-mono)"
                />
              </ReferenceLine>
            )}
            {showSMA && (
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="sma" 
                stroke="#fbbf24" 
                strokeWidth={1.5} 
                dot={false}
                strokeOpacity={0.8}
              />
            )}
            {showEMA && (
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="ema" 
                stroke="#f472b6" 
                strokeWidth={1.5} 
                dot={false}
                strokeOpacity={0.8}
              />
            )}
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

function calculateSMA(data: number[], period: number): (number | null)[] {
  const sma = []
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      sma.push(null)
      continue
    }
    const sum = data.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0)
    sma.push(sum / period)
  }
  return sma
}

function calculateEMA(data: number[], period: number): (number | null)[] {
  const k = 2 / (period + 1)
  const ema = [data[0]]
  for (let i = 1; i < data.length; i++) {
    ema.push(data[i] * k + ema[i - 1] * (1 - k))
  }
  return ema
}
