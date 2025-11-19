import { RealTradePanel } from "@/components/real-trade-panel"


export default function AssetDetailPage({ params }: { params: { symbol: string } }) {

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* ... existing charts and content ... */}
        </div>
        
        <div className="space-y-6">
          <RealTradePanel symbol={symbol} price={asset.price} />
        </div>
      </div>
    </div>
  )
}
