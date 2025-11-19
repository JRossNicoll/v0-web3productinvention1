"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const COLORS = [
  "hsl(var(--neon-blue))",
  "hsl(var(--neon-purple))",
  "hsl(var(--neon-green))",
  "hsl(var(--muted-foreground))",
  "hsl(var(--neon-yellow))",
]

const chartConfig = {
  value: {
    label: "Allocation",
  },
}

export function AllocationChart({ assets }: { assets?: Array<{ id: string, name: string, allocation: number }> }) {
  const data = assets && assets.length > 0 
    ? assets.map((asset, i) => ({
        name: asset.name,
        value: asset.allocation,
        color: COLORS[i % COLORS.length]
      }))
    : [
        { name: "No Assets", value: 100, color: "hsl(var(--muted-foreground))" }
      ]

  return (
    <div className="h-[250px] w-full relative">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={data.length > 1 ? 5 : 0}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <ChartTooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-background border border-white/10 p-2 rounded shadow-xl">
                    <div className="text-xs font-bold mb-1">{payload[0].name}</div>
                    <div className="text-xs font-mono text-muted-foreground">
                      {payload[0].value.toFixed(1)}% Allocation
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
        </PieChart>
      </ChartContainer>
      
      {/* Center Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-2xl font-bold">{data.length}</span>
        <span className="text-xs text-muted-foreground font-mono uppercase">
          {data.length === 1 ? "Asset" : "Assets"}
        </span>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-1.5">
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[10px] font-mono text-muted-foreground uppercase">
              {item.name.split(' ')[0]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
