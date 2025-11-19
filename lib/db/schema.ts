import { pgTable, serial, text, timestamp, decimal, integer, boolean, index, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users Table
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').unique().notNull(),
  walletAddress: text('wallet_address').unique(),
  name: text('name'),
  avatarUrl: text('avatar_url'),
  role: text('role').default('user').notNull(), // 'user', 'admin'
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Assets (Human Equity) Table
export const assets = pgTable('assets', {
  id: text('id').primaryKey(), // e.g., 'VBUT', 'SALT'
  symbol: text('symbol').unique().notNull(),
  name: text('name').notNull(),
  imageUrl: text('image_url'),
  description: text('description'),
  totalSupply: decimal('total_supply', { precision: 20, scale: 0 }).notNull(),
  circulatingSupply: decimal('circulating_supply', { precision: 20, scale: 0 }).notNull(),
  currentPrice: decimal('current_price', { precision: 18, scale: 2 }).notNull(),
  marketCap: decimal('market_cap', { precision: 20, scale: 2 }).notNull(),
  change24h: decimal('change_24h', { precision: 5, scale: 2 }).default('0'),
  vantageScore: integer('vantage_score').default(50),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Market Data (OHLCV) Table - TimescaleDB hypertable candidate
export const marketData = pgTable('market_data', {
  id: serial('id').primaryKey(),
  assetId: text('asset_id').references(() => assets.id).notNull(),
  open: decimal('open', { precision: 18, scale: 2 }).notNull(),
  high: decimal('high', { precision: 18, scale: 2 }).notNull(),
  low: decimal('low', { precision: 18, scale: 2 }).notNull(),
  close: decimal('close', { precision: 18, scale: 2 }).notNull(),
  volume: decimal('volume', { precision: 20, scale: 2 }).notNull(),
  timestamp: timestamp('timestamp').notNull(),
}, (table) => ({
  assetIdx: index('market_data_asset_idx').on(table.assetId),
  timeIdx: index('market_data_time_idx').on(table.timestamp),
}));

// Orders Table
export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  assetId: text('asset_id').references(() => assets.id).notNull(),
  type: text('type').notNull(), // 'buy', 'sell'
  side: text('side').notNull(), // 'limit', 'market'
  status: text('status').default('open').notNull(), // 'open', 'filled', 'cancelled', 'partial'
  price: decimal('price', { precision: 18, scale: 2 }), // Null for market orders
  quantity: decimal('quantity', { precision: 18, scale: 4 }).notNull(),
  filledQuantity: decimal('filled_quantity', { precision: 18, scale: 4 }).default('0'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  userOrderIdx: index('orders_user_idx').on(table.userId),
  assetOrderIdx: index('orders_asset_idx').on(table.assetId),
  statusIdx: index('orders_status_idx').on(table.status),
}));

// Trades Table (Execution History)
export const trades = pgTable('trades', {
  id: uuid('id').defaultRandom().primaryKey(),
  buyerOrderId: uuid('buyer_order_id').references(() => orders.id),
  sellerOrderId: uuid('seller_order_id').references(() => orders.id),
  assetId: text('asset_id').references(() => assets.id).notNull(),
  price: decimal('price', { precision: 18, scale: 2 }).notNull(),
  quantity: decimal('quantity', { precision: 18, scale: 4 }).notNull(),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
}, (table) => ({
  assetTradeIdx: index('trades_asset_idx').on(table.assetId),
  timeTradeIdx: index('trades_time_idx').on(table.timestamp),
}));

// Portfolio Table
export const portfolio = pgTable('portfolio', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  assetId: text('asset_id').references(() => assets.id).notNull(),
  quantity: decimal('quantity', { precision: 18, scale: 4 }).default('0').notNull(),
  averageBuyPrice: decimal('average_buy_price', { precision: 18, scale: 2 }).default('0'),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  userPortfolioIdx: index('portfolio_user_idx').on(table.userId),
  uniqueAssetUser: index('portfolio_unique_asset_user').on(table.userId, table.assetId), // Should be unique constraint in real DB
}));

// Relations
export const assetsRelations = relations(assets, ({ many }) => ({
  marketData: many(marketData),
  orders: many(orders),
  trades: many(trades),
}));

export const usersRelations = relations(users, ({ many }) => ({
  orders: many(orders),
  portfolio: many(portfolio),
}));
