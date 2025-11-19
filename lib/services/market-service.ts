import { db } from '@/lib/db';
import { assets, marketData } from '@/lib/db/schema';
import { eq, sql } from 'drizzle-orm';
import { TechnicalAnalysis } from '@/lib/technical-analysis'; // Reusing existing logic logic

export class MarketService {
  // Simulate price movement using Geometric Brownian Motion
  static async updateMarketPrices() {
    const allAssets = await db.query.assets.findMany();
    
    for (const asset of allAssets) {
      const currentPrice = parseFloat(asset.currentPrice);
      const volatility = 0.02; // 2% volatility
      const drift = 0.0001; // Slight upward drift
      
      const change = currentPrice * (drift + volatility * (Math.random() - 0.5));
      const newPrice = Math.max(0.01, currentPrice + change);
      
      // Update Asset
      await db.update(assets)
        .set({ 
          currentPrice: newPrice.toFixed(2),
          updatedAt: new Date(),
          change24h: ((newPrice - currentPrice) / currentPrice * 100).toFixed(2)
        })
        .where(eq(assets.id, asset.id));

      // Record Market Data (OHLCV)
      // In a real high-freq system, we'd aggregate ticks. 
      // Here we simulate a 1-minute candle update or tick.
      await db.insert(marketData).values({
        assetId: asset.id,
        open: currentPrice.toFixed(2),
        high: Math.max(currentPrice, newPrice).toFixed(2),
        low: Math.min(currentPrice, newPrice).toFixed(2),
        close: newPrice.toFixed(2),
        volume: (Math.random() * 10000).toFixed(2),
        timestamp: new Date(),
      });
    }
  }

  static async getAssetDetails(id: string) {
    return await db.query.assets.findFirst({
      where: eq(assets.id, id),
      with: {
        marketData: {
          limit: 100,
          orderBy: (marketData, { desc }) => [desc(marketData.timestamp)],
        }
      }
    });
  }
  
  static async getAllAssets() {
    return await db.query.assets.findMany();
  }

  static async getMarketIndexHistory() {
    // In a real app, this would be a complex aggregation query.
    // For this demo, we'll fetch the history of the top asset as a proxy,
    // or perform a simplified average if performance allows.
    // Let's return a simplified aggregation of the top 5 assets.
    
    const topAssets = await db.query.assets.findMany({
      limit: 5,
      orderBy: (assets, { desc }) => [desc(assets.marketCap)],
      with: {
        marketData: {
          limit: 100,
          orderBy: (marketData, { desc }) => [desc(marketData.timestamp)],
        }
      }
    });

    if (topAssets.length === 0) return [];

    // Simple average of the top assets to create an "Index"
    const indexData = [];
    const length = topAssets[0].marketData.length;

    for (let i = 0; i < length; i++) {
      let totalOpen = 0, totalClose = 0, totalHigh = 0, totalLow = 0, totalVolume = 0;
      let count = 0;

      for (const asset of topAssets) {
        const candle = asset.marketData[i];
        if (candle) {
          totalOpen += parseFloat(candle.open);
          totalClose += parseFloat(candle.close);
          totalHigh += parseFloat(candle.high);
          totalLow += parseFloat(candle.low);
          totalVolume += parseFloat(candle.volume);
          count++;
        }
      }

      if (count > 0) {
        indexData.push({
          time: topAssets[0].marketData[i].timestamp.toISOString(),
          open: totalOpen / count,
          high: totalHigh / count,
          low: totalLow / count,
          close: totalClose / count,
          volume: totalVolume,
        });
      }
    }

    return indexData.reverse();
  }
}
