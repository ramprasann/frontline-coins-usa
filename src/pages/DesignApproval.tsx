import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Check,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  History,
  MessageSquare,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  Info,
} from 'lucide-react'
import { useQuotes } from '@/context/QuoteContext'
import { useOrders } from '@/context/OrderContext'
import { useNotification } from '@/context/NotificationContext'
import { mockDesignProofs } from '@/data/mockOrders'
import { DesignProof } from '@/types'
import { CoinArt } from '@/utils/productImages'

export const DesignApproval: React.FC = () => {
  const { quoteId } = useParams<{ quoteId: string }>()
  const navigate = useNavigate()
  const { getQuoteById } = useQuotes()
  const { orders, approveDesignProof, requestProofRevision } = useOrders()
  const { addNotification } = useNotification()

  const quote = getQuoteById(quoteId || '')
  // Find linked order if one exists
  const linkedOrder = orders.find((o) => o.quoteId === quoteId)

  // Retrieve or create fallback design proof
  const initialProof: DesignProof =
    mockDesignProofs[quoteId || ''] || {
      id: `PROOF-${quoteId || 'DEMO'}`,
      quoteId: quoteId || 'FCU-Q-8821',
      productName: quote?.productTitle || 'Custom Challenge Coin Batch',
      currentVersion: 1,
      status: 'pending_review',
      frontImageUrl: quote?.artwork?.[0]?.previewUrl || CoinArt.valorEagle.front,
      backImageUrl: quote?.artwork?.[1]?.previewUrl || CoinArt.valorEagle.back,
      designerNotes:
        'Proof v1: Modeled in high-relief dual-plating solid brass with diamond cross cut edge and translucent enamel fills.',
      lastUpdated: new Date().toISOString().split('T')[0],
      history: [
        {
          version: 1,
          date: new Date().toISOString().split('T')[0],
          notes: 'Initial digital artwork proof rendered by Frontline Coins USA design lab.',
          status: 'current',
          frontImageUrl: quote?.artwork?.[0]?.previewUrl || CoinArt.valorEagle.front,
          backImageUrl: quote?.artwork?.[1]?.previewUrl || CoinArt.valorEagle.back,
        },
      ],
    }

  const [proof, setProof] = useState<DesignProof>(initialProof)
  const [activeFace, setActiveFace] = useState<'front' | 'back'>('front')
  const [isZoomed, setIsZoomed] = useState<boolean>(false)
  const [showRevisionModal, setShowRevisionModal] = useState<boolean>(false)
  const [revisionFeedback, setRevisionFeedback] = useState<string>('')
  const [approvalSuccess, setApprovalSuccess] = useState<boolean>(false)

  const currentDisplayImage =
    activeFace === 'back' && proof.backImageUrl
      ? proof.backImageUrl
      : proof.frontImageUrl

  const handleApprove = () => {
    setProof((prev) => ({
      ...prev,
      status: 'approved',
      lastUpdated: new Date().toISOString().split('T')[0],
    }))

    if (linkedOrder) {
      approveDesignProof(linkedOrder.id, proof.id)
    }

    addNotification({
      title: 'Artwork Approved!',
      message: `Proof v${proof.currentVersion} for "${proof.productName}" was approved. Factory tooling & minting has commenced.`,
      type: 'artwork',
      targetPath: linkedOrder ? `/order/${linkedOrder.id}` : '/orders',
      badgeLabel: 'Production Started',
    })

    setApprovalSuccess(true)
    setTimeout(() => {
      if (linkedOrder) {
        navigate(`/order/${linkedOrder.id}`)
      } else {
        navigate('/orders')
      }
    }, 1500)
  }

  const handleSendRevision = () => {
    if (!revisionFeedback.trim()) return

    const nextVersion = proof.currentVersion + 1
    const today = new Date().toISOString().split('T')[0]

    const updated: DesignProof = {
      ...proof,
      currentVersion: nextVersion,
      status: 'revision_requested',
      customerFeedbackNotes: revisionFeedback,
      lastUpdated: today,
      history: [
        ...proof.history,
        {
          version: nextVersion,
          date: today,
          notes: `Revision Requested: "${revisionFeedback}"`,
          customerFeedback: revisionFeedback,
          status: 'current',
          frontImageUrl: proof.frontImageUrl,
          backImageUrl: proof.backImageUrl,
        },
      ],
    }

    setProof(updated)
    if (linkedOrder) {
      requestProofRevision(linkedOrder.id, revisionFeedback)
    }

    addNotification({
      title: 'Revision Request Sent',
      message: `Frontline Coins design team received your revision notes for Proof v${nextVersion}. Updated 3D proofs are free of charge.`,
      type: 'artwork',
      targetPath: `/design-proof/${quoteId}`,
      badgeLabel: 'Revision in Progress',
    })

    setShowRevisionModal(false)
    setRevisionFeedback('')
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

        <span className="font-cinzel text-xs font-bold text-white tracking-wider truncate max-w-[200px]">
          Design Proof v{proof.currentVersion}
        </span>

        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
            proof.status === 'approved'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400'
              : proof.status === 'revision_requested'
              ? 'bg-blue-500/20 text-blue-300 border border-blue-400'
              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-400'
          }`}
        >
          {proof.status === 'approved'
            ? 'Approved'
            : proof.status === 'revision_requested'
            ? 'Revision Pending'
            : 'Awaiting Approval'}
        </span>
      </div>

      {/* Approval Success Feedback */}
      {approvalSuccess && (
        <div className="bg-emerald-600 text-white px-4 py-2.5 text-xs font-bold flex items-center justify-center gap-2 shadow-md animate-pulse">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>Artwork Approved! Transferring to Production Tracker...</span>
        </div>
      )}

      {/* Main 3D Artwork Visualizer Stage */}
      <div className="relative w-full bg-gradient-to-br from-[#060b18] via-[#0d162e] to-[#060b18] p-5 flex flex-col items-center justify-center border-b border-slate-200 select-none overflow-hidden min-h-[300px]">
        {/* Face Toggle */}
        <div className="absolute top-3 left-3 z-10 flex items-center bg-black/60 backdrop-blur-md rounded-full p-0.5 border border-white/20">
          <button
            onClick={() => setActiveFace('front')}
            className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
              activeFace === 'front'
                ? 'bg-[#162758] text-white shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Obverse (Front)
          </button>
          <button
            onClick={() => setActiveFace('back')}
            className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
              activeFace === 'back'
                ? 'bg-[#162758] text-white shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Reverse (Back)
          </button>
        </div>

        {/* Zoom Button */}
        <button
          onClick={() => setIsZoomed(!isZoomed)}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-slate-200 hover:text-white active:scale-95 transition-all"
          title="Toggle Zoom"
        >
          {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
        </button>

        {/* Product Art Display */}
        <div
          className={`flex items-center justify-center transition-all duration-300 ${
            isZoomed ? 'w-72 h-72 scale-125' : 'w-52 h-52 sm:w-60 sm:h-60'
          }`}
        >
          <img
            src={currentDisplayImage}
            alt="3D Digital Proof"
            className="w-full h-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
          />
        </div>

        {/* Watermark / Simulated Rendering Notice */}
        <div className="mt-3 flex items-center gap-1.5 text-[9px] text-slate-400">
          <ShieldCheck className="w-3 h-3 text-blue-300" />
          <span>Frontline Coins USA 3D Digital Proof Render • Simulated Prototype</span>
        </div>
      </div>

      {/* Proof Info & Details */}
      <div className="px-4 py-4 space-y-4">
        {/* Project Title and Version Card */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-blue-700 uppercase tracking-wider text-[10px]">
              Digital Proof v{proof.currentVersion}
            </span>
            <span className="text-[11px] text-slate-400">Updated {proof.lastUpdated}</span>
          </div>

          <h2 className="font-cinzel text-base font-bold text-slate-900 leading-snug">
            {proof.productName}
          </h2>

          <p className="text-xs text-slate-600 leading-relaxed pt-1">
            {proof.designerNotes}
          </p>
        </div>

        {/* Customer Feedback if revision requested */}
        {proof.customerFeedbackNotes && (
          <div className="bg-slate-100 rounded-2xl p-3.5 border border-slate-200 text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
              <span>Customer Revision Instructions</span>
            </div>
            <p className="text-slate-700 italic">
              "{proof.customerFeedbackNotes}"
            </p>
          </div>
        )}

        {/* Guarantee Banner */}
        <div className="bg-[#0a1128] rounded-2xl p-3.5 border border-white/20 text-white space-y-1 text-xs">
          <div className="flex items-center gap-1.5 text-white font-bold font-cinzel text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Unlimited Free Proof Revisions</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Need changes to colors, rank insignia, badge number or lettering? Revisions are 100% free with 0 mold fee impact.
          </p>
        </div>

        {/* Revision History */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 font-cinzel">
            <History className="w-4 h-4 text-blue-700" />
            <span>Revision History ({proof.history.length})</span>
          </div>

          <div className="space-y-2 divide-y divide-slate-100">
            {proof.history.map((rev, idx) => (
              <div key={idx} className="pt-2 text-xs flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 font-cinzel">
                      Version {rev.version}
                    </span>
                    <span className="text-[10px] text-slate-400">{rev.date}</span>
                    {rev.status === 'current' && (
                      <span className="bg-emerald-100 text-emerald-800 text-[8px] font-bold px-1.5 py-0.2 rounded">
                        CURRENT
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">{rev.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revision Request Modal Sheet */}
      {showRevisionModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-3">
          <div className="w-full max-w-sm bg-white rounded-3xl p-4 shadow-2xl border border-slate-200 space-y-3 animate-in fade-in slide-in-from-bottom-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="font-cinzel text-xs font-bold text-slate-900">
                Request Free Artwork Revision
              </h4>
              <button
                onClick={() => setShowRevisionModal(false)}
                className="text-slate-400 hover:text-slate-700 text-xs px-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Describe the adjustments you'd like our design team to make (e.g. adjust enamel shade, thicken border lettering, or change edge cut).
            </p>

            <textarea
              value={revisionFeedback}
              onChange={(e) => setRevisionFeedback(e.target.value)}
              rows={3}
              placeholder="e.g. Please change the star to a 7-point star and use antique bronze finish..."
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#162758]"
            />

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => setShowRevisionModal(false)}
                className="flex-1 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSendRevision}
                disabled={!revisionFeedback.trim()}
                className="flex-1 py-2 rounded-xl bg-[#0a1128] text-white text-xs font-bold disabled:opacity-50"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pinned Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-lg">
        <div className="max-w-md mx-auto flex items-center gap-2.5">
          {proof.status !== 'approved' ? (
            <>
              <button
                onClick={() => setShowRevisionModal(true)}
                className="py-3 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold active:scale-95 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5 text-blue-700" />
                <span>Request Revision</span>
              </button>

              <button
                onClick={handleApprove}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#0a1128] via-[#101b3b] to-[#0a1128] text-white hover:brightness-110 active:scale-98 text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-md border border-white/20"
              >
                <Check className="w-4 h-4 text-white" />
                <span>Approve Artwork (Proceed to Minting)</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                if (linkedOrder) navigate(`/order/${linkedOrder.id}`)
                else navigate('/orders')
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#0a1128] text-white text-xs font-bold border border-white/20 flex items-center justify-center gap-1.5 shadow-md active:scale-98"
            >
              <Check className="w-4 h-4" />
              <span>Design Approved • View Manufacturing Tracking</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
