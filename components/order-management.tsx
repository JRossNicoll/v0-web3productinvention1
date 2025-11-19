"use client"

import { useMarket } from "@/lib/store-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { XCircle, CheckCircle2, Clock, AlertCircle } from 'lucide-react'
import { format } from "date-fns"

export function OrderManagement() {
  const { userState, cancelOrder } = useMarket()
  
  const openOrders = userState.orders.filter(o => o.status === 'open')
  const orderHistory = userState.orders.filter(o => o.status !== 'open').sort((a, b) => b.timestamp - a.timestamp)

  return (
    <Card className="border-white/5 h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold">Order Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="open" className="w-full">
          <TabsList className="bg-white/5 border border-white/10 w-full justify-start mb-4">
            <TabsTrigger value="open" className="text-xs">
              Open Orders 
              {openOrders.length > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 px-1.5 bg-neon-blue/20 text-neon-blue border-none">
                  {openOrders.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="history" className="text-xs">Order History</TabsTrigger>
          </TabsList>

          <TabsContent value="open" className="mt-0">
            <ScrollArea className="h-[300px] pr-4">
              {openOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground text-sm">
                  <Clock className="w-8 h-8 mb-2 opacity-20" />
                  No open orders
                </div>
              ) : (
                <div className="space-y-3">
                  {openOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-1 h-8 rounded-full ${order.side === 'buy' ? 'bg-neon-green' : 'bg-red-500'}`} />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm">{order.assetId}</span>
                            <Badge variant="outline" className="text-[10px] h-4 px-1 border-white/10 text-muted-foreground uppercase">
                              {order.type}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {format(order.timestamp, 'MMM d, HH:mm')}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right mr-4">
                        <div className="text-sm font-mono">
                          {order.amount} @ <span className="text-white">${order.price.toFixed(2)}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Total: ${(order.amount * order.price).toFixed(2)}
                        </div>
                      </div>

                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
                        onClick={() => cancelOrder(order.id)}
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="history" className="mt-0">
            <ScrollArea className="h-[300px] pr-4">
              {orderHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground text-sm">
                  <Clock className="w-8 h-8 mb-2 opacity-20" />
                  No order history
                </div>
              ) : (
                <div className="space-y-3">
                  {orderHistory.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 opacity-75 hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-3">
                        <div className={`w-1 h-8 rounded-full ${
                          order.status === 'filled' ? 'bg-neon-blue' : 'bg-gray-500'
                        }`} />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm">{order.assetId}</span>
                            <Badge variant="outline" className={`text-[10px] h-4 px-1 border-white/10 uppercase ${
                              order.status === 'filled' ? 'text-neon-green' : 'text-muted-foreground'
                            }`}>
                              {order.status}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {order.side.toUpperCase()} • {format(order.timestamp, 'MMM d, HH:mm')}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-sm font-mono">
                          {order.amount} @ ${order.price.toFixed(2)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Total: ${(order.amount * order.price).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
