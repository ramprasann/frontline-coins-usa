import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Lock,
  Truck,
  CreditCard,
  Building,
  Check,
  AlertCircle,
} from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useOrders } from '@/context/OrderContext'
import type { CartItem } from '@/types'

export const Checkout: React.FC = () => {
  const navigate = useNavigate()
  const { cartItems, orderTotal, clearCart } = useCart()
  const { placeReadyMadeOrder } = useOrders()

  const [shippingAddress, setShippingAddress] = useState({
    fullName: 'Customer Representative',
    organization: 'Highland Park Services',
    addressLine1: '4500 Central Avenue',
    addressLine2: 'Suite 200 - Patrol Div',
    city: 'Highland Park',
    state: 'TX',
    zipCode: '75205',
    phone: '(214) 555-0199',
  })

  const [paymentMethod, setPaymentMethod] = useState<'simulated_card' | 'department_po'>('simulated_card')
  const [poNumber, setPoNumber] = useState('PO-HPPD-2026-042')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (cartItems.length === 0) {
    return (
      <div className="w-full flex-1 flex flex-col items-center justify-center p-6 text-center">
        <p className="text-sm text-slate-600">Your cart is empty.</p>
        <button
          onClick={() => navigate('/explore')}
          className="mt-3 px-4 py-2 bg-[#162758] text-white rounded-xl text-xs font-bold"
        >
          Return to Explore
        </button>
      </div>
    )
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      const createdOrder = placeReadyMadeOrder(
        cartItems.map((ci: CartItem) => ({
          productId: ci.product.id,
          name: ci.product.name,
          productType: ci.product.categoryName,
          quantity: ci.quantity,
          unitDemoPrice: ci.product.demoPrice || 14.5,
          totalDemoPrice: (ci.product.demoPrice || 14.5) * ci.quantity,
          imageUrl: ci.product.images.front,
          summaryText: ci.selectedFinish ? `Finish: ${ci.selectedFinish}` : undefined,
        })),
        {
          fullName: shippingAddress.fullName,
          email: 'orders@frontlinecoinsusa.com',
          phone: shippingAddress.phone,
          addressLine1: shippingAddress.addressLine1,
          addressLine2: shippingAddress.addressLine2,
          city: shippingAddress.city,
          state: shippingAddress.state,
          zipCode: shippingAddress.zipCode,
          country: 'United States',
        },
        paymentMethod === 'simulated_card'
          ? 'Simulated Card (Demo •••• 4242)'
          : `Department PO (${poNumber})`
      )

      clearCart()
      setIsSubmitting(false)
      navigate(`/order-success/${createdOrder.id}`)
    }, 900)
  }

  return (
    <div className="w-full flex-1 flex flex-col bg-[#f8fafc] overflow-y-auto no-scrollbar pb-32">
      {/* Top Header */}
      <div className="sticky top-0 z-40 bg-gradient-to-r from-[#162758] via-[#1d3c8c] to-[#183274] text-white px-3.5 py-2.5 flex items-center justify-between border-b border-blue-950/60 shadow-md">
        <button
          onClick={() => navigate('/cart')}
          className="p-1.5 -ml-1 rounded-full text-slate-200 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <span className="font-cinzel text-xs font-bold text-white tracking-wider">
          Demo Checkout
        </span>
        <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-400/30">
          <Lock className="w-3 h-3" />
          <span>Simulated</span>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="px-4 py-4 space-y-4">
        {/* Prototype Safety Notice */}
        <div className="bg-slate-100 rounded-2xl p-3 border border-slate-200 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div className="text-[11px] text-slate-800 leading-relaxed">
            <strong>Interactive Frontend Prototype:</strong> No real payment or card details are collected. Orders and simulated tracking are stored in your browser's local state.
          </div>
        </div>

        {/* Shipping Address Section */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-cinzel text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-blue-600" />
              Shipping Destination
            </h3>
            <span className="text-[10px] text-slate-400">USPS Priority Insured</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-0.5">
                Full Name / Attention *
              </label>
              <input
                type="text"
                required
                value={shippingAddress.fullName}
                onChange={(e) =>
                  setShippingAddress((p) => ({ ...p, fullName: e.target.value }))
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#162758]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-0.5">
                  Department / Agency
                </label>
                <input
                  type="text"
                  value={shippingAddress.organization}
                  onChange={(e) =>
                    setShippingAddress((p) => ({ ...p, organization: e.target.value }))
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#162758]"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-0.5">
                  Contact Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={shippingAddress.phone}
                  onChange={(e) =>
                    setShippingAddress((p) => ({ ...p, phone: e.target.value }))
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#162758]"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-0.5">
                Delivery Address *
              </label>
              <input
                type="text"
                required
                value={shippingAddress.addressLine1}
                onChange={(e) =>
                  setShippingAddress((p) => ({ ...p, addressLine1: e.target.value }))
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#162758]"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-0.5">
                Suite / Station / Division
              </label>
              <input
                type="text"
                value={shippingAddress.addressLine2}
                onChange={(e) =>
                  setShippingAddress((p) => ({ ...p, addressLine2: e.target.value }))
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#162758]"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-0.5">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={shippingAddress.city}
                  onChange={(e) =>
                    setShippingAddress((p) => ({ ...p, city: e.target.value }))
                  }
                  className="w-full px-2.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#162758]"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-0.5">
                  State *
                </label>
                <input
                  type="text"
                  required
                  value={shippingAddress.state}
                  onChange={(e) =>
                    setShippingAddress((p) => ({ ...p, state: e.target.value }))
                  }
                  className="w-full px-2.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#162758]"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-0.5">
                  Zip Code *
                </label>
                <input
                  type="text"
                  required
                  value={shippingAddress.zipCode}
                  onChange={(e) =>
                    setShippingAddress((p) => ({ ...p, zipCode: e.target.value }))
                  }
                  className="w-full px-2.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#162758]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Demo Payment Method Selector */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
          <h3 className="font-cinzel text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-blue-600" />
            Simulated Demo Payment
          </h3>

          <div className="space-y-2">
            <label
              onClick={() => setPaymentMethod('simulated_card')}
              className={`cursor-pointer rounded-xl p-3 border transition-all flex items-center justify-between text-xs ${
                paymentMethod === 'simulated_card'
                  ? 'border-[#162758] bg-[#162758] text-white shadow-xs'
                  : 'border-slate-200 bg-white text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <CreditCard className="w-4 h-4 text-blue-300" />
                <div>
                  <span className="font-bold block">Simulated Credit Card Demo</span>
                  <span className={`text-[10px] ${paymentMethod === 'simulated_card' ? 'text-slate-200' : 'text-slate-500'}`}>
                    Test card ending in •••• 4242 (Instant approval)
                  </span>
                </div>
              </div>
              {paymentMethod === 'simulated_card' && <Check className="w-4 h-4 text-white" />}
            </label>

            <label
              onClick={() => setPaymentMethod('department_po')}
              className={`cursor-pointer rounded-xl p-3 border transition-all flex items-center justify-between text-xs ${
                paymentMethod === 'department_po'
                  ? 'border-[#162758] bg-[#162758] text-white shadow-xs'
                  : 'border-slate-200 bg-white text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Building className="w-4 h-4 text-blue-300" />
                <div>
                  <span className="font-bold block">Department Purchase Order (PO)</span>
                  <span className={`text-[10px] ${paymentMethod === 'department_po' ? 'text-slate-200' : 'text-slate-500'}`}>
                    Official police, fire & military billing Demo
                  </span>
                </div>
              </div>
              {paymentMethod === 'department_po' && <Check className="w-4 h-4 text-white" />}
            </label>
          </div>

          {paymentMethod === 'department_po' && (
            <div className="pt-2">
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                Enter Department Purchase Order Reference
              </label>
              <input
                type="text"
                value={poNumber}
                onChange={(e) => setPoNumber(e.target.value)}
                placeholder="e.g. PO-MD-2026-881"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#162758]"
              />
            </div>
          )}
        </div>

        {/* Order Items Review */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2 text-xs">
          <h3 className="font-cinzel text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
            Order Items ({cartItems.length})
          </h3>
          <div className="divide-y divide-slate-100">
            {cartItems.map((item: CartItem) => (
              <div key={item.id} className="py-2 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900">{item.product.name}</span>
                  <span className="text-[10px] text-slate-500 block">
                    Qty: {item.quantity} • {item.selectedFinish || 'Standard'}
                  </span>
                </div>
                <span className="font-semibold text-slate-900">
                  ${((item.product.demoPrice || 0) * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-sm font-bold text-slate-900">
            <span>Total Demo Amount</span>
            <span className="text-base font-cinzel text-[#162758]">
              ${orderTotal.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Pinned Submit Button */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-lg">
          <div className="max-w-md mx-auto">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#162758] via-[#1d3c8c] to-[#183274] text-white hover:brightness-110 active:scale-98 text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg border border-white/20 disabled:opacity-50 transition-all"
            >
              {isSubmitting ? (
                <span>Authorizing Simulated Order...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-white" />
                  <span>Place Demo Order (${orderTotal.toFixed(2)})</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
