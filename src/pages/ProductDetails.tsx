import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Heart,
  Share2,
  Star,
  ShoppingBag,
  Hammer,
  ShieldCheck,
  Check,
  ChevronRight,
  Sparkles,
  Info,
} from 'lucide-react'
import { mockProducts } from '@/data/mockProducts'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { ProductCard } from '@/components/products/ProductCard'

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()

  const product = mockProducts.find((p) => p.id === id) || mockProducts[0]
  const isSaved = isWishlisted(product.id)

  const [activeSide, setActiveSide] = useState<'front' | 'back'>('front')
  const [selectedFinish, setSelectedFinish] = useState<string>(
    product.finishOptions?.[0] || 'Standard'
  )
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizeOptions?.[0] || 'Standard'
  )
  const [quantity, setQuantity] = useState<number>(1)
  const [showAddedToast, setShowAddedToast] = useState<boolean>(false)

  const currentImage =
    activeSide === 'back' && product.images.back
      ? product.images.back
      : product.images.front

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedFinish, selectedSize)
    setShowAddedToast(true)
    setTimeout(() => setShowAddedToast(false), 2200)
  }

  const handleCustomRequest = () => {
    navigate(`/custom?productType=${product.category}&referenceProduct=${product.id}`)
  }

  const relatedProducts = mockProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 2)

  const totalDemoCost = (product.demoPrice || 0) * quantity

  return (
    <div className="w-full flex-1 flex flex-col bg-[#f8fafc] overflow-y-auto no-scrollbar pb-32">
      {/* Top Floating App Bar */}
      <div className="sticky top-0 z-40 bg-gradient-to-r from-[#162758] via-[#1d3c8c] to-[#183274] text-white px-3.5 py-2.5 flex items-center justify-between border-b border-blue-950/60 shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="p-1.5 -ml-1 rounded-full text-slate-200 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <span className="font-cinzel text-xs font-bold text-white tracking-wider truncate max-w-[200px]">
          {product.name}
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={() => toggleWishlist(product)}
            className={`p-1.5 rounded-full hover:bg-white/10 transition-colors ${
              isSaved ? 'text-rose-500' : 'text-slate-200'
            }`}
            aria-label="Save to Wishlist"
          >
            <Heart className={`w-5 h-5 ${isSaved ? 'fill-rose-500' : ''}`} />
          </button>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: product.name, url: window.location.href }).catch(() => {})
              }
            }}
            className="p-1.5 rounded-full text-slate-200 hover:text-white hover:bg-white/10"
            aria-label="Share product"
          >
            <Share2 className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      {/* Added to Cart Feedback Toast */}
      {showAddedToast && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-[#162758] text-white px-4 py-2 rounded-2xl shadow-2xl border border-[#162758] flex items-center gap-2 text-xs font-bold animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Added {quantity} to Shopping Cart!</span>
        </div>
      )}

      {/* Product Image Stage with 3D Visualizer Feel */}
      <div className="relative w-full bg-gradient-to-br from-[#070d1e] via-[#101b3b] to-[#070d1e] p-6 flex flex-col items-center justify-center border-b border-slate-200 select-none overflow-hidden">
        {/* Ambient Ring Glow */}
        <div className="absolute w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        {/* Front / Back Switcher Pills if back view exists */}
        {product.images.back && (
          <div className="absolute top-3 left-3 z-10 flex items-center bg-black/50 backdrop-blur-md rounded-full p-0.5 border border-white/20">
            <button
              onClick={() => setActiveSide('front')}
              className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
                activeSide === 'front'
                  ? 'bg-[#162758] text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Front Face
            </button>
            <button
              onClick={() => setActiveSide('back')}
              className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
                activeSide === 'back'
                  ? 'bg-[#162758] text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Reverse Face
            </button>
          </div>
        )}

        {/* Main Artwork Graphic Display */}
        <div className="w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center relative transition-transform duration-300 hover:scale-105">
          <img
            src={currentImage}
            alt={`${product.name} - ${activeSide}`}
            className="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
          />
        </div>

        {/* View Indicator */}
        <div className="mt-3 flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
          <span>{activeSide === 'front' ? 'Obverse (Front Face)' : 'Reverse (Back Face)'}</span>
          <span>•</span>
          <span className="text-white">High-Relief 3D Sculpted</span>
        </div>
      </div>

      {/* Product Information Body */}
      <div className="px-4 py-4 space-y-4">
        {/* Title, Category & Price Header */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
              <Star className="w-3.5 h-3.5 fill-blue-400 text-blue-400" />
              <span className="font-bold">{product.rating}</span>
              <span className="text-slate-400">({product.reviewCount} reviews)</span>
            </div>
          </div>

          <h2 className="font-cinzel text-lg font-bold text-slate-900 leading-snug">
            {product.name}
          </h2>

          <div className="flex items-baseline gap-2 mt-2">
            {product.demoPrice ? (
              <>
                <span className="text-2xl font-extrabold text-slate-900">
                  ${product.demoPrice.toFixed(2)}
                </span>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold">
                  Demo Price
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-blue-700 font-cinzel">
                Quotation on Request
              </span>
            )}
            <span className="text-[11px] text-slate-500">• {product.leadTime}</span>
          </div>
        </div>

        {/* Description */}
        <div className="text-xs text-slate-600 leading-relaxed space-y-2 border-t border-slate-200 pt-3">
          <p>{product.description}</p>
        </div>

        {/* Metal Finish Selector */}
        {product.finishOptions && product.finishOptions.length > 0 && (
          <div className="space-y-1.5 border-t border-slate-200 pt-3">
            <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>Selected Metal Finish:</span>
              <span className="text-blue-700 font-semibold">{selectedFinish}</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {product.finishOptions.map((finish) => (
                <button
                  key={finish}
                  onClick={() => setSelectedFinish(finish)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-semibold border text-left transition-all flex items-center justify-between ${
                    selectedFinish === finish
                      ? 'border-[#0a1128] bg-[#0a1128] text-white shadow-xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className="truncate">{finish}</span>
                  {selectedFinish === finish && <Check className="w-3.5 h-3.5 text-white" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Size Selector */}
        {product.sizeOptions && product.sizeOptions.length > 0 && (
          <div className="space-y-1.5 border-t border-slate-200 pt-3">
            <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>Dimension / Size:</span>
              <span className="text-blue-700 font-semibold">{selectedSize}</span>
            </label>
            <div className="flex items-center gap-2">
              {product.sizeOptions.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold border text-center transition-all ${
                    selectedSize === size
                      ? 'border-[#0a1128] bg-[#0a1128] text-white shadow-xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity Selector with live price */}
        <div className="flex items-center justify-between border-t border-slate-200 pt-3">
          <div>
            <span className="text-xs font-bold text-slate-800 block">Quantity</span>
            <span className="text-[10px] text-slate-500">
              Demo Total: ${totalDemoCost.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-xs">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center text-sm active:scale-95"
            >
              -
            </button>
            <span className="w-10 text-center font-bold text-xs text-slate-900">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-7 h-7 rounded-lg bg-[#0a1128] text-white hover:bg-[#1a2b5e] font-bold flex items-center justify-center text-sm active:scale-95"
            >
              +
            </button>
          </div>
        </div>

        {/* Official Manufacturing Specifications Table */}
        <div className="border-t border-slate-200 pt-4">
          <h3 className="font-cinzel text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
            Technical Specifications
          </h3>
          <div className="bg-white rounded-2xl border border-slate-200/90 divide-y divide-slate-100 overflow-hidden shadow-xs">
            {product.specifications.map((spec, i) => (
              <div key={i} className="flex items-center justify-between px-3.5 py-2 text-xs">
                <span className="text-slate-500">{spec.label}</span>
                <span className="font-semibold text-slate-900">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Frontline Coins Quality Guarantee Banner */}
        <div className="bg-[#0a1128] rounded-2xl p-4 border border-[#162758]/40 text-white space-y-2">
          <div className="flex items-center gap-2 text-white">
            <ShieldCheck className="w-5 h-5 text-white" />
            <h4 className="font-cinzel text-xs font-bold text-white tracking-wide">
              Frontline Coins USA Promise
            </h4>
          </div>
          <ul className="text-[11px] text-slate-300 space-y-1">
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-white shrink-0" />
              <span>0 Mold Fees on Custom Batches</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-white shrink-0" />
              <span>Free digital 3D proof revisions before minting</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-white shrink-0" />
              <span>Law enforcement owned & operated quality check</span>
            </li>
          </ul>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-slate-200 pt-4">
            <h3 className="font-cinzel text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              Similar {product.categoryName}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Pinned Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.1)]">
        <div className="max-w-md mx-auto flex items-center gap-2.5">
          {/* Custom Quote Request CTA */}
          <button
            onClick={handleCustomRequest}
            className="flex-1 py-3 px-3 rounded-2xl bg-white border border-[#162758] hover:bg-blue-50 active:scale-98 transition-all flex flex-col items-center justify-center text-slate-900 shadow-xs"
            title="Create a custom departmental version"
          >
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#0a1128]">
              <Hammer className="w-4 h-4 text-blue-700" />
              <span>Custom Version</span>
            </div>
            <span className="text-[9px] text-slate-500 font-medium">Free 3D Proof</span>
          </button>

          {/* Ready-Made Add to Cart CTA */}
          <button
            onClick={handleAddToCart}
            className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-[#0a1128] via-[#101b3d] to-[#0a1128] text-white hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-lg border border-[#162758]/40"
          >
            <ShoppingBag className="w-4.5 h-4.5 text-white" />
            <div className="flex flex-col text-left">
              <span className="text-xs font-extrabold text-white leading-tight">
                {product.isReadyMade ? 'Add to Cart' : 'Request Batch'}
              </span>
              <span className="text-[9px] text-white font-medium leading-tight">
                ${totalDemoCost.toFixed(2)} Demo Total
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
