"use client"

import { useState } from "react"
import { Shield, Lock, CheckCircle2, ArrowRight, Wallet, Send, MessageCircle, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const ETH_AMOUNTS = [
  { value: "0.1", label: "0.1 ETH", tokens: "10,000 $VANT" },
  { value: "0.25", label: "0.25 ETH", tokens: "27,500 $VANT", popular: true },
  { value: "0.35", label: "0.35 ETH", tokens: "42,000 $VANT" },
  { value: "0.5", label: "0.5 ETH", tokens: "65,000 $VANT", bonus: "30% Bonus" },
]

const PAYMENT_ADDRESS = "0xF1fb36903f000c539a2b288f87D0Df808D3c4899"

type Step = "access" | "form" | "payment" | "complete"

export function PresaleView() {
  const [step, setStep] = useState<Step>("access")
  const [accessCode, setAccessCode] = useState("")
  const [accessError, setAccessError] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [telegramUsername, setTelegramUsername] = useState("")
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleAccessSubmit = () => {
    if (accessCode.toLowerCase() === "vantagealpha") {
      setAccessError(false)
      setStep("form")
    } else {
      setAccessError(true)
    }
  }

  const handleFormSubmit = () => {
    if (walletAddress && telegramUsername && selectedAmount) {
      setStep("payment")
    }
  }

  const copyAddress = async () => {
    await navigator.clipboard.writeText(PAYMENT_ADDRESS)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isValidEthAddress = (address: string) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address)
  }

  const selectedAmountData = ETH_AMOUNTS.find((a) => a.value === selectedAmount)

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Access Code Step */}
        {step === "access" && (
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-white font-sans">Vantage Prime</h1>
              <p className="text-sm text-white/50 max-w-sm mx-auto leading-relaxed">
                Exclusive early access to the $VANT token presale. Enter your access code to continue.
              </p>
            </div>

            {/* Access Form */}
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-medium text-white/70 uppercase tracking-wider">Access Code</label>
                <Input
                  type="text"
                  placeholder="Enter your access code"
                  value={accessCode}
                  onChange={(e) => {
                    setAccessCode(e.target.value)
                    setAccessError(false)
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleAccessSubmit()}
                  className={`h-14 bg-black border-white/10 text-white placeholder:text-white/30 rounded-xl text-center text-lg tracking-widest font-mono focus:border-white/30 focus:ring-0 transition-colors ${
                    accessError ? "border-red-500/50 bg-red-500/5" : ""
                  }`}
                />
                {accessError && (
                  <p className="text-xs text-red-400 text-center mt-2">Invalid access code. Please try again.</p>
                )}
              </div>

              <Button
                onClick={handleAccessSubmit}
                disabled={!accessCode}
                className="w-full h-14 bg-white text-black hover:bg-white/90 rounded-xl font-semibold text-sm tracking-wide transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Lock className="w-4 h-4 mr-2" />
                Verify Access
              </Button>
            </div>

            {/* Footer */}
            <p className="text-center text-xs text-white/30">
              Access codes are distributed to verified community members only.
            </p>
          </div>
        )}

        {/* Form Step */}
        {step === "form" && (
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-white font-sans">Access Granted</h1>
              <p className="text-sm text-white/50 max-w-sm mx-auto leading-relaxed">
                Complete the form below to reserve your $VANT allocation.
              </p>
            </div>

            {/* Form */}
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 space-y-6">
              {/* Wallet Address */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-white/70 uppercase tracking-wider flex items-center gap-2">
                  <Wallet className="w-3.5 h-3.5" />
                  Ethereum Wallet Address
                </label>
                <Input
                  type="text"
                  placeholder="0x..."
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className={`h-12 bg-black border-white/10 text-white placeholder:text-white/30 rounded-xl font-mono text-sm focus:border-white/30 focus:ring-0 transition-colors ${
                    walletAddress && !isValidEthAddress(walletAddress) ? "border-red-500/50" : ""
                  }`}
                />
                <p className="text-[10px] text-white/40">Tokens will be sent to this address after TGE</p>
              </div>

              {/* Telegram */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-white/70 uppercase tracking-wider flex items-center gap-2">
                  <MessageCircle className="w-3.5 h-3.5" />
                  Telegram Username
                </label>
                <Input
                  type="text"
                  placeholder="@username"
                  value={telegramUsername}
                  onChange={(e) => setTelegramUsername(e.target.value)}
                  className="h-12 bg-black border-white/10 text-white placeholder:text-white/30 rounded-xl text-sm focus:border-white/30 focus:ring-0 transition-colors"
                />
              </div>

              {/* Amount Selection */}
              <div className="space-y-3">
                <label className="text-xs font-medium text-white/70 uppercase tracking-wider">Select Amount</label>
                <div className="grid grid-cols-2 gap-3">
                  {ETH_AMOUNTS.map((amount) => (
                    <button
                      key={amount.value}
                      onClick={() => setSelectedAmount(amount.value)}
                      className={`relative p-4 rounded-xl border text-left transition-all ${
                        selectedAmount === amount.value
                          ? "bg-white/10 border-white/30"
                          : "bg-white/[0.02] border-white/10 hover:border-white/20"
                      }`}
                    >
                      {amount.popular && (
                        <span className="absolute -top-2 left-3 text-[9px] font-semibold bg-white text-black px-2 py-0.5 rounded-full">
                          POPULAR
                        </span>
                      )}
                      {amount.bonus && (
                        <span className="absolute -top-2 left-3 text-[9px] font-semibold bg-emerald-500 text-white px-2 py-0.5 rounded-full">
                          {amount.bonus}
                        </span>
                      )}
                      <div className="text-lg font-semibold text-white">{amount.label}</div>
                      <div className="text-xs text-white/50 mt-0.5">{amount.tokens}</div>
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleFormSubmit}
                disabled={!walletAddress || !isValidEthAddress(walletAddress) || !telegramUsername || !selectedAmount}
                className="w-full h-14 bg-white text-black hover:bg-white/90 rounded-xl font-semibold text-sm tracking-wide transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Continue to Payment
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Payment Step */}
        {step === "payment" && (
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-4">
                <Send className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-white font-sans">Complete Payment</h1>
              <p className="text-sm text-white/50 max-w-sm mx-auto leading-relaxed">
                Send exactly <span className="text-white font-semibold">{selectedAmount} ETH</span> to the address below
                to complete your presale purchase.
              </p>
            </div>

            {/* Payment Details */}
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 space-y-6">
              {/* Summary */}
              <div className="bg-black/50 border border-white/5 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/50">Amount</span>
                  <span className="text-sm font-semibold text-white">{selectedAmount} ETH</span>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/50">You Receive</span>
                  <span className="text-sm font-semibold text-emerald-400">{selectedAmountData?.tokens}</span>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/50">Delivery Wallet</span>
                  <span className="text-xs font-mono text-white/70 truncate max-w-[180px]">{walletAddress}</span>
                </div>
              </div>

              {/* Payment Address */}
              <div className="space-y-3">
                <label className="text-xs font-medium text-white/70 uppercase tracking-wider">
                  Send ETH to This Address
                </label>
                <div className="relative">
                  <div className="bg-black border border-white/10 rounded-xl p-4 pr-12 font-mono text-sm text-white break-all">
                    {PAYMENT_ADDRESS}
                  </div>
                  <button
                    onClick={copyAddress}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-white/50" />
                    )}
                  </button>
                </div>
              </div>

              {/* Warning */}
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
                <p className="text-xs text-amber-200/80 leading-relaxed">
                  <strong className="text-amber-200">Important:</strong> Send only ETH on the Ethereum mainnet. Tokens
                  will be distributed to your wallet after the Token Generation Event (TGE).
                </p>
              </div>

              <Button
                onClick={() => setStep("complete")}
                className="w-full h-14 bg-white text-black hover:bg-white/90 rounded-xl font-semibold text-sm tracking-wide transition-all"
              >
                I've Sent the Payment
                <CheckCircle2 className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Complete Step */}
        {step === "complete" && (
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-white font-sans">Submission Received</h1>
              <p className="text-sm text-white/50 max-w-sm mx-auto leading-relaxed">
                Thank you for participating in the Vantage Prime presale. Your entry has been recorded.
              </p>
            </div>

            {/* Confirmation Details */}
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-xs text-white/50 uppercase tracking-wider">Amount</span>
                  <span className="text-sm font-semibold text-white">{selectedAmount} ETH</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-xs text-white/50 uppercase tracking-wider">Allocation</span>
                  <span className="text-sm font-semibold text-emerald-400">{selectedAmountData?.tokens}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-xs text-white/50 uppercase tracking-wider">Wallet</span>
                  <span className="text-xs font-mono text-white/70 truncate max-w-[180px]">{walletAddress}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-xs text-white/50 uppercase tracking-wider">Telegram</span>
                  <span className="text-sm text-white/70">{telegramUsername}</span>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4 text-center">
                <p className="text-xs text-white/60 leading-relaxed">
                  Our team will verify your payment and reach out via Telegram with confirmation and next steps.
                </p>
              </div>
            </div>

            {/* Footer */}
            <p className="text-center text-xs text-white/30">
              Questions? Contact us on{" "}
              <a
                href="https://x.com/VantageBond"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
              >
                Twitter/X
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
