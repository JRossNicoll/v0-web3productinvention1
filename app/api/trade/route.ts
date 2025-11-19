import { NextResponse } from 'next/server';
import { TradeService } from '@/lib/services/trade-service';
import { z } from 'zod';

const tradeSchema = z.object({
  userId: z.string().uuid(),
  assetId: z.string(),
  type: z.enum(['buy', 'sell']),
  side: z.enum(['limit', 'market']),
  quantity: z.number().positive(),
  price: z.number().positive().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = tradeSchema.parse(body);
    
    const order = await TradeService.placeOrder(
      validated.userId,
      validated.assetId,
      validated.type,
      validated.side,
      validated.quantity,
      validated.price
    );
    
    return NextResponse.json(order);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Trade failed' }, { status: 400 });
  }
}
