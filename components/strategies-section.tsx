import { ArrowUpRight, TrendingUp, Shield, Zap, Briefcase } from 'lucide-react'
import Link from "next/link"

const strategies = [
  {
    title: "Long Congress",
    description: "Track & copy-trade top performing US Representatives.",
    return: "+24.8%",
    period: "YTD",
    risk: "Medium",
    icon: Briefcase,
    color: "text-neon-blue"
  },
  {
    title: "Inverse Cramer",
    description: "Algorithmic counter-trading of televised recommendations.",
    return: "+18.2%",
    period: "YTD",
    risk: "High",
    icon: Zap,
    color: "text-neon-purple"
  },
  {
    title: "Lobbying Alpha",
    description: "Corporate lobbying spend vs. stock performance correlation.",
    return: "+15.4%",
    period: "YTD",
    risk: "Low",
    icon: Shield,
    color: "text-neon-green"
  },
  {
    title: "Insider Sentiment",
    description: "Aggregated C-suite buying patterns across sectors.",
    return: "+32.1%",
    period: "YTD",
    risk: "High",
    icon: TrendingUp,
    color: "text-white"
  }
]

export function StrategiesSection() {
  return (
    <div className="w-full max-w-[1400px] mx-auto mt-24 px-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold tracking-tight text-white">Alpha Strategies</h2>
        <Link href="/strategies" className="text-xs font-mono text-muted-foreground hover:text-white transition-colors flex items-center gap-1">
          VIEW ALL <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {strategies.map((strategy, i) => (
          <div 
            key={i}
            className="group relative p-6 rounded-xl border border-white/[0.08] bg-[#0A0A0A] hover:bg-[#0F0F0F] hover:border-white/15 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05] ${strategy.color}`}>
                <strategy.icon className="w-5 h-5" />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-lg font-bold text-neon-green tracking-tight">{strategy.return}</span>
                <span className="text-[10px] font-mono text-muted-foreground uppercase">{strategy.period}</span>
              </div>
            </div>
            
            <h3 className="text-base font-bold text-white mb-2 group-hover:text-neon-blue transition-colors">
              {strategy.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {strategy.description}
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                Risk: <span className="text-white">{strategy.risk}</span>
              </span>
              <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
