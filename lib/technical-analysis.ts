import { Asset } from './types'

export class TechnicalAnalysis {
  // Calculate RSI (Relative Strength Index)
  static calculateRSI(prices: number[], period: number = 14): number {
    if (prices.length < period + 1) return 50

    let gains = 0
    let losses = 0

    for (let i = prices.length - period; i < prices.length; i++) {
      const change = prices[i] - prices[i - 1]
      if (change > 0) gains += change
      else losses -= change
    }

    const avgGain = gains / period
    const avgLoss = losses / period

    if (avgLoss === 0) return 100
    const rs = avgGain / avgLoss
    return 100 - (100 / (1 + rs))
  }

  // Calculate EMA (Exponential Moving Average)
  static calculateEMA(prices: number[], period: number): number {
    if (prices.length < period) return prices[prices.length - 1]

    const multiplier = 2 / (period + 1)
    let ema = prices.slice(0, period).reduce((a, b) => a + b) / period

    for (let i = period; i < prices.length; i++) {
      ema = (prices[i] - ema) * multiplier + ema
    }

    return ema
  }

  // Calculate MACD (Moving Average Convergence Divergence)
  static calculateMACD(prices: number[]): { value: number; signal: number; histogram: number } {
    const ema12 = this.calculateEMA(prices, 12)
    const ema26 = this.calculateEMA(prices, 26)
    const macdLine = ema12 - ema26

    // For signal line, we'd need to calculate EMA of MACD values
    // Simplified: using a factor of the MACD line
    const signalLine = macdLine * 0.9

    return {
      value: macdLine,
      signal: signalLine,
      histogram: macdLine - signalLine
    }
  }

  // Calculate Bollinger Bands
  static calculateBollingerBands(prices: number[], period: number = 20, stdDev: number = 2): { upper: number; middle: number; lower: number } {
    if (prices.length < period) {
      const current = prices[prices.length - 1]
      return { upper: current * 1.02, middle: current, lower: current * 0.98 }
    }

    const recentPrices = prices.slice(-period)
    const middle = recentPrices.reduce((a, b) => a + b) / period

    const variance = recentPrices.reduce((sum, price) => sum + Math.pow(price - middle, 2), 0) / period
    const standardDeviation = Math.sqrt(variance)

    return {
      upper: middle + (standardDeviation * stdDev),
      middle,
      lower: middle - (standardDeviation * stdDev)
    }
  }

  // Calculate volatility (standard deviation of returns)
  static calculateVolatility(prices: number[]): number {
    if (prices.length < 2) return 0

    const returns = []
    for (let i = 1; i < prices.length; i++) {
      returns.push((prices[i] - prices[i - 1]) / prices[i - 1])
    }

    const mean = returns.reduce((a, b) => a + b) / returns.length
    const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - mean, 2), 0) / returns.length

    return Math.sqrt(variance) * 100 // Return as percentage
  }

  // Get all technical indicators for an asset
  static getIndicators(asset: Asset) {
    const prices = asset.candles && asset.candles.length > 0 
      ? asset.candles.map(c => c.close) 
      : asset.history.map(h => h.price)

    return {
      rsi: this.calculateRSI(prices),
      macd: this.calculateMACD(prices),
      bollingerBands: this.calculateBollingerBands(prices),
      ema20: this.calculateEMA(prices, 20),
      ema50: this.calculateEMA(prices, 50),
      volume24h: asset.volume,
      volatility: this.calculateVolatility(prices)
    }
  }
}
