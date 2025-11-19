export interface InsiderTrade {
  id: string
  assetId: string
  insiderName: string
  relation: string
  transactionDate: string
  transactionType: 'Buy' | 'Sell'
  shares: number
  pricePerShare: number
  value: number
  source: string
}

export const INSIDER_TRADES: InsiderTrade[] = [
  // Elon Musk (TSLA)
  {
    id: 'em-1',
    assetId: 'TSLA',
    insiderName: 'Elon Musk',
    relation: 'CEO',
    transactionDate: '2025-10-12',
    transactionType: 'Buy',
    shares: 1250000,
    pricePerShare: 389.45,
    value: 486812500,
    source: 'Quiver Quantitative'
  },
  {
    id: 'em-2',
    assetId: 'TSLA',
    insiderName: 'Elon Musk',
    relation: 'CEO',
    transactionDate: '2025-09-17',
    transactionType: 'Buy',
    shares: 1318732,
    pricePerShare: 375.20,
    value: 494788246,
    source: 'Quiver Quantitative'
  },
  
  // Mark Zuckerberg (META)
  {
    id: 'mz-1',
    assetId: 'META',
    insiderName: 'Mark Zuckerberg',
    relation: 'CEO',
    transactionDate: '2025-08-13',
    transactionType: 'Sell',
    shares: 52,
    pricePerShare: 542.10,
    value: 28189,
    source: 'Quiver Quantitative'
  },
  {
    id: 'mz-2',
    assetId: 'META',
    insiderName: 'Mark Zuckerberg',
    relation: 'CEO',
    transactionDate: '2025-02-19',
    transactionType: 'Sell',
    shares: 100,
    pricePerShare: 706.28,
    value: 70628,
    source: 'Quiver Quantitative'
  },
  {
    id: 'mz-3',
    assetId: 'META',
    insiderName: 'Mark Zuckerberg',
    relation: 'CEO',
    transactionDate: '2025-01-31',
    transactionType: 'Sell',
    shares: 1613,
    pricePerShare: 700.11,
    value: 1129281,
    source: 'Quiver Quantitative'
  },
  {
    id: 'mz-4',
    assetId: 'META',
    insiderName: 'Mark Zuckerberg',
    relation: 'CEO',
    transactionDate: '2025-01-15',
    transactionType: 'Sell',
    shares: 2417,
    pricePerShare: 695.50,
    value: 1681023,
    source: 'Quiver Quantitative'
  },
  {
    id: 'mz-5',
    assetId: 'META',
    insiderName: 'Mark Zuckerberg',
    relation: 'CEO',
    transactionDate: '2024-12-23',
    transactionType: 'Sell',
    shares: 22406,
    pricePerShare: 682.15,
    value: 15284252,
    source: 'Quiver Quantitative'
  },

  // Jensen Huang (NVDA)
  {
    id: 'jh-1',
    assetId: 'NVDA',
    insiderName: 'Jen-Hsun Huang',
    relation: 'CEO',
    transactionDate: '2025-10-16',
    transactionType: 'Sell',
    shares: 225000,
    pricePerShare: 182.48,
    value: 41058402,
    source: 'Quiver Quantitative'
  },
  {
    id: 'jh-2',
    assetId: 'NVDA',
    insiderName: 'Jen-Hsun Huang',
    relation: 'CEO',
    transactionDate: '2025-10-13',
    transactionType: 'Sell',
    shares: 225000,
    pricePerShare: 183.72,
    value: 41338563,
    source: 'Quiver Quantitative'
  },
  {
    id: 'jh-3',
    assetId: 'NVDA',
    insiderName: 'Jen-Hsun Huang',
    relation: 'CEO',
    transactionDate: '2025-08-15',
    transactionType: 'Sell',
    shares: 74997,
    pricePerShare: 165.20,
    value: 12389504,
    source: 'Quiver Quantitative'
  },
  {
    id: 'jh-4',
    assetId: 'NVDA',
    insiderName: 'Jen-Hsun Huang',
    relation: 'CEO',
    transactionDate: '2025-07-02',
    transactionType: 'Sell',
    shares: 20169,
    pricePerShare: 157.24,
    value: 3171375,
    source: 'Quiver Quantitative'
  }
]

export function getInsiderTrades(assetId: string): InsiderTrade[] {
  // Map our internal IDs to real tickers for the demo data
  const tickerMap: Record<string, string> = {
    'VITALIK': 'ETH', // No direct stock equivalent, maybe skip or mock
    'ELON': 'TSLA',
    'ZUCK': 'META',
    'JENSEN': 'NVDA',
    'ALTMAN': 'MSFT', // Proxy
    'CATHIE': 'ARKK'
  }

  const realTicker = tickerMap[assetId] || assetId
  return INSIDER_TRADES.filter(trade => trade.assetId === realTicker)
}
