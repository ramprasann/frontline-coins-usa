import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Eye,
  ShieldCheck,
  AlertCircle,
  Copy,
  ExternalLink,
} from 'lucide-react'
import { useOrders } from '@/context/OrderContext'
import { CustomOrderStage } from '@/types'

const CUSTOM_STAGES: Array<{ key: CustomOrderStage; title: string; desc: string }> = [
  {
    key: 'quote_accepted',
    title: '1. Quote Accepted',
    desc: 'Quotation confirmed & project booked into production schedule',
  },
  {
    key: 'artwork_in_progress',
    title: '2. Artwork in Progress',
    desc: 'Master engraver modeling 3D digital front/back proof',
  },
  {
    key: 'awaiting_design_approval',
    title: '3. Awaiting Design Approval',
    desc: 'Digital proof ready for customer inspection & sign-off',
  },
  {
    key: 'design_approved',
    title: '4. Design Approved',
    desc: 'Customer approved proof; steel die engraving prepped',
  },
  {
    key: 'production_started',
    title: '5. Production Started',
    desc: 'Solid metal die-striking, casting & hand enamel filling',
  },
  {
    key: 'production_completed',
    title: '6. Production Completed',
    desc: 'Hand polishing, dual-plating inspection & protective boxing',
  },
  {
    key: 'shipped',
    title: '7. Shipped (In Transit)',
    desc: 'Dispatched via Insured Priority Carrier with tracking',
  },
  {
    key: 'delivered',
    title: '8. Delivered',
    desc: 'Delivered to designated department station / address',
  },
]

