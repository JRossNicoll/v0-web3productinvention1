"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

const CONTRACT_ADDRESS = "0xFb1A3F6c8e0155F03ED7D381B7680Fcb40d54Bf8"

export function ContractAddressDisplay() {
  const [copied, setCopied] = useState(false)

  const copyAddress = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-3 mt-4">
      <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">CA:</span>
      <button
        onClick={copyAddress}
        className="group flex items-center gap-2 px-3 py-1.5 border border-white/10 bg-white/[0.02] hover:bg-white/5 transition-all"
      >
        <code className="text-[11px] font-mono text-white/70 group-hover:text-white transition-colors">
          {CONTRACT_ADDRESS.slice(0, 6)}...{CONTRACT_ADDRESS.slice(-4)}
        </code>
        {copied ? (
          <Check className="w-3 h-3 text-emerald-400" />
        ) : (
          <Copy className="w-3 h-3 text-white/40 group-hover:text-white/70 transition-colors" />
        )}
      </button>
      {copied && <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider">Copied</span>}
    </div>
  )
}
