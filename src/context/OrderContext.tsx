import React, { createContext, useContext, useState, useEffect } from 'react'
import { Order, OrderShippingAddress, OrderItem, CustomOrderStage, DesignProof } from '@/types'
import { initialMockOrders, mockDesignProofs } from '@/data/mockOrders'

interface OrderContextType {
  orders: Order[]
  getOrderById: (orderId: string) => Order | undefined
  placeReadyMadeOrder: (
    items: OrderItem[],
    shippingAddress: OrderShippingAddress,
    paymentMethod: string
  ) => Order
  createCustomOrderFromQuote: (
    quoteId: string,
    quoteTitle: string,
    quantity: number,
    totalDemoPrice: number,
    shippingAddress: OrderShippingAddress,
    imageUrl: string
  ) => Order
  approveDesignProof: (orderId: string, proofId?: string) => void
  requestProofRevision: (orderId: string, feedback: string) => void
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

const ORDERS_STORAGE_KEY = 'frontline_coins_orders_v1'

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY)
      return saved ? JSON.parse(saved) : initialMockOrders
    } catch {
      return initialMockOrders
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders))
    } catch (e) {
      console.error('Failed to save orders', e)
    }
  }, [orders])

  const getOrderById = (orderId: string) => {
    return orders.find((o) => o.id === orderId)
  }

  const placeReadyMadeOrder = (
    items: OrderItem[],
    shippingAddress: OrderShippingAddress,
    paymentMethod: string
  ): Order => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000)
    const newOrderId = `FCU-ORD-${randomDigits}`
    const today = new Date().toISOString().split('T')[0]
    const subtotal = items.reduce((sum, item) => sum + item.totalDemoPrice, 0)
    const shipping = subtotal > 75 ? 0 : 5.95
    const total = subtotal + shipping

    const trackingNum = `USPS-FLC-${Math.floor(100000000000 + Math.random() * 900000000000)}`

    const newOrder: Order = {
      id: newOrderId,
      orderType: 'ready_made',
      items,
      subtotalDemoPrice: Math.round(subtotal * 100) / 100,
      shippingDemoPrice: shipping,
      totalDemoPrice: Math.round(total * 100) / 100,
      orderDate: today,
      paymentStatus: 'demo_paid',
      paymentMethod,
      shippingAddress,
      currentStage: 'production_completed', // ready-made goes directly to packaged/dispatch ready
      stageTimestamps: {
        quote_accepted: `${today} 10:00 AM`,
        production_completed: `${today} 11:30 AM`,
      },
      trackingNumber: trackingNum,
      carrierName: 'USPS Priority Insured (Simulated)',
      estimatedDeliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
    }

    setOrders((prev) => [newOrder, ...prev])
    return newOrder
  }

  const createCustomOrderFromQuote = (
    quoteId: string,
    quoteTitle: string,
    quantity: number,
    totalDemoPrice: number,
    shippingAddress: OrderShippingAddress,
    imageUrl: string
  ): Order => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000)
    const newOrderId = `FCU-ORD-${randomDigits}`
    const today = new Date().toISOString().split('T')[0]
    const existingProof = mockDesignProofs[quoteId]

    const newOrder: Order = {
      id: newOrderId,
      orderType: 'custom_manufactured',
      quoteId,
      items: [
        {
          productId: quoteId,
          name: `${quoteTitle} (${quantity} units)`,
          productType: 'Custom Manufactured Insignia',
          quantity,
          unitDemoPrice: Math.round((totalDemoPrice / quantity) * 100) / 100,
          totalDemoPrice,
          imageUrl,
          summaryText: `Custom Job: ${quoteTitle} • Qty: ${quantity} • 0 Mold Fees Guaranteed`,
        },
      ],
      subtotalDemoPrice: totalDemoPrice,
      shippingDemoPrice: 0.0, // Free insured shipping on custom orders
      totalDemoPrice,
      orderDate: today,
      paymentStatus: 'demo_paid',
      paymentMethod: 'Simulated Department PO / Verified Demo Payment',
      shippingAddress,
      currentStage: 'artwork_in_progress',
      stageTimestamps: {
        quote_accepted: `${today} 09:00 AM`,
        artwork_in_progress: `${today} 11:00 AM`,
      },
      trackingNumber: `USPS-FLC-${Math.floor(100000000000 + Math.random() * 900000000000)}`,
      carrierName: 'USPS Priority Insured (Simulated)',
      estimatedDeliveryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      designProof: existingProof,
    }

    setOrders((prev) => [newOrder, ...prev])
    return newOrder
  }

  const approveDesignProof = (orderId: string) => {
    const now = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const updatedProof: DesignProof | undefined = order.designProof
            ? {
                ...order.designProof,
                status: 'approved',
                lastUpdated: new Date().toISOString().split('T')[0],
              }
            : undefined

          return {
            ...order,
            currentStage: 'production_started' as CustomOrderStage,
            stageTimestamps: {
              ...order.stageTimestamps,
              design_approved: now,
              production_started: `${now} (Tooling Active)`,
            },
            designProof: updatedProof,
          }
        }
        return order
      })
    )
  }

  const requestProofRevision = (orderId: string, feedback: string) => {
    const today = new Date().toISOString().split('T')[0]
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId && order.designProof) {
          const newVersion = order.designProof.currentVersion + 1
          const updatedProof: DesignProof = {
            ...order.designProof,
            currentVersion: newVersion,
            status: 'revision_requested',
            customerFeedbackNotes: feedback,
            lastUpdated: today,
            history: [
              ...order.designProof.history,
              {
                version: newVersion,
                date: today,
                notes: `Customer revision requested: "${feedback}"`,
                customerFeedback: feedback,
                status: 'current',
                frontImageUrl: order.designProof.frontImageUrl,
                backImageUrl: order.designProof.backImageUrl,
              },
            ],
          }
          return {
            ...order,
            currentStage: 'artwork_in_progress' as CustomOrderStage,
            designProof: updatedProof,
          }
        }
        return order
      })
    )
  }

  return (
    <OrderContext.Provider
      value={{
        orders,
        getOrderById,
        placeReadyMadeOrder,
        createCustomOrderFromQuote,
        approveDesignProof,
        requestProofRevision,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export const useOrders = () => {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider')
  }
  return context
}
