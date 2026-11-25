import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Package,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Eye,
} from 'lucide-react'
import { useOrders } from '@/context/OrderContext'
import { useQuotes } from '@/context/QuoteContext'
import { CustomOrderStage, QuoteStatus } from '@/types'

export const Orders: React.FC = () => {
  const navigate = useNavigate()
  const { orders } = useOrders()
  const { quotes } = useQuotes()

  // Filter tabs: 'all' | 'quotes' | 'approval' | 'active' | 'completed'
  const [activeTab, setActiveTab] = useState<'all' | 'quotes' | 'approval' | 'active' | 'completed'>('all')

  // Filter logic
  const filteredQuotes = quotes.filter((q) => {
    if (activeTab === 'all' || activeTab === 'quotes') return true
    if (activeTab === 'approval') return q.status === 'quote_ready'
    if (activeTab === 'completed') return q.status === 'accepted' || q.status === 'rejected'
    return false
  })

  const filteredOrders = orders.filter((o) => {
    if (activeTab === 'all') return true
    if (activeTab === 'approval') return o.currentStage === 'awaiting_design_approval'
    if (activeTab === 'active') return o.currentStage !== 'delivered'
    if (activeTab === 'completed') return o.currentStage === 'delivered'
    return false
  })

  const getStageLabel = (stage: CustomOrderStage) => {
    switch (stage) {
      case 'quote_accepted':
        return 'Quote Accepted'
      case 'artwork_in_progress':
        return 'Artwork in Progress'
      case 'awaiting_design_approval':
        return 'Awaiting Design Approval'
      case 'design_approved':
        return 'Design Approved'
      case 'production_started':
        return 'Production Tooling Active'
      case 'production_completed':
        return 'Production Complete'
      case 'shipped':
        return 'Shipped (In Transit)'
      case 'delivered':
        return 'Delivered'
      default:
        return 'Processing'
    }
  }

  const getStageColor = (stage: CustomOrderStage) => {
    switch (stage) {
      case 'delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300'
      case 'shipped':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'production_started':
      case 'production_completed':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'awaiting_design_approval':
        return 'bg-purple-100 text-purple-800 border-purple-300'
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200'
    }
  }

  const totalItemsCount =
    (activeTab === 'quotes' ? 0 : filteredOrders.length) +
    (activeTab === 'active' ? 0 : filteredQuotes.length)

  return (
    <div className="w-full flex-1 flex flex-col pb-28 space-y-4">
      {/* Sticky Tab Header */}
      <div className="sticky top-0 z-30 bg-[#f8fafc]/95 backdrop-blur-md px-3.5 pt-3 pb-2 border-b border-slate-200/80 space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="font-cinzel text-base font-bold text-slate-900">
            Quotes & Orders
          </h2>
          <button
            onClick={() => navigate('/custom')}
            className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            + New Custom Quote
          </button>
        </div>

        {/* 5-Tab Navigation Pills */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-0.5 text-xs">
          {[
            { id: 'all', label: 'All History' },
            { id: 'quotes', label: `Quotes (${quotes.length})` },
            { id: 'approval', label: 'Awaiting Proof' },
            { id: 'active', label: `Active (${orders.filter((o) => o.currentStage !== 'delivered').length})` },
            { id: 'completed', label: 'Completed' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`shrink-0 px-3 py-1.5 rounded-full font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-[#162758] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main List Content */}
      <div className="px-3.5 space-y-4">
        {/* Section 1: Active & Ready Orders */}
        {activeTab !== 'quotes' && filteredOrders.length > 0 && (
          <div className="space-y-2.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-cinzel">
              Orders ({filteredOrders.length})
            </span>

            <div className="space-y-3">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  onClick={() => navigate(`/order/${order.id}`)}
                  className="cursor-pointer bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs hover:shadow-md transition-all group active:scale-[0.99] space-y-3"
                >
                  {/* Order Top Bar */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#0a1128]">
                        {order.id}
                      </span>
                      <span className="text-slate-400 text-[10px]">
                        • {order.orderDate}
                      </span>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStageColor(
                        order.currentStage
                      )}`}
                    >
                      {getStageLabel(order.currentStage)}
                    </span>
                  </div>

                  {/* Items Display */}
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl bg-[#0a1128] p-1 flex items-center justify-center shrink-0 border border-slate-200 overflow-hidden">
                      <img
                        src={order.items[0]?.imageUrl}
                        alt="Product preview"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-cinzel text-xs font-bold text-slate-900 group-hover:text-[#0a1128] truncate">
                        {order.items[0]?.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {order.items[0]?.summaryText || order.items[0]?.productType}
                      </p>
                      <div className="flex items-center gap-2 text-[11px] font-extrabold text-slate-900 mt-1">
                        <span>Total: ${order.totalDemoPrice.toFixed(2)}</span>
                        <span className="text-[9px] font-normal text-slate-400">
                          (Demo Payment Verified)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-bold">
                    <span>
                      {order.currentStage === 'awaiting_design_approval'
                        ? '⚠️ Review 3D Artwork Proof'
                        : 'Track 8-Stage Progress'}
                    </span>
                    <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>View Details</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 2: Custom Quotation Requests */}
        {activeTab !== 'active' && filteredQuotes.length > 0 && (
          <div className="space-y-2.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-cinzel">
              Quotation Requests ({filteredQuotes.length})
            </span>

            <div className="space-y-3">
              {filteredQuotes.map((quote) => (
                <div
                  key={quote.id}
                  onClick={() => navigate(`/quote/${quote.id}`)}
                  className="cursor-pointer bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs hover:shadow-md transition-all group active:scale-[0.99] space-y-2.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-[#0a1128]">
                      {quote.id}
                    </span>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        quote.status === 'quote_ready'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : quote.status === 'accepted'
                          ? 'bg-blue-100 text-blue-800 border-blue-300'
                          : 'bg-blue-100 text-blue-800 border-blue-300'
                      }`}
                    >
                      {quote.status === 'quote_ready'
                        ? 'Quote Ready'
                        : quote.status === 'accepted'
                        ? 'Accepted'
                        : 'Under Review'}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-cinzel text-xs font-bold text-slate-900 group-hover:text-[#0a1128]">
                      {quote.productTitle}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {quote.organization.organizationName} • {quote.organization.quantity} units • Submitted {quote.submittedDate}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <div>
                      {quote.quotedDemoAmount ? (
                        <div className="flex items-baseline gap-1">
                          <span className="font-bold text-slate-900">
                            ${quote.quotedDemoAmount.toFixed(2)}
                          </span>
                          <span className="text-[9px] text-slate-400">Demo Quote</span>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">Calculating estimate...</span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 font-bold text-blue-600 text-xs group-hover:translate-x-1 transition-transform">
                      <span>{quote.status === 'quote_ready' ? 'Review & Accept' : 'View Specs'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State if filter returns nothing */}
        {totalItemsCount === 0 && (
          <div className="bg-white rounded-3xl p-8 text-center border border-slate-200/90 shadow-xs my-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Package className="w-6 h-6" />
            </div>
            <h4 className="font-cinzel text-base font-bold text-slate-900">
              No Items in this Category
            </h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              You don't have any requests or orders matching this filter. Start a custom quotation or browse ready-made coins.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate('/custom')}
                className="py-2.5 px-4 rounded-xl bg-[#162758] text-white text-xs font-bold"
              >
                Start Custom Quotation
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
