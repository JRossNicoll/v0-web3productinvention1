import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { REAL_NEWS } from "@/lib/news-data"

export function NewsFeed({ assetId }: { assetId?: string }) {
  const news = assetId 
    ? REAL_NEWS.filter(n => n.relatedAssets.includes(assetId))
    : REAL_NEWS

  return (
    <div className="space-y-4">
      {news.map((item) => (
        <Card key={item.id} className="border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
          <CardContent className="p-4">
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-white/10 text-xs font-mono text-muted-foreground">
                    {item.source}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                </div>
                <h4 className="font-bold leading-tight hover:text-neon-blue transition-colors cursor-pointer">
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    {item.title}
                    <ExternalLink className="w-3 h-3 opacity-50" />
                  </a>
                </h4>
              </div>
              <div className={`p-2 rounded-full bg-white/5 ${
                item.sentiment === 'positive' ? 'text-neon-green' : 
                item.sentiment === 'negative' ? 'text-red-500' : 'text-yellow-500'
              }`}>
                {item.sentiment === 'positive' ? <TrendingUp className="w-4 h-4" /> :
                 item.sentiment === 'negative' ? <TrendingDown className="w-4 h-4" /> :
                 <Minus className="w-4 h-4" />}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
