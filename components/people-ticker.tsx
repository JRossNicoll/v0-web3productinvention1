"use client"

import Image from "next/image"
import { useMarket } from "@/lib/store-context"
import { useEffect, useState } from "react"

export function PeopleTicker() {
  const { assets } = useMarket()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || assets.length === 0) return null

  // Filter for the specific people we want to show if needed, or just show all assets
  // The INITIAL_ASSETS in market-engine match the people we want.
  const people = assets.map(asset => ({
    name: asset.name,
    value: `$${asset.price.toFixed(2)}`,
    change: `${asset.change >= 0 ? '+' : ''}${asset.change.toFixed(1)}%`,
    image: asset.image,
    isPositive: asset.change >= 0
  }))

  return (
    <div className="w-full bg-black border-t border-white/10 overflow-hidden py-4 select-none">
      <div className="flex w-max animate-marquee">
        {/* Triple the list to ensure smooth infinite scroll on wide screens */}
        {[...people, ...people, ...people, ...people].map((person, i) => (
          <div key={i} className="flex items-center gap-3 mx-4 md:mx-8 min-w-max">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20 bg-white/5">
              <Image 
                src={person.image || "/placeholder.svg"} 
                alt={person.name}
                fill
                className="object-cover transition-all duration-300"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[11px] font-bold text-white uppercase tracking-wider leading-tight">{person.name}</span>
              <div className="flex items-center gap-2 text-[11px] font-mono leading-tight">
                <span className="text-white/80">{person.value}</span>
                <span className={`${person.isPositive ? 'text-neon-green' : 'text-neon-red'}`}>{person.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
