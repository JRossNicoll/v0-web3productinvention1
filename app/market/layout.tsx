"use client"

import { useState } from "react"
import { Activity, Users, DollarSign, BarChart3, ChevronRight, Twitter, Crown } from 'lucide-react'
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
  SidebarSeparator
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { GasPrice } from "@/components/gas-price"
import Image from "next/image"
import { PumpFunWidget } from "@/components/pump-fun-widget"
import { GodModeToggle } from "@/components/god-mode-toggle"
import { IntelligenceFeed } from "@/components/intelligence-feed"

const MENU_ITEMS = [
  { icon: Activity, label: "MARKET_OVERVIEW", href: "/market" },
  { icon: BarChart3, label: "ASSET_LIST", href: "/market?view=assets" },
  { icon: Users, label: "LEADERBOARD", href: "/market?view=leaderboard" },
  { icon: DollarSign, label: "PORTFOLIO", href: "/market?view=portfolio" },
  { icon: Crown, label: "VANTAGE_PRIME", href: "/market?view=prime", badge: "WAITLIST" },
]

export default function MarketLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-black text-foreground flex w-full font-mono selection:bg-neon-green/20 selection:text-neon-green">
        <Sidebar variant="inset" collapsible="icon" className="border-r border-white/10 bg-black">
          <SidebarHeader className="border-b border-white/10 p-4 bg-black">
            <Link href="/market" className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center hover:opacity-80 transition-opacity">
              <div className="relative w-8 h-8">
                <Image 
                  src="/placeholder-logo.svg" 
                  alt="Vantage Logo" 
                  fill 
                  className="object-contain invert"
                  priority
                />
              </div>
              <div className="group-data-[collapsible=icon]:hidden">
                <div className="font-semibold text-lg tracking-tight text-white font-sans">Vantage</div>
              </div>
            </Link>
          </SidebarHeader>
          
          <SidebarContent className="p-0 bg-black">
            <SidebarMenu className="gap-0">
              {MENU_ITEMS.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.href === "/market" ? pathname === "/market" : pathname.startsWith(item.href)}
                    tooltip={item.label}
                    className="h-12 text-[11px] font-mono tracking-wider data-[active=true]:bg-white/[0.03] data-[active=true]:text-neon-green data-[active=true]:border-l-2 data-[active=true]:border-neon-green hover:bg-white/[0.02] transition-none rounded-none border-l-2 border-transparent"
                  >
                    <Link href={item.href} className="flex items-center gap-3 w-full">
                      <item.icon className="w-4 h-4" strokeWidth={1.5} />
                      <span className="font-medium">{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto text-[9px] font-bold text-neon-blue px-1 border border-neon-blue/30 rounded-none">
                          [{item.badge}]
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarSeparator className="bg-white/10" />

          <SidebarFooter className="p-4 bg-black border-t border-white/10">
            <div className="flex flex-col gap-4 group-data-[collapsible=icon]:hidden">
              <div className="border border-white/10 bg-white/[0.02] p-3 space-y-2 rounded-none">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-muted-foreground tracking-wider uppercase">BLOCK_HEIGHT</span>
                  <span className="text-[11px] font-mono text-white">245,120,121</span>
                </div>
                <div className="w-full h-px bg-white/10" />
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-muted-foreground tracking-wider uppercase">NET_STATUS</span>
                  <span className="text-[11px] font-mono text-neon-green animate-pulse">CONNECTED</span>
                </div>
              </div>

              {/* Footer Info */}
              <div className="flex items-center justify-between px-1">
                <span className="text-[9px] text-muted-foreground/60 font-mono">
                  SYS.READY
                </span>
                <a 
                  href="https://x.com/VantageBond" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-6 h-6 border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:border-white/30 hover:text-white transition-none rounded-none"
                >
                  <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="overflow-x-hidden bg-black">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-6 border-b border-white/10 bg-black/95 backdrop-blur-none px-4 lg:px-6">
            <SidebarTrigger className="text-muted-foreground hover:text-white transition-colors rounded-none" />
            
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-neon-green animate-pulse" />
              <span className="font-bold text-sm tracking-tight font-mono text-white">TERMINAL_VIEW</span>
            </div>

            <div className="ml-auto flex items-center gap-6">
              <div className="flex items-center gap-4 lg:gap-6 text-[11px] font-mono">
                <div className="hidden md:block">
                  <GodModeToggle />
                </div>
                
                <div className="hidden sm:block">
                  <GasPrice />
                </div>
                <div className="hidden sm:block w-px h-4 bg-white/20" />
                <a 
                  href="https://pump.fun/coin/EMyXs726t4oUL7yCH9kkXCpWp3SdpWRopuewaVYhpump"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:block px-3 py-1.5 bg-white text-black hover:bg-zinc-200 transition-all duration-300 rounded-full"
                >
                  <span className="text-[10px] font-bold font-sans tracking-wide">PUMP.FUN</span>
                </a>
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 lg:p-6 space-y-6 bg-black">
            {children}
          </main>
        </SidebarInset>
        
        <PumpFunWidget />
        <IntelligenceFeed />
      </div>
    </SidebarProvider>
  )
}
