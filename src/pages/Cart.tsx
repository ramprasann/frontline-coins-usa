import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ShoppingBag,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Trash2,
} from 'lucide-react'
import { useCart } from '@/context/CartContext'
import type { CartItem } from '@/types'

export const Cart: React.FC = () => {
  const navigate = useNavigate()
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    subtotal,
    estimatedShipping,
    orderTotal,
  } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="w-full flex-1 flex flex-col bg-[#f8fafc]">
        {/* Top Header */}
        <div className="sticky top-0 z-40 bg-gradient-to-r from-[#162758] via-[#1d3c8c] to-[#183274] text-white px-3.5 py-2.5 flex items-center justify-between border-b border-blue-950/60 shadow-md">
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 -ml-1 rounded-full text-slate-200 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <span className="font-cinzel text-xs font-bold text-white tracking-wider">
            Shopping Cart (0)
          </span>
          <div className="w-6" />
        </div>

        {/* Empty State */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-cinzel text-base font-bold text-slate-900">
              Your Cart is Empty
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              You don't have any ready-made items in your cart yet. Explore our stock commemorative challenge coins, duty lapel pins, and accessories.
            </p>
          </div>

          <div className="space-y-2 w-full max-w-xs pt-2">
            <button
              onClick={() => navigate('/explore')}
              className="w-full py-3 rounded-2xl bg-[#162758] text-white text-xs font-bold border border-white/20 shadow-md active:scale-98 transition-all flex items-center justify-center gap-1.5"
            >
              <span>Explore Ready-Made Coins</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => navigate('/custom')}
              className="w-full py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-800 text-xs font-semibold hover:bg-slate-50"
            >
              Start Custom Manufacturing Order
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full flex-1 flex flex-col bg-[#f8fafc] overflow-y-auto no-scrollbar pb-32">
      {/* Top Header */}
      <div className="sticky top-0 z-40 bg-gradient-to-r from-[#162758] via-[#1d3c8c] to-[#183274] text-white px-3.5 py-2.5 flex items-center justify-between border-b border-blue-950/60 shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="p-1.5 -ml-1 rounded-full text-slate-200 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <span className="font-cinzel text-xs font-bold text-white tracking-wider">
          Shopping Cart ({cartItems.length})
        </span>
        <button
          onClick={() => navigate('/explore')}
          className="text-[11px] font-bold text-blue-200 hover:text-white hover:underline"
        >
          + Add More
        </button>
      </div>

      {/* Cart Items List */}
      <div className="px-4 py-4 space-y-3">
        {cartItems.map((item: CartItem) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs flex gap-3.5 items-center"
          >
            {/* Product Image */}
            <div className="w-18 h-18 rounded-xl bg-gradient-to-br from-[#0a1128] via-[#101b3b] to-[#0a1128] p-1.5 flex items-center justify-center shrink-0 border border-slate-200">
              <img
                src={item.product.images.front}
                alt={item.product.name}
                className="w-full h-full object-contain drop-shadow-md"
              />
            </div>

            {/* Info & Quantity Adjuster */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-1">
                <div>
                  <span className="text-[9px] font-bold text-blue-700 uppercase tracking-wider block">
                    {item.product.categoryName}
                  </span>
                  <h4 className="font-bold text-xs text-slate-900 line-clamp-1 font-cinzel">
                    {item.product.name}
                  </h4>
                  {item.selectedFinish && (
                    <span className="text-[10px] text-slate-500 block">
                      Finish: {item.selectedFinish}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-1 text-slate-400 hover:text-rose-500 active:scale-90 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Price & Quantity Controls */}
              <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-100">
                <span className="font-extrabold text-xs text-slate-900">
                  ${((item.product.demoPrice || 0) * item.quantity).toFixed(2)}
                </span>

                <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-0.5">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-6 h-6 rounded bg-white text-slate-700 font-bold flex items-center justify-center text-xs shadow-2xs active:scale-95"
                  >
                    -
                  </button>
                  <span className="text-xs font-bold px-1.5 text-slate-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-6 h-6 rounded bg-[#162758] text-white font-bold flex items-center justify-center text-xs shadow-2xs active:scale-95"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Free Shipping Progress Callout */}
        <div className="bg-slate-100 rounded-2xl p-3 border border-slate-200 text-xs flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
          <div className="flex-1">
            <span className="font-bold text-slate-900 text-[11px] block">
              {subtotal >= 75
                ? 'FREE Priority Shipping Unlocked!'
                : `Add $${(75 - subtotal).toFixed(2)} more for Free Shipping`}
            </span>
            <span className="text-[10px] text-slate-500">
              Orders $75+ receive complimentary insured USPS delivery
            </span>
          </div>
        </div>

        {/* Order Summary Financials */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2 text-xs">
          <h3 className="font-cinzel text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
            Payment Summary (Demo Mode)
          </h3>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">Items Subtotal</span>
            <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">Estimated Shipping</span>
            <span className="font-semibold text-slate-900">
              {estimatedShipping === 0 ? (
                <span className="text-emerald-600 font-bold">FREE</span>
              ) : (
                `$${estimatedShipping.toFixed(2)}`
              )}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">State / Local Tax</span>
            <span className="font-semibold text-slate-900">$0.00</span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-sm font-bold text-slate-900">
            <span>Estimated Demo Total</span>
            <span className="text-base font-cinzel text-[#162758]">
              ${orderTotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Pinned Checkout Button */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-slate-400 font-medium block">Total Demo Amount</span>
            <span className="text-base font-extrabold font-cinzel text-slate-900">
              ${orderTotal.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#162758] via-[#1d3c8c] to-[#183274] text-white hover:brightness-110 active:scale-98 text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg border border-white/20"
          >
            <span>Proceed to Demo Checkout</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}
