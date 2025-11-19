import { UserState, Asset } from './types'

export class RiskManagement {
  // Calculate position size based on risk level
  static calculatePositionSize(
    balance: number,
    assetPrice: number,
    riskLevel: 'conservative' | 'moderate' | 'aggressive'
  ): number {
    const riskPercentages = {
      conservative: 0.02, // 2% of balance
      moderate: 0.05,     // 5% of balance
      aggressive: 0.10    // 10% of balance
    }

    const riskAmount = balance * riskPercentages[riskLevel]
    return riskAmount / assetPrice
  }

  // Calculate stop loss price
  static calculateStopLoss(entryPrice: number, side: 'buy' | 'sell', percent: number): number {
    if (side === 'buy') {
      return entryPrice * (1 - percent / 100)
    } else {
      return entryPrice * (1 + percent / 100)
    }
  }

  // Calculate take profit price
  static calculateTakeProfit(entryPrice: number, side: 'buy' | 'sell', percent: number): number {
    if (side === 'buy') {
      return entryPrice * (1 + percent / 100)
    } else {
      return entryPrice * (1 - percent / 100)
    }
  }

  // Check if user can afford trade
  static canAffordTrade(userState: UserState, assetPrice: number, amount: number): boolean {
    const totalCost = assetPrice * amount
    return userState.balance >= totalCost
  }

  // Calculate portfolio risk metrics
  static calculatePortfolioRisk(userState: UserState, assets: Map<string, Asset>): {
    totalExposure: number
    largestPosition: number
    diversificationScore: number
  } {
    let totalValue = userState.balance
    let largestPosition = 0

    userState.portfolio.forEach(item => {
      const asset = assets.get(item.assetId)
      if (asset) {
        const positionValue = asset.price * item.amount
        totalValue += positionValue
        largestPosition = Math.max(largestPosition, positionValue)
      }
    })

    const totalExposure = ((totalValue - userState.balance) / totalValue) * 100
    const diversificationScore = userState.portfolio.length > 0 
      ? (1 - (largestPosition / totalValue)) * 100 
      : 0

    return {
      totalExposure,
      largestPosition,
      diversificationScore
    }
  }
}
