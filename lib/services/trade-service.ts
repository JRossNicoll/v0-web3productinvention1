import { db } from '@/lib/db';
import { orders, trades, portfolio, assets, users } from '@/lib/db/schema';
import { eq, and, gte, lte, sql } from 'drizzle-orm';

export class TradeService {
  static async placeOrder(userId: string, assetId: string, type: 'buy' | 'sell', side: 'limit' | 'market', quantity: number, price?: number) {
    return await db.transaction(async (tx) => {
      // 1. Validate User Balance (Simplified: assume infinite USD for demo, or check portfolio for sells)
      if (type === 'sell') {
        const userPortfolio = await tx.query.portfolio.findFirst({
          where: and(eq(portfolio.userId, userId), eq(portfolio.assetId, assetId))
        });
        
        if (!userPortfolio || parseFloat(userPortfolio.quantity) < quantity) {
          throw new Error('Insufficient assets');
        }
      }

      // 2. Create Order
      const [newOrder] = await tx.insert(orders).values({
        userId,
        assetId,
        type,
        side,
        quantity: quantity.toFixed(4),
        price: price ? price.toFixed(2) : null,
        status: 'open'
      }).returning();

      // 3. Match Order (Simplified Instant Execution for Market Orders)
      if (side === 'market') {
        const asset = await tx.query.assets.findFirst({ where: eq(assets.id, assetId) });
        if (!asset) throw new Error('Asset not found');
        
        const executionPrice = parseFloat(asset.currentPrice);
        
        // Execute Trade
        await tx.insert(trades).values({
          buyerOrderId: type === 'buy' ? newOrder.id : null, // In real matching, we'd find a counter-party
          sellerOrderId: type === 'sell' ? newOrder.id : null,
          assetId,
          price: executionPrice.toFixed(2),
          quantity: quantity.toFixed(4),
        });

        // Update Order Status
        await tx.update(orders)
          .set({ status: 'filled', filledQuantity: quantity.toFixed(4) })
          .where(eq(orders.id, newOrder.id));

        // Update Portfolio
        await this.updatePortfolio(tx, userId, assetId, quantity, executionPrice, type);
      }

      return newOrder;
    });
  }

  private static async updatePortfolio(tx: any, userId: string, assetId: string, quantity: number, price: number, type: 'buy' | 'sell') {
    const existing = await tx.query.portfolio.findFirst({
      where: and(eq(portfolio.userId, userId), eq(portfolio.assetId, assetId))
    });

    if (type === 'buy') {
      if (existing) {
        const oldQty = parseFloat(existing.quantity);
        const newQty = oldQty + quantity;
        const oldCost = oldQty * parseFloat(existing.averageBuyPrice);
        const newCost = quantity * price;
        const avgPrice = (oldCost + newCost) / newQty;

        await tx.update(portfolio)
          .set({ quantity: newQty.toFixed(4), averageBuyPrice: avgPrice.toFixed(2) })
          .where(eq(portfolio.id, existing.id));
      } else {
        await tx.insert(portfolio).values({
          userId,
          assetId,
          quantity: quantity.toFixed(4),
          averageBuyPrice: price.toFixed(2)
        });
      }
    } else {
      if (!existing) throw new Error('Portfolio sync error');
      const newQty = parseFloat(existing.quantity) - quantity;
      if (newQty <= 0) {
        await tx.delete(portfolio).where(eq(portfolio.id, existing.id));
      } else {
        await tx.update(portfolio)
          .set({ quantity: newQty.toFixed(4) })
          .where(eq(portfolio.id, existing.id));
      }
    }
  }
}
