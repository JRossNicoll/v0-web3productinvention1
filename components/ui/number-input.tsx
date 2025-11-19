"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { ChevronUp, ChevronDown } from 'lucide-react'
import { cn } from "@/lib/utils"

interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string | number
  onChange: (value: string) => void
  step?: number
  min?: number
  max?: number
}

export function NumberInput({ 
  value, 
  onChange, 
  step = 1, 
  min = 0, 
  max, 
  className, 
  ...props 
}: NumberInputProps) {
  const handleIncrement = () => {
    const currentValue = parseFloat(value.toString()) || 0
    const newValue = currentValue + step
    if (max !== undefined && newValue > max) return
    onChange(newValue.toFixed(step < 1 ? 2 : 0))
  }

  const handleDecrement = () => {
    const currentValue = parseFloat(value.toString()) || 0
    const newValue = currentValue - step
    if (min !== undefined && newValue < min) return
    onChange(newValue.toFixed(step < 1 ? 2 : 0))
  }

  return (
    <div className="relative group">
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn("pr-8", className)}
        {...props}
      />
      <div className="absolute right-1 top-1 bottom-1 flex flex-col border-l border-white/10 w-6">
        <button
          type="button"
          onClick={handleIncrement}
          className="flex-1 flex items-center justify-center hover:bg-white/10 text-muted-foreground hover:text-white transition-colors rounded-tr-sm"
          tabIndex={-1}
        >
          <ChevronUp className="h-3 w-3" />
        </button>
        <button
          type="button"
          onClick={handleDecrement}
          className="flex-1 flex items-center justify-center hover:bg-white/10 text-muted-foreground hover:text-white transition-colors rounded-br-sm border-t border-white/10"
          tabIndex={-1}
        >
          <ChevronDown className="h-3 w-3" />
        </button>
      </div>
    </div>
  )
}
