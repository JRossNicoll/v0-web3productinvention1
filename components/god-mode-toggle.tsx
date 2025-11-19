"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useMarket } from "@/lib/store-context"
import { Eye, EyeOff, Zap } from 'lucide-react'
import { cn } from "@/lib/utils"

export function GodModeToggle() {
  const { isGodMode, toggleGodMode } = useMarket()

  return (
    <div className={cn(
      "flex items-center gap-3 px-3 py-1.5 rounded-full border transition-all duration-500",
      isGodMode 
        ? "bg-neon-blue/10 border-neon-blue/50 shadow-[0_0_15px_-3px_rgba(0,243,255,0.3)]" 
        : "bg-white/5 border-white/10 hover:bg-white/10"
    )}>
      <div className="flex items-center gap-2">
        {isGodMode ? (
          <Eye className="w-3.5 h-3.5 text-neon-blue animate-pulse" />
        ) : (
          <EyeOff className="w-3.5 h-3.5 text-muted-foreground" />
        )}
        <span className={cn(
          "text-[10px] font-mono font-bold tracking-wider uppercase transition-colors",
          isGodMode ? "text-neon-blue" : "text-muted-foreground"
        )}>
          Vantage Intelligence
        </span>
      </div>
      <Switch 
        checked={isGodMode} 
        onCheckedChange={toggleGodMode}
        className="scale-75 data-[state=checked]:bg-neon-blue"
      />
    </div>
  )
}
