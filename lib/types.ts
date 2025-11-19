export interface Asset {
  id: string
  name: string
  category: string
  price: number
  change: number // 24h change percentage
  volume: number // 24h volume
  marketCap: number
  score: number // Vantage Score
  holders?: number
  sectorDominance?: number
  sentimentScore?: number
  riskRating?: 'Low' | 'Medium' | 'High' | 'Extreme'
  smartMoneyFlow?: number // -100 to 100
  image?: string
  platforms: string[]
  socials?: {
    twitter?: string
    github?: string
    linkedin?: string
    website?: string
  }
  history: { time: number; price: number }[]
  candles: OHLCV[]
  orderBook?: OrderBook
  bio?: string
  recentActivity?: ActivityItem[]
  insiderTrades?: InsiderTrade[]
  news?: NewsItem[]
  kolStats?: {
    rank: number
    monthlyPnL: string
    winRate: string
    totalProfit: string
  }
}

export interface Order {
  id: string
  assetId: string
  side: 'buy' | 'sell'
  type: 'market' | 'limit' | 'stop-loss' | 'take-profit'
  price: number
  amount: number
  timestamp: number
  status: 'open' | 'filled' | 'cancelled' | 'partial'
  filled: number
  triggerPrice?: number
}

export interface Trade {
  id: string
  assetId: string
  side: 'buy' | 'sell'
  price: number
  amount: number
  timestamp: number
  total: number
}

export interface PortfolioItem {
  assetId: string
  amount: number
  averageBuyPrice: number
}

export interface UserState {
  balance: number
  portfolio: PortfolioItem[]
  trades: Trade[]
  orders: Order[]
  watchlist: string[]
  alerts: PriceAlert[]
  notifications: Notification[]
  settings: {
    riskLevel: 'conservative' | 'moderate' | 'aggressive'
    maxPositionSize: number
    stopLossPercent: number
    takeProfitPercent: number
  }
}

export interface OrderBookLevel {
  price: number
  amount: number
  total: number
}

export interface OrderBook {
  bids: OrderBookLevel[]
  asks: OrderBookLevel[]
  spread?: number
  midPrice?: number
}

export interface TechnicalIndicators {
  rsi: number
  macd: { value: number; signal: number; histogram: number }
  bollingerBands: { upper: number; middle: number; lower: number }
  ema20: number
  ema50: number
  volume24h: number
  volatility: number
}

export interface PriceAlert {
  id: string
  assetId: string
  condition: 'above' | 'below'
  price: number
  triggered: boolean
  createdAt: number
}

export interface Notification {
  id: string
  type: 'trade' | 'alert' | 'order' | 'system'
  title: string
  message: string
  timestamp: number
  read: boolean
}

export interface PerformanceMetrics {
  totalReturn: number
  totalReturnPercent: number
  sharpeRatio: number
  maxDrawdown: number
  winRate: number
  totalTrades: number
  profitableTrades: number
  averageWin: number
  averageLoss: number
  largestWin: number
  largestLoss: number
}

export interface OHLCV {
  time: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export interface ActivityItem {
  id: string
  date: string
  title: string
  description: string
  type: 'announcement' | 'project' | 'investment' | 'statement'
}

export interface InsiderTrade {
  id: string
  date: string
  type: 'buy' | 'sell'
  amount: string
  value: string
  price: string
  notes?: string
}

export interface NewsItem {
  id: string
  date: string
  title: string
  source: string
  url?: string
  summary: string
}
