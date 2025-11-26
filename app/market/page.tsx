"use client"
import { useSearchParams } from "next/navigation"
import { MarketChart } from "@/components/market-chart"
import { AssetTable } from "@/components/asset-table"
import { TopPerformers } from "@/components/top-performers"
import { MarketStats } from "@/components/market-stats"
import { PortfolioView } from "@/components/portfolio-view"
import { NativeCoinBanner } from "@/components/native-coin-banner"
import { PresaleView } from "@/components/presale-view"
import { Suspense } from "react"
import MarketLoading from "./loading"

function MarketContent() {
  const searchParams = useSearchParams()
  const view = searchParams.get("view") || "overview"

  return (
    <div className="space-y-6">
      {view === "overview" && (
        <>
          <NativeCoinBanner />
          <MarketStats />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <MarketChart />
            </div>
            <div className="lg:col-span-4">
              <TopPerformers />
            </div>
          </div>
          <AssetTable />
        </>
      )}

      {view === "assets" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">All Assets</h2>
            <p className="text-sm text-muted-foreground">Browse and trade human equity tokens</p>
          </div>
          <AssetTable showFilters />
        </div>
      )}

      {view === "leaderboard" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">Top Performers</h2>
            <p className="text-sm text-muted-foreground">Highest valued identities on the network</p>
          </div>
          <TopPerformers expanded />
        </div>
      )}

      {view === "portfolio" && <PortfolioView />}

      {(view === "prime" || view === "presale") && <PresaleView />}
    </div>
  )
}

export default function MarketPage() {
  return (
    <Suspense fallback={<MarketLoading />}>
      <MarketContent />
    </Suspense>
  )
}
