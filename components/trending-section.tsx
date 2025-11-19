import { ArrowUpRight, TrendingUp, Users, Activity, Globe, Building2, FileText, Scale } from 'lucide-react'
import Link from "next/link"

const trendingItems = [
  {
    label: "CONGRESS TRADING",
    value: "Pelosi Portfolio",
    subtext: "$12,450 Volume (24h)",
    change: "+12.4%",
    icon: Building2,
    href: "/market/congress",
    sentiment: 85,
    dominance: "High"
  },
  {
    label: "INSIDER ACTIVITY",
    value: "Tech Sector Sell-off",
    subtext: "142 Transactions",
    change: "-2.1%",
    icon: Activity,
    href: "/market/insiders",
    sentiment: 32,
    dominance: "Med"
  },
  {
    label: "GOV CONTRACTS",
    value: "Defense Spending",
    subtext: "$84,000 Awarded",
    change: "+5.2%",
    icon: FileText,
    href: "/market/contracts",
    sentiment: 68,
    dominance: "High"
  },
  {
    label: "LOBBYING",
    value: "Crypto Regulation",
    subtext: "Record High Spend",
    change: "+18.5%",
    icon: Scale,
    href: "/market/lobbying",
    sentiment: 92,
    dominance: "Very High"
  }
]

export function TrendingSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 w-full max-w-5xl mt-4">
      {trendingItems.map((item, i) => (
        <div 
          key={i} 
          className="group relative p-3 rounded-lg border border-white/[0.08] bg-[#0A0A0A] hover:bg-[#0F0F0F] hover:border-white/15 transition-all duration-300 flex flex-col gap-2 cursor-default"
        >
          <div className="flex items-center justify-between w-full">
            <div className="p-1.5 rounded-md bg-white/[0.03] border border-white/[0.05] text-white/60 group-hover:text-neon-blue group-hover:bg-neon-blue/5 transition-colors">
              <item.icon className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-center gap-1.5">
              <div className="text-[9px] font-mono text-muted-foreground uppercase">Sent.</div>
              <div className="w-8 h-1 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${item.sentiment > 50 ? 'bg-neon-green' : 'bg-neon-red'}`} 
                  style={{ width: `${item.sentiment}%` }}
                />
              </div>
            </div>
          </div>
          
          <div className="min-w-0">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[9px] font-mono text-muted-foreground tracking-wider uppercase truncate">
                {item.label}
              </span>
            </div>
            <div className="font-bold text-xs text-white group-hover:text-neon-blue transition-colors truncate">
              {item.value}
            </div>
            <div className="flex items-center justify-between mt-1">
              <div className="text-[10px] text-white/40 truncate">
                {item.subtext}
              </div>
              <span className={`text-[9px] font-mono font-bold ${item.change.includes('-') ? 'text-neon-red' : 'text-neon-green'}`}>
                {item.change}
              </span>
            </div>
            <div className="mt-2 pt-2 border-t border-white/5 flex justify-between items-center">
               <span className="text-[9px] text-muted-foreground uppercase tracking-wider">Impact</span>
               <span className="text-[9px] font-mono text-white/80">{item.dominance}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
