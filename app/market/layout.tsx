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
  { icon: Activity, label: "Market Overview", href: "/market" },
  { icon: BarChart3, label: "Assets", href: "/market?view=assets" },
  { icon: Users, label: "Leaderboard", href: "/market?view=leaderboard" },
  { icon: DollarSign, label: "Portfolio", href: "/market?view=portfolio" },
  { icon: Crown, label: "Vantage Prime", href: "/market?view=prime", badge: "WAITLIST" },
]

export default function MarketLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background text-foreground flex w-full">
        <Sidebar variant="inset" collapsible="icon">
          <SidebarHeader className="border-b border-white/10 p-5 bg-gradient-to-b from-white/[0.03] to-transparent">
            {/* Wrapped logo and text in Link to /market */}
            <Link href="/market" className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center hover:opacity-80 transition-opacity">
              {/* Replaced Shield icon with Image component using the new logo file */}
              <div className="relative w-8 h-8">
                <Image 
                  src="/logo.jpg" 
                  alt="Vantage Logo" 
                  fill 
                  className="object-contain"
                  priority
                />
              </div>
              <div className="group-data-[collapsible=icon]:hidden">
                <div className="font-bold text-base tracking-tight text-white">VANTAGE</div>
                <div className="text-[9px] font-mono tracking-widest text-muted-foreground uppercase">Exchange Platform</div>
              </div>
            </Link>
          </SidebarHeader>
          
          <SidebarContent className="p-3">
            <SidebarMenu className="gap-1">
              {MENU_ITEMS.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.href === "/market" ? pathname === "/market" : pathname.startsWith(item.href)}
                    tooltip={item.label}
                    className="h-10 text-[13px] font-medium data-[active=true]:bg-white/[0.06] data-[active=true]:text-white hover:bg-white/[0.03] transition-all"
                  >
                    <Link href={item.href} className="flex items-center gap-3 w-full">
                      <item.icon className="w-[18px] h-[18px]" strokeWidth={2} />
                      <span className="font-medium">{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto text-[9px] font-bold bg-neon-blue/20 text-neon-blue px-1.5 py-0.5 rounded border border-neon-blue/20">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarSeparator />

          <SidebarFooter className="p-4 bg-gradient-to-t from-black/40 to-transparent">
            <div className="flex flex-col gap-4 group-data-[collapsible=icon]:hidden">
              {/* Stats Block */}
              <div className="rounded-md border border-white/10 bg-white/[0.02] p-3 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-muted-foreground tracking-wider uppercase">Block Height</span>
                  <span className="text-[11px] font-mono font-bold text-white">245,120,121</span>
                </div>
                <div className="w-full h-px bg-white/5" />
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-muted-foreground tracking-wider uppercase">Network</span>
                  <span className="text-[11px] font-mono font-bold text-neon-blue">SOLANA</span>
                </div>
              </div>

              {/* Footer Info */}
              <div className="flex items-center justify-between px-1">
                <span className="text-[9px] text-muted-foreground/60 font-mono">
                  Vantage 2025: All rights reserved.
                </span>
                <a 
                  href="https://x.com/VantageBond" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-6 h-6 rounded border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:border-white/30 hover:text-white hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all duration-300"
                >
                  <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="overflow-x-hidden">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-6 border-b border-white/10 bg-[#050505]/90 backdrop-blur-xl px-4 lg:px-6">
            <SidebarTrigger className="text-muted-foreground hover:text-white transition-colors" />
            
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 bg-white rounded-full" />
              <span className="font-bold text-sm tracking-tight font-mono">MARKET TERMINAL</span>
              <div className="hidden md:flex items-center gap-1.5 ml-4 px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span className="text-[9px] font-bold text-emerald-500 tracking-wider">INSTITUTIONAL LIQUIDITY: ONLINE</span>
              </div>
            </div>

            <div className="ml-auto flex items-center gap-6">
              <div className="flex items-center gap-4 lg:gap-6 text-[11px] font-mono">
                <div className="hidden md:block">
                  <GodModeToggle />
                </div>
                
                <div className="hidden sm:block">
                  <GasPrice />
                </div>
                <div className="hidden sm:block w-px h-6 bg-white/10" />
                <a 
                  href="https://pump.fun/coin/EMyXs726t4oUL7yCH9kkXCpWp3SdpWRopuewaVYhpump"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:block px-4 py-1.5 rounded border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                >
                  <span className="text-[10px] font-bold font-mono text-white tracking-wider group-hover:text-neon-blue transition-colors">PUMP.FUN</span>
                </a>
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 lg:p-6 space-y-6 bg-[#050505]">
            {children}
          </main>
        </SidebarInset>
        
        <PumpFunWidget />
        <IntelligenceFeed />
      </div>
    </SidebarProvider>
  )
}
