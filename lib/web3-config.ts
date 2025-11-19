export const WEB3_CONFIG = {
  alchemyApiKey: 'X9KIYdkNu0v5x1pGJkvqB9E83qewiH3x',
  networks: {
    ethereum: {
      name: 'Ethereum Mainnet',
      chainId: 1,
      rpcUrl: `https://eth-mainnet.g.alchemy.com/v2/X9KIYdkNu0v5x1pGJkvqB9E83qewiH3x`,
      explorer: 'https://etherscan.io'
    },
    polygon: {
      name: 'Polygon Mainnet',
      chainId: 137,
      rpcUrl: `https://polygon-mainnet.g.alchemy.com/v2/X9KIYdkNu0v5x1pGJkvqB9E83qewiH3x`,
      explorer: 'https://polygonscan.com'
    },
    arbitrum: {
      name: 'Arbitrum One',
      chainId: 42161,
      rpcUrl: `https://arb-mainnet.g.alchemy.com/v2/X9KIYdkNu0v5x1pGJkvqB9E83qewiH3x`,
      explorer: 'https://arbiscan.io'
    },
    optimism: {
      name: 'Optimism Mainnet',
      chainId: 10,
      rpcUrl: `https://opt-mainnet.g.alchemy.com/v2/X9KIYdkNu0v5x1pGJkvqB9E83qewiH3x`,
      explorer: 'https://optimistic.etherscan.io'
    },
    base: {
      name: 'Base Mainnet',
      chainId: 8453,
      rpcUrl: `https://base-mainnet.g.alchemy.com/v2/X9KIYdkNu0v5x1pGJkvqB9E83qewiH3x`,
      explorer: 'https://basescan.org'
    }
  },
  // Contract addresses for VANTAGE protocol (placeholder - would be real in production)
  contracts: {
    humanEquityRegistry: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    vantageToken: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    tradingEngine: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
  }
}

export type NetworkName = keyof typeof WEB3_CONFIG.networks
