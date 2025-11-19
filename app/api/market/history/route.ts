import { NextResponse } from 'next/server';
import { MarketService } from '@/lib/services/market-service';

export async function GET() {
  try {
    const history = await MarketService.getMarketIndexHistory();
    return NextResponse.json(history);
  } catch (error) {
    console.error('Market Index Error:', error);
    return NextResponse.json({ error: 'Failed to fetch market index' }, { status: 500 });
  }
}
