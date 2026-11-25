import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Check, Package, ArrowRight, ShieldCheck, FileText } from 'lucide-react'
import { useOrders } from '@/context/OrderContext'

export const OrderSuccess: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>()
  const navigate = useNavigate()
  const { getOrderById } = useOrders()

  const order = getOrderById(orderId || '')

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center p-5 bg-[#f8fafc] text-center space-y-4">
      {/* Golden Shield Ring Animation */}
      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-700 via-indigo-500 to-blue-600 p-1 shadow-xl animate-in zoom-in-75">
        <div className="w-full h-full rounded-full bg-[#0a1128] flex items-center justify-center">
          <Check className="w-10 h-10 text-white stroke-[3]" />
        </div>
      </div>

      <div>
        <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block font-cinzel">
          Simulated Purchase Confirmed
        </span>
        <h2 className="font-cinzel text-xl font-bold text-slate-900 mt-1">
          Thank You for Your Order!
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Demo Order Reference:
        </p>
        <span className="inline-block mt-1 px-3 py-1 bg-slate-100 rounded-lg text-sm font-mono font-bold text-[#0a1128] border border-slate-200">
          {orderId}
        </span>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs max-w-xs w-full text-xs text-left space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Order Type</span>
          <span className="font-bold text-slate-800">Ready-Made Stock</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Demo Amount</span>
          <span className="font-bold text-slate-900">
            ${(order?.totalDemoPrice || 0).toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Carrier</span>
          <span className="font-semibold text-slate-800">
            {order?.carrierName || 'USPS Priority Insured'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Est. Arrival</span>
          <span className="font-bold text-emerald-600">
            {order?.estimatedDeliveryDate || '3 Business Days'}
          </span>
        </div>
      </div>

      <div className="space-y-2.5 max-w-xs w-full pt-2">
        <button
          onClick={() => navigate(`/order/${orderId}`)}
          className="w-full py-3 rounded-2xl bg-[#162758] text-white text-xs font-bold border border-white/20 shadow-md active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <Package className="w-4 h-4" />
          <span>Track Order Progress</span>
        </button>

        <button
          onClick={() => navigate('/orders')}
          className="w-full py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-800 text-xs font-semibold hover:bg-slate-50 active:scale-98"
        >
          View All Orders
        </button>

        <button
          onClick={() => navigate('/')}
          className="text-xs text-slate-500 hover:text-slate-800 font-medium block pt-1"
        >
          Return to Home
        </button>
      </div>
    </div>
  )
}