export const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>()
  const navigate = useNavigate()
  const { getOrderById } = useOrders()

  const order = getOrderById(orderId || '')

  if (!order) {
    return (
      <div className="w-full flex-1 flex flex-col items-center justify-center p-6 text-center space-y-3 bg-[#f8fafc]">
        <Package className="w-12 h-12 text-slate-300" />
        <h3 className="font-cinzel text-base font-bold text-slate-800">
          Order Not Found
        </h3>
        <p className="text-xs text-slate-500">
          Order reference "{orderId}" was not found.
        </p>
        <button
          onClick={() => navigate('/orders')}
          className="py-2 px-4 rounded-xl bg-[#0a1128] text-white text-xs font-bold"
        >
          Return to Orders
        </button>
      </div>
    )
  }

  // Determine current stage index in CUSTOM_STAGES
  const currentStageIndex = CUSTOM_STAGES.findIndex(
    (s) => s.key === order.currentStage
  )

  const isCustom = order.orderType === 'custom_manufactured'

  return (
    <div className="w-full flex-1 flex flex-col bg-[#f8fafc] overflow-y-auto no-scrollbar pb-28">
      {/* Top Header */}
      <div className="sticky top-0 z-40 bg-gradient-to-r from-[#162758] via-[#1d3c8c] to-[#183274] text-white px-3.5 py-2.5 flex items-center justify-between border-b border-blue-950/60 shadow-md">
        <button
          onClick={() => navigate('/orders')}
          className="p-1.5 -ml-1 rounded-full text-slate-200 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <span className="font-cinzel text-xs font-bold text-white tracking-wider truncate max-w-[200px]">
          Order #{order.id}
        </span>

        <span className="bg-blue-500/20 text-blue-200 border border-blue-400/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
          {order.orderType === 'custom_manufactured' ? 'Custom Mfg' : 'Ready Stock'}
        </span>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Order Header Card */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono font-bold text-[#0a1128] text-sm">
              {order.id}
            </span>
            <span className="text-slate-500 text-[11px]">{order.orderDate}</span>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
            <span className="text-slate-500">Payment Status</span>
            <span className="font-bold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Verified Demo Payment
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">Method</span>
            <span className="font-medium text-slate-800">{order.paymentMethod}</span>
          </div>

          <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100 font-bold">
            <span className="text-slate-900">Total Demo Amount</span>
            <span className="text-base font-cinzel text-[#0a1128]">
              ${order.totalDemoPrice.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Tracking & Carrier Banner */}
        {order.trackingNumber && (
          <div className="bg-gradient-to-r from-[#0a1128] via-[#101b3b] to-[#0a1128] rounded-2xl p-4 text-white border border-white/20 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-white" />
                <span className="font-cinzel text-xs font-bold text-white">
                  {order.carrierName || 'USPS Priority Insured'}
                </span>
              </div>
              <span className="text-[10px] bg-blue-500/20 text-blue-300 font-bold px-2 py-0.5 rounded-full border border-blue-400/30">
                In Transit Demo
              </span>
            </div>

            <div className="bg-white/10 rounded-xl p-2.5 flex items-center justify-between font-mono text-xs">
              <span className="text-slate-200 select-all truncate">
                {order.trackingNumber}
              </span>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(order.trackingNumber || '')
                }}
                className="text-white hover:text-white p-1"
                title="Copy Tracking"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-300 pt-1">
              <span>Estimated Delivery:</span>
              <span className="font-bold text-white">
                {order.estimatedDeliveryDate || '3-5 Business Days'}
              </span>
            </div>
          </div>
        )}

        {/* Direct Link to 3D Design Proof if Available */}
        {order.quoteId && (
          <div className="bg-blue-50 rounded-2xl p-3.5 border border-blue-200 flex items-center justify-between gap-3">
            <div>
              <span className="font-cinzel text-xs font-bold text-blue-950 block">
                Digital 3D Artwork Proof
              </span>
              <span className="text-[10px] text-blue-800">
                View front/back high-relief proof renders & revision notes
              </span>
            </div>
            <button
              onClick={() => navigate(`/design-proof/${order.quoteId}`)}
              className="py-2 px-3 rounded-xl bg-[#0a1128] text-white text-xs font-bold shrink-0 shadow-xs"
            >
              <Eye className="w-3.5 h-3.5 inline mr-1" />
              View Proof
            </button>
          </div>
        )}

        {/* 8-Stage Custom Manufacturing Progress Tracker */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-cinzel text-xs font-bold text-slate-900 uppercase tracking-wider">
              {isCustom ? '8-Stage Custom Manufacturing Tracker' : 'Fulfillment Status Tracker'}
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">
              Stage {currentStageIndex + 1} of {CUSTOM_STAGES.length}
            </span>
          </div>

          <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {CUSTOM_STAGES.map((stage, idx) => {
              const isPassed = idx < currentStageIndex
              const isCurrent = idx === currentStageIndex
              const timestamp = order.stageTimestamps[stage.key]

              return (
                <div key={stage.key} className="relative text-xs">
                  {/* Step Dot Icon */}
                  <div
                    className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                      isPassed
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                        : isCurrent
                        ? 'bg-[#162758] border-blue-400 text-white ring-3 ring-blue-400/30 shadow-md animate-pulse'
                        : 'bg-white border-slate-300 text-slate-300'
                    }`}
                  >
                    {isPassed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                    ) : (
                      <span className="text-[9px] font-bold">{idx + 1}</span>
                    )}
                  </div>

                  {/* Stage Details */}
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-bold font-cinzel ${
                          isCurrent
                            ? 'text-[#0a1128] text-xs'
                            : isPassed
                            ? 'text-slate-800'
                            : 'text-slate-400'
                        }`}
                      >
                        {stage.title}
                      </span>
                      {timestamp && (
                        <span className="text-[9px] text-slate-400 font-mono">
                          {timestamp}
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-[10px] leading-snug ${
                        isCurrent
                          ? 'text-slate-700 font-medium'
                          : isPassed
                          ? 'text-slate-500'
                          : 'text-slate-400'
                      }`}
                    >
                      {stage.desc}
                    </p>

                    {/* Quick Action if current stage is awaiting approval */}
                    {isCurrent && stage.key === 'awaiting_design_approval' && (
                      <button
                        onClick={() => navigate(`/design-proof/${order.quoteId}`)}
                        className="mt-1.5 py-1.5 px-3 rounded-lg bg-[#162758] text-black text-[10px] font-extrabold flex items-center gap-1 shadow-xs"
                      >
                        <Eye className="w-3 h-3" />
                        Sign Off Artwork Now
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Order Items List */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2.5">
          <h3 className="font-cinzel text-xs font-bold text-slate-900 uppercase tracking-wider">
            Order Items ({order.items.length})
          </h3>
          <div className="divide-y divide-slate-100">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-2.5 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#0a1128] p-1 flex items-center justify-center shrink-0 border border-slate-200 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0 text-xs">
                  <h4 className="font-cinzel font-bold text-slate-900 truncate">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-0.5 truncate">
                    {item.summaryText}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-slate-500 text-[11px]">
                      Qty: <strong>{item.quantity}</strong>
                    </span>
                    <span className="font-extrabold text-slate-900">
                      ${item.totalDemoPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Destination Shipping Address */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-1.5 text-xs">
          <div className="flex items-center gap-1.5 font-cinzel text-xs font-bold text-slate-900 uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>Shipping Destination</span>
          </div>
          <p className="font-bold text-slate-800">{order.shippingAddress.fullName}</p>
          <p className="text-slate-600">{order.shippingAddress.addressLine1}</p>
          {order.shippingAddress.addressLine2 && (
            <p className="text-slate-600">{order.shippingAddress.addressLine2}</p>
          )}
          <p className="text-slate-600">
            {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
            {order.shippingAddress.zipCode}
          </p>
          <p className="text-slate-500 text-[10px]">{order.shippingAddress.phone}</p>
        </div>
      </div>
    </div>
  )
}
