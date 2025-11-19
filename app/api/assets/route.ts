import { NextResponse } from 'next/server';
import { MarketService } from '@/lib/services/market-service';

export async function GET() {
  try {
    const assets = await MarketService.getAllAssets();
    return NextResponse.json(assets);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch assets' }, { status: 500 });
  }
}
