import type { Metadata } from "next"
import { Geist, Geist_Mono } from 'next/font/google'
import "./globals.css"
import { Providers } from "./providers"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Vantage",
  description: "The world's first decentralized human equity marketplace.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen selection:bg-neon-blue/30 selection:text-neon-blue overflow-x-hidden`}
      >
        {/* Premium Background System */}
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_center,_var(--tw-gradient-stops))] from-blue-950/20 via-background to-background pointer-events-none z-[-1]" />
        <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)] opacity-15 pointer-events-none z-[-1]" />
        <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50 z-50" />
        
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
