import { NextResponse } from 'next/server';
import { MarketService } from '@/lib/services/market-service';

export async function GET(req: Request) {
  // Secure this endpoint with a secret key
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    await MarketService.updateMarketPrices();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Market update failed:', error);
    return NextResponse.json({ success: false, error: 'Update failed' }, { status: 500 });
  }
}
