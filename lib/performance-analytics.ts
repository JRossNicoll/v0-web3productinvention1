import { Trade, UserState, Asset } from './types'

export class PerformanceAnalytics {
  static calculateMetrics(userState: UserState, assets: Map<string, Asset>) {
    const trades = userState.trades

    if (trades.length === 0) {
      return {
        totalReturn: 0,
        totalReturnPercent: 0,
        sharpeRatio: 0,
        maxDrawdown: 0,
        winRate: 0,
        totalTrades: 0,
        profitableTrades: 0,
        averageWin: 0,
        averageLoss: 0,
        largestWin: 0,
        largestLoss: 0
      }
    }

    // Calculate P&L for each trade
    const tradePnLs: number[] = []
    const tradesByAsset = new Map<string, Trade[]>()

    trades.forEach(trade => {
      if (!tradesByAsset.has(trade.assetId)) {
        tradesByAsset.set(trade.assetId, [])
      }
      tradesByAsset.get(trade.assetId)!.push(trade)
    })

    // Calculate realized P&L
    tradesByAsset.forEach((assetTrades, assetId) => {
      const buys = assetTrades.filter(t => t.side === 'buy')
      const sells = assetTrades.filter(t => t.side === 'sell')

      sells.forEach(sell => {
        // Match with corresponding buys (FIFO)
        let remainingAmount = sell.amount
        for (const buy of buys) {
          if (remainingAmount <= 0) break
          const matchedAmount = Math.min(remainingAmount, buy.amount)
          const pnl = (sell.price - buy.price) * matchedAmount
          tradePnLs.push(pnl)
          remainingAmount -= matchedAmount
        }
      })
    })

    // Calculate unrealized P&L for open positions
    let unrealizedPnL = 0
    userState.portfolio.forEach(item => {
      const asset = assets.get(item.assetId)
      if (asset) {
        unrealizedPnL += (asset.price - item.averageBuyPrice) * item.amount
      }
    })

    const totalReturn = tradePnLs.reduce((sum, pnl) => sum + pnl, 0) + unrealizedPnL
    const initialBalance = 500 // Starting balance
    const totalReturnPercent = (totalReturn / initialBalance) * 100

    // Win rate
    const profitableTrades = tradePnLs.filter(pnl => pnl > 0).length
    const winRate = tradePnLs.length > 0 ? (profitableTrades / tradePnLs.length) * 100 : 0

    // Average win/loss
    const wins = tradePnLs.filter(pnl => pnl > 0)
    const losses = tradePnLs.filter(pnl => pnl < 0)
    const averageWin = wins.length > 0 ? wins.reduce((a, b) => a + b, 0) / wins.length : 0
    const averageLoss = losses.length > 0 ? losses.reduce((a, b) => a + b, 0) / losses.length : 0

    // Largest win/loss
    const largestWin = wins.length > 0 ? Math.max(...wins) : 0
    const largestLoss = losses.length > 0 ? Math.min(...losses) : 0

    // Sharpe Ratio (simplified)
    const returns = tradePnLs.map(pnl => pnl / initialBalance)
    const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length
    const stdDev = Math.sqrt(
      returns.reduce((sum, ret) => sum + Math.pow(ret - avgReturn, 2), 0) / returns.length
    )
    const sharpeRatio = stdDev !== 0 ? (avgReturn / stdDev) * Math.sqrt(252) : 0

    // Max Drawdown
    let peak = initialBalance
    let maxDrawdown = 0
    let runningBalance = initialBalance

    trades.forEach(trade => {
      const pnl = trade.side === 'buy' ? -trade.total : trade.total
      runningBalance += pnl
      peak = Math.max(peak, runningBalance)
      const drawdown = ((peak - runningBalance) / peak) * 100
      maxDrawdown = Math.max(maxDrawdown, drawdown)
    })

    return {
      totalReturn,
      totalReturnPercent,
      sharpeRatio,
      maxDrawdown,
      winRate,
      totalTrades: trades.length,
      profitableTrades,
      averageWin,
      averageLoss,
      largestWin,
      largestLoss
    }
  }
}
