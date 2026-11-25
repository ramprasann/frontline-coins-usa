import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  FileText,
  Calendar,
  Clock,
  ShieldCheck,
  Check,
  X,
  Eye,
  AlertCircle,
  Building,
  User,
  Sparkles,
  Layers,
} from 'lucide-react'
import { useQuotes } from '@/context/QuoteContext'
import { useOrders } from '@/context/OrderContext'
import { useNotification } from '@/context/NotificationContext'
import { CoinArt } from '@/utils/productImages'

export const QuoteDetails: React.FC = () => {
  const { quoteId } = useParams<{ quoteId: string }>()
  const navigate = useNavigate()
  const { getQuoteById, acceptQuote, rejectQuote } = useQuotes()
  const { createCustomOrderFromQuote } = useOrders()
  const { addNotification } = useNotification()

  const quote = getQuoteById(quoteId || '')
  const [actionFeedback, setActionFeedback] = useState<string | null>(null)

  if (!quote) {
    return (
      <div className="w-full flex-1 flex flex-col items-center justify-center p-6 text-center space-y-3 bg-[#f8fafc]">
        <FileText className="w-12 h-12 text-slate-300" />
        <h3 className="font-cinzel text-base font-bold text-slate-800">
          Quote Not Found
        </h3>
        <p className="text-xs text-slate-500">
          The requested quotation ID "{quoteId}" was not found or has expired.
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

  const handleAccept = () => {
    acceptQuote(quote.id)

    // Convert into a custom manufactured order in OrderContext
    const order = createCustomOrderFromQuote(
      quote.id,
      quote.productTitle,
      quote.organization.quantity,
      quote.quotedDemoAmount || 1187.5,
      {
        fullName: quote.organization.customerName,
        email: quote.organization.email,
        phone: quote.organization.phone,
        addressLine1: '400 North Calvert Street',
        city: 'Baltimore',
        state: 'MD',
        zipCode: '21202',
        country: 'United States',
      },
      quote.artwork[0]?.previewUrl || CoinArt.valorEagle.front
    )

    addNotification({
      title: 'Quote Accepted & Order Created!',
      message: `You accepted quote #${quote.id}. Order #${order.id} is now registered. Please review your digital artwork proof.`,
      type: 'order',
      targetPath: `/order/${order.id}`,
      badgeLabel: 'Order Created',
    })

    setActionFeedback('accepted')
    setTimeout(() => {
      navigate(`/design-proof/${quote.id}`)
    }, 1200)
  }

  const handleReject = () => {
    rejectQuote(quote.id)
    addNotification({
      title: 'Quote Declined',
      message: `Quote #${quote.id} was marked as rejected. You can create a new request with updated specifications anytime.`,
      type: 'quote',
      targetPath: '/orders',
      badgeLabel: 'Declined',
    })
    setActionFeedback('rejected')
  }

  const getStatusBadge = (status: typeof quote.status) => {
    switch (status) {
      case 'quote_ready':
        return (
          <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">
            <Check className="w-3 h-3" />
            Quote Ready
          </span>
        )
      case 'accepted':
        return (
          <span className="bg-blue-100 text-blue-800 border border-blue-300 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
            Accepted
          </span>
        )
      case 'under_review':
        return (
          <span className="bg-blue-100 text-blue-800 border border-blue-300 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
            Under Review
          </span>
        )
      case 'rejected':
        return (
          <span className="bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
            Declined
          </span>
        )
      default:
        return (
          <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
            Submitted
          </span>
        )
    }
  }

  return (
    <div className="w-full flex-1 flex flex-col bg-[#f8fafc] overflow-y-auto no-scrollbar pb-32">
      {/* Top App Header */}
      <div className="sticky top-0 z-40 bg-gradient-to-r from-[#162758] via-[#1d3c8c] to-[#183274] text-white px-3.5 py-2.5 flex items-center justify-between border-b border-blue-950/60 shadow-md">
        <button
          onClick={() => navigate('/orders')}
          className="p-1.5 -ml-1 rounded-full text-slate-200 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <span className="font-cinzel text-xs font-bold text-white tracking-wider truncate max-w-[200px]">
          Quote #{quote.id}
        </span>

        {getStatusBadge(quote.status)}
      </div>

      {/* Action Notification Alert Banner */}
      {actionFeedback === 'accepted' && (
        <div className="bg-emerald-600 text-white px-4 py-2 text-xs font-bold flex items-center justify-center gap-2 shadow-sm animate-pulse">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>Demo Quote Accepted! Redirecting to 3D Design Proof...</span>
        </div>
      )}
      {actionFeedback === 'rejected' && (
        <div className="bg-slate-700 text-white px-4 py-2 text-xs font-semibold flex items-center justify-center gap-2 shadow-sm">
          <X className="w-4 h-4" />
          <span>Quote marked as declined.</span>
        </div>
      )}

      {/* Main Quote Details Body */}
      <div className="px-4 py-4 space-y-4">
        {/* Quote Title Card */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>Submitted on {quote.submittedDate}</span>
            <span className="font-mono text-[#0a1128] font-bold">ID: {quote.id}</span>
          </div>

          <h2 className="font-cinzel text-base font-bold text-slate-900 leading-snug">
            {quote.productTitle}
          </h2>

          <div className="flex items-center gap-2 text-xs text-slate-600 pt-1">
            <Building className="w-3.5 h-3.5 text-blue-600" />
            <span>{quote.organization.organizationName}</span>
            <span>•</span>
            <span>{quote.organization.quantity} pieces</span>
          </div>
        </div>

        {/* Official Quotation Financial Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="bg-[#0a1128] text-white p-3.5 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-blue-200 font-bold uppercase tracking-wider block">
                Simulated Quotation
              </span>
              <span className="text-xl font-extrabold font-cinzel text-white">
                ${(quote.quotedDemoAmount || 0).toFixed(2)}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-300 block">Unit Cost</span>
              <span className="text-sm font-bold text-white">
                ${(quote.unitPriceDemo || 0).toFixed(2)} / each
              </span>
            </div>
          </div>

          <div className="p-3.5 space-y-2 text-xs divide-y divide-slate-100">
            <div className="flex items-center justify-between pt-1">
              <span className="text-slate-600">Base Manufacturing ({quote.organization.quantity} pcs)</span>
              <span className="font-semibold text-slate-900">
                ${(quote.quotedDemoAmount || 0).toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-1">
                <span className="text-slate-600">Custom Die & Tooling Mold Fee</span>
                <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.2 rounded">
                  GUARANTEE
                </span>
              </div>
              <span className="font-bold text-emerald-600">$0.00 (FREE)</span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-1">
                <span className="text-slate-600">3D Artwork Design & Revisions</span>
                <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.2 rounded">
                  UNLIMITED
                </span>
              </div>
              <span className="font-bold text-emerald-600">$0.00 (FREE)</span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-slate-600">Insured Priority Ground Shipping</span>
              <span className="font-bold text-emerald-600">$0.00 (FREE)</span>
            </div>

            <div className="flex items-center justify-between pt-2.5 font-bold text-sm text-slate-900 border-t border-slate-200">
              <span>Total Quoted Demo Amount</span>
              <span className="text-[#0a1128] font-cinzel text-base">
                ${(quote.quotedDemoAmount || 0).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Timelines and Validity */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-white rounded-2xl p-3 border border-slate-200 text-xs">
            <div className="flex items-center gap-1.5 text-slate-500 mb-1">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-[10px] font-bold uppercase">Estimated Turnaround</span>
            </div>
            <p className="font-bold text-slate-900">
              {quote.estimatedProductionDays || '12-16 business days'}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-3 border border-slate-200 text-xs">
            <div className="flex items-center gap-1.5 text-slate-500 mb-1">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-[10px] font-bold uppercase">Quote Validity</span>
            </div>
            <p className="font-bold text-slate-900">
              {quote.quoteValidUntil || 'Valid for 30 days'}
            </p>
          </div>
        </div>

        {/* Design Department Reviewer Notes */}
        {quote.companyReviewerNotes && (
          <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 font-cinzel">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Reviewer Notes from Frontline Coins Team</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed italic">
              "{quote.companyReviewerNotes}"
            </p>
          </div>
        )}

        {/* Specifications Table */}
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200 space-y-2">
          <h3 className="font-cinzel text-xs font-bold text-slate-900 uppercase tracking-wider">
            Project Specifications
          </h3>
          <div className="divide-y divide-slate-100 text-xs">
            {quote.specifications.shape && (
              <div className="py-1.5 flex justify-between">
                <span className="text-slate-500">Shape</span>
                <span className="font-semibold text-slate-900">{quote.specifications.shape}</span>
              </div>
            )}
            {quote.specifications.size && (
              <div className="py-1.5 flex justify-between">
                <span className="text-slate-500">Dimensions</span>
                <span className="font-semibold text-slate-900">{quote.specifications.size}</span>
              </div>
            )}
            {quote.specifications.thickness && (
              <div className="py-1.5 flex justify-between">
                <span className="text-slate-500">Gauge</span>
                <span className="font-semibold text-slate-900">{quote.specifications.thickness}</span>
              </div>
            )}
            {quote.specifications.metalFinish && (
              <div className="py-1.5 flex justify-between">
                <span className="text-slate-500">Metal Finish</span>
                <span className="font-semibold text-slate-900">{quote.specifications.metalFinish}</span>
              </div>
            )}
            {quote.specifications.edgeStyle && (
              <div className="py-1.5 flex justify-between">
                <span className="text-slate-500">Custom Edge</span>
                <span className="font-semibold text-slate-900">{quote.specifications.edgeStyle}</span>
              </div>
            )}
          </div>
        </div>

        {/* Attached Artwork / Reference Proof Preview */}
        {quote.artwork.length > 0 && (
          <div className="bg-white rounded-2xl p-3.5 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-cinzel text-xs font-bold text-slate-900 uppercase tracking-wider">
                Attached Artwork & Reference
              </h3>
              <button
                onClick={() => navigate(`/design-proof/${quote.id}`)}
                className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                View 3D Proof
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {quote.artwork.map((art) => (
                <div
                  key={art.id}
                  onClick={() => navigate(`/design-proof/${quote.id}`)}
                  className="cursor-pointer bg-slate-50 rounded-xl p-2 border border-slate-200 flex items-center gap-2 group hover:border-blue-600"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#0a1128] p-1 flex items-center justify-center shrink-0 overflow-hidden">
                    <img
                      src={art.previewUrl}
                      alt={art.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-slate-800 truncate block">
                      {art.name}
                    </span>
                    <span className="text-[9px] text-blue-600 font-semibold">Click to preview</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Pinned Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-lg">
        <div className="max-w-md mx-auto flex items-center gap-2">
          {quote.status === 'quote_ready' && (
            <>
              <button
                onClick={handleReject}
                className="py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold active:scale-95"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#162758] via-[#1d3c8c] to-[#183274] text-white hover:brightness-110 active:scale-98 text-xs font-bold flex items-center justify-center gap-1.5 shadow-md border border-white/20"
              >
                <Check className="w-4 h-4 text-blue-200" />
                <span>Accept Demo Quote & Minting</span>
              </button>
            </>
          )}

          {quote.status === 'accepted' && (
            <button
              onClick={() => navigate(`/design-proof/${quote.id}`)}
              className="w-full py-3 px-4 rounded-xl bg-[#0a1128] text-blue-200 text-xs font-bold border border-white/20 flex items-center justify-center gap-1.5 shadow-md active:scale-98"
            >
              <Eye className="w-4 h-4" />
              <span>Review Digital 3D Proof & Approval</span>
            </button>
          )}

          {quote.status !== 'quote_ready' && quote.status !== 'accepted' && (
            <button
              onClick={() => navigate(`/design-proof/${quote.id}`)}
              className="w-full py-3 px-4 rounded-xl bg-[#0a1128] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-98"
            >
              <Eye className="w-4 h-4 text-blue-200" />
              <span>Inspect Attached Artwork Proof</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
