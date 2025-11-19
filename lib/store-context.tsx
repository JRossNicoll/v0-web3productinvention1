"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { marketEngine } from './market-engine'
import { Asset, UserState } from './types'

interface MarketContextType {
  assets: Asset[]
  userState: UserState
  getAsset: (id: string) => Asset | undefined
  buyAsset: (assetId: string, amount: number) => void
  sellAsset: (assetId: string, amount: number) => void
  isLoading: boolean
  placeOrder: (assetId: string, side: 'buy' | 'sell', type: 'market' | 'limit' | 'stop-loss' | 'take-profit', amount: number, price?: number, triggerPrice?: number) => void
  cancelOrder: (orderId: string) => void
  getOrderBook: (assetId: string) => any
  getTechnicalIndicators: (assetId: string) => any
  addToWatchlist: (assetId: string) => void
  removeFromWatchlist: (assetId: string) => void
  createPriceAlert: (assetId: string, condition: 'above' | 'below', price: number) => void
  deleteAlert: (alertId: string) => void
  markNotificationRead: (notificationId: string) => void
  markAllNotificationsRead: () => void
  processTrade: (assetId: string, amount: number, side: 'buy' | 'sell') => void
  isGodMode: boolean
  toggleGodMode: () => void
}

const MarketContext = createContext<MarketContextType | null>(null)

export function MarketProvider({ children }: { children: React.ReactNode }) {
  const [assets, setAssets] = useState<Asset[]>([])
  const [userState, setUserState] = useState<UserState>(marketEngine.getUserState())
  const [isLoading, setIsLoading] = useState(true)
  const [isGodMode, setIsGodMode] = useState(false)

  useEffect(() => {
    // Initial load
    setAssets(marketEngine.getAssets())
    setUserState(marketEngine.getUserState())
    setIsLoading(false)

    // Subscribe to updates
    const unsubscribe = marketEngine.subscribe(() => {
      setAssets(marketEngine.getAssets())
      setUserState(marketEngine.getUserState())
    })

    return unsubscribe
  }, [])

  const buyAsset = (assetId: string, amount: number) => {
    marketEngine.executeTrade(assetId, 'buy', amount)
  }

  const sellAsset = (assetId: string, amount: number) => {
    marketEngine.executeTrade(assetId, 'sell', amount)
  }

  const placeOrder = (
    assetId: string,
    side: 'buy' | 'sell',
    type: 'market' | 'limit' | 'stop-loss' | 'take-profit',
    amount: number,
    price?: number,
    triggerPrice?: number
  ) => {
    marketEngine.placeOrder(assetId, side, type, amount, price, triggerPrice)
  }

  const cancelOrder = (orderId: string) => {
    marketEngine.cancelOrder(orderId)
  }

  const getOrderBook = (assetId: string) => {
    return marketEngine.getOrderBook(assetId)
  }

  const getTechnicalIndicators = (assetId: string) => {
    return marketEngine.getTechnicalIndicators(assetId)
  }

  const addToWatchlist = (assetId: string) => {
    marketEngine.addToWatchlist(assetId)
  }

  const removeFromWatchlist = (assetId: string) => {
    marketEngine.removeFromWatchlist(assetId)
  }

  const createPriceAlert = (assetId: string, condition: 'above' | 'below', price: number) => {
    marketEngine.createPriceAlert(assetId, condition, price)
  }

  const deleteAlert = (alertId: string) => {
    marketEngine.deleteAlert(alertId)
  }

  const markNotificationRead = (notificationId: string) => {
    marketEngine.markNotificationRead(notificationId)
  }

  const markAllNotificationsRead = () => {
    marketEngine.markAllNotificationsRead()
  }

  const processTrade = (assetId: string, amount: number, side: 'buy' | 'sell') => {
    marketEngine.processTrade(assetId, amount, side)
  }

  const getAsset = (id: string) => marketEngine.getAsset(id)

  const toggleGodMode = () => setIsGodMode(prev => !prev)

  return (
    <MarketContext.Provider value={{ 
      assets, 
      userState, 
      getAsset, 
      buyAsset, 
      sellAsset,
      isLoading,
      placeOrder,
      cancelOrder,
      getOrderBook,
      getTechnicalIndicators,
      addToWatchlist,
      removeFromWatchlist,
      createPriceAlert,
      deleteAlert,
      markNotificationRead,
      markAllNotificationsRead,
      processTrade,
      isGodMode,
      toggleGodMode
    }}>
      {children}
    </MarketContext.Provider>
  )
}

export function useMarket() {
  const context = useContext(MarketContext)
  if (!context) throw new Error("useMarket must be used within MarketProvider")
  return context
}
