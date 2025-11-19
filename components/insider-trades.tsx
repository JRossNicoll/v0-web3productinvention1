import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { getInsiderTrades } from "@/lib/insider-data"
import { ExternalLink, TrendingDown, TrendingUp } from 'lucide-react'

interface InsiderTradesProps {
  assetId: string
}

export function InsiderTrades({ assetId }: InsiderTradesProps) {
  const trades = getInsiderTrades(assetId)

  if (trades.length === 0) {
    return (
      <Card className="border-white/5 bg-white/5">
        <CardContent className="p-8 text-center text-muted-foreground">
          No recent insider trading data available for this asset.
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-white/5">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Insider Trading Activity</CardTitle>
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          Data provided by <span className="text-neon-blue font-bold">Quiver Quantitative</span>
          <ExternalLink className="w-3 h-3 ml-1" />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-muted-foreground">Insider</TableHead>
              <TableHead className="text-muted-foreground">Relation</TableHead>
              <TableHead className="text-muted-foreground">Date</TableHead>
              <TableHead className="text-muted-foreground">Type</TableHead>
              <TableHead className="text-right text-muted-foreground">Shares</TableHead>
              <TableHead className="text-right text-muted-foreground">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trades.map((trade) => (
              <TableRow key={trade.id} className="border-white/5 hover:bg-white/5">
                <TableCell className="font-medium text-white">{trade.insiderName}</TableCell>
                <TableCell>{trade.relation}</TableCell>
                <TableCell className="font-mono text-xs">{trade.transactionDate}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={trade.transactionType === 'Buy' 
                      ? "border-neon-green/30 text-neon-green bg-neon-green/5" 
                      : "border-red-500/30 text-red-500 bg-red-500/5"
                    }
                  >
                    {trade.transactionType === 'Buy' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {trade.transactionType.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono">{trade.shares.toLocaleString()}</TableCell>
                <TableCell className="text-right font-mono text-white">
                  ${(trade.value / 1000000).toFixed(2)}M
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
