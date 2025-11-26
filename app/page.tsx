import { VantageScore } from "@/components/vantage-score"
import { TrendingSection } from "@/components/trending-section"
import { PeopleTicker } from "@/components/people-ticker"
import Link from "next/link"
import { Globe } from "lucide-react"
import Image from "next/image"

export default function Page() {
  return (
    <main className="min-h-screen lg:h-screen bg-[#050505] text-foreground overflow-y-auto lg:overflow-hidden overflow-x-hidden relative selection:bg-white/20 flex flex-col">
      {/* Subtle Grid Background - Professional & Technical */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_800px_at_50%_-30%,#1a1a1a,transparent)] pointer-events-none" />

      <header className="fixed top-0 w-full z-50 border-b border-white/[0.08] bg-[#050505]/90 backdrop-blur-md h-14 flex items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8">
            <Image src="/logo.jpg" alt="Vantage Logo" fill className="object-contain" priority />
          </div>
          <span className="font-mono text-xs font-bold tracking-widest text-white uppercase">VANTAGE PROTOCOL</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {["MARKETS", "INSTITUTIONAL", "DATA", "GOVERNANCE"].map((item) => (
            <Link
              key={item}
              href="#"
              className="text-[10px] font-mono font-medium text-white/60 hover:text-white transition-colors tracking-wider"
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/market"
            className="hidden md:flex items-center gap-2 border border-white/20 bg-white/5 px-4 py-1.5 text-[10px] font-mono font-medium text-white transition-all hover:bg-white hover:text-black uppercase tracking-wider"
          >
            Launch Terminal
          </Link>
        </div>
      </header>

      <div className="relative z-10 flex flex-col items-center justify-center flex-grow px-6 pt-24 pb-20 lg:pt-20 lg:pb-12">
        <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-16 items-center">
          {/* Left Column: Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/10 bg-white/[0.02] text-white/60 text-[9px] font-mono tracking-widest uppercase">
                <span className="w-1.5 h-1.5 bg-neon-green animate-pulse" />
                System Operational
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] leading-[1.1] text-white font-sans">
                Quantify the <br />
                <span className="text-white/40">Intangible.</span>
              </h1>

              <p className="text-white/60 max-w-xl text-sm md:text-base leading-relaxed font-mono border-l-2 border-white/[0.15] pl-6">
                Institutional-grade alternative data for the reputation economy. Track congressional trading, lobbying
                alpha, and social sentiment on Ethereum.
              </p>
            </div>

            {/* Terminal-style Search */}
            <div className="relative max-w-lg group w-full">
              <div className="relative flex items-center bg-[#0A0A0A] border border-white/[0.15] px-4 py-3 focus-within:border-white/40 transition-all">
                <span className="text-neon-green font-mono mr-3 text-xs">{">"}</span>
                <input
                  type="text"
                  placeholder="SEARCH_TICKERS_OR_DATASETS"
                  className="bg-transparent border-none outline-none text-xs text-white placeholder:text-white/20 w-full font-mono uppercase tracking-wider"
                />
                <div className="hidden md:flex items-center gap-1.5 px-1.5 py-0.5 border border-white/10 bg-white/5">
                  <span className="text-[9px] text-white/40 font-mono">CTRL+K</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/market"
                  className="flex items-center justify-center h-10 px-8 border border-white/20 bg-white/5 text-white text-xs font-bold tracking-widest font-mono hover:bg-white hover:text-black transition-all uppercase backdrop-blur-sm shadow-[0_0_15px_-5px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]"
                >
                  Enter Exchange
                </Link>
                <div className="flex items-center justify-center gap-2 px-4 h-10 border border-purple-500/20 bg-purple-500/5 text-[10px] font-mono text-purple-100/80 shadow-[0_0_15px_-5px_rgba(168,85,247,0.15)]">
                  <Globe className="w-3 h-3 text-purple-400" />
                  <span className="tracking-wider">ETHEREUM MAINNET</span>
                </div>
              </div>

              <div className="mt-2">
                <TrendingSection />
              </div>
            </div>
          </div>

          {/* Right Column: Visualization */}
          <div className="relative hidden lg:flex items-center justify-center scale-90">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent blur-[100px] opacity-20" />
            <div className="relative scale-90 xl:scale-100 grayscale contrast-125 hover:grayscale-0 transition-all duration-700">
              <VantageScore />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 w-full mt-auto lg:fixed lg:bottom-0">
        <PeopleTicker />
      </div>
    </main>
  )
}
