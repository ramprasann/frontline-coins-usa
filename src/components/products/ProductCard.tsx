import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, ShoppingBag, Hammer, Star } from 'lucide-react'
import type { Product } from '@/types'
import { useWishlist } from '@/context/WishlistContext'
import { useCart } from '@/context/CartContext'

export interface ProductCardProps {
  product: Product
  variant?: 'grid' | 'horizontal'
  layout?: 'grid' | 'horizontal' | 'compact'
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  variant,
  layout,
}) => {
  const isHorizontal = variant === 'horizontal' || layout === 'compact' || layout === 'horizontal'
  const navigate = useNavigate()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const { addToCart } = useCart()
  const isSaved = isWishlisted(product.id)

  const handleCardClick = () => {
    navigate(`/product/${product.id}`)
  }

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleWishlist(product)
  }

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (product.isReadyMade) {
      addToCart(product, 1)
    } else {
      navigate('/custom', { state: { productTypeId: product.category } })
    }
  }

  if (isHorizontal) {
    return (
      <div
        onClick={handleCardClick}
        className="cursor-pointer bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex gap-3.5 group active:scale-[0.99] relative overflow-hidden"
      >
        {/* Left: Product Thumbnail */}
        <div className="relative w-24 h-24 rounded-xl bg-gradient-to-br from-[#0a1128] via-[#101b3b] to-[#0a1128] p-1.5 flex items-center justify-center shrink-0 overflow-hidden border border-slate-200 shadow-inner">
          <img
            src={product.images.front}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
            loading="lazy"
          />
          {product.badgeTag && (
            <span className="absolute top-1 left-1 bg-[#162758] text-white text-[8px] font-extrabold px-1.5 py-0.5 rounded shadow-xs uppercase tracking-tight">
              {product.badgeTag}
            </span>
          )}
        </div>

        {/* Right: Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-1">
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider truncate">
                {product.categoryName}
              </span>
              <button
                onClick={handleWishlistClick}
                className={`p-1 rounded-full hover:bg-slate-100 transition-colors ${
                  isSaved ? 'text-rose-500' : 'text-slate-400'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            <h3 className="font-bold text-xs text-slate-900 group-hover:text-[#0a1128] line-clamp-1 mt-0.5 font-cinzel">
              {product.name}
            </h3>

            <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
              {product.shortDescription}
            </p>
          </div>

          <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-100">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                {product.demoPrice ? (
                  <>
                    <span className="font-extrabold text-sm text-slate-900">
                      ${product.demoPrice.toFixed(2)}
                    </span>
                    <span className="text-[9px] text-slate-400 font-medium">Demo Price</span>
                  </>
                ) : (
                  <span className="font-bold text-xs text-blue-700">Custom Quote</span>
                )}
              </div>
            </div>

            <button
              onClick={handleQuickAdd}
              className="px-2.5 py-1 rounded-lg bg-[#162758] text-white hover:bg-[#1f387d] active:scale-95 text-[10px] font-bold flex items-center gap-1 shadow-xs transition-colors"
            >
              {product.isReadyMade ? (
                <>
                  <ShoppingBag className="w-3 h-3 text-white" />
                  Add
                </>
              ) : (
                <>
                  <Hammer className="w-3 h-3 text-white" />
                  Quote
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col group active:scale-[0.98] overflow-hidden relative"
    >
      {/* Product Image Stage with Metallic Coin Gradient Background */}
      <div className="relative w-full aspect-square bg-gradient-to-br from-[#0a1128] via-[#111e40] to-[#0a1128] p-3 flex items-center justify-center overflow-hidden border-b border-slate-100">
        <img
          src={product.images.front}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-300 drop-shadow-xl"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
          {product.badgeTag && (
            <span className="bg-[#162758] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-md shadow-sm uppercase tracking-tight">
              {product.badgeTag}
            </span>
          )}
          {product.isReadyMade ? (
            <span className="bg-slate-800/80 backdrop-blur-xs text-slate-200 text-[8px] font-semibold px-1.5 py-0.5 rounded border border-white/10">
              Ready-Made
            </span>
          ) : (
            <span className="bg-[#162758] text-white text-[8px] font-bold px-1.5 py-0.5 rounded">
              0 Mold Fee
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-2 right-2 p-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 active:scale-90 transition-transform ${
            isSaved ? 'text-rose-500 bg-white/90' : 'text-slate-200 hover:text-white'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Star Rating Overlay */}
        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs px-1.5 py-0.5 rounded-full flex items-center gap-1 text-[10px] text-white font-bold border border-white/10">
          <Star className="w-2.5 h-2.5 fill-white text-white" />
          <span>{product.rating}</span>
          <span className="text-slate-300 text-[9px] font-normal">({product.reviewCount})</span>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[9px] font-bold text-blue-700 uppercase tracking-wider block">
            {product.categoryName}
          </span>
          <h3 className="font-bold text-xs text-slate-900 group-hover:text-[#0a1128] line-clamp-2 mt-1 leading-snug font-cinzel">
            {product.name}
          </h3>
          <p className="text-[11px] text-slate-500 line-clamp-1 mt-1">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Action */}
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
          <div className="flex flex-col">
            {product.demoPrice ? (
              <>
                <span className="text-xs font-extrabold text-slate-900">
                  ${product.demoPrice.toFixed(2)}
                </span>
                <span className="text-[8px] text-slate-400 uppercase font-medium">Demo Price</span>
              </>
            ) : (
              <span className="text-xs font-bold text-blue-700">Custom Quote</span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            className="px-2 py-1 rounded-lg bg-[#162758] text-white hover:bg-[#1f387d] active:scale-95 text-[10px] font-bold flex items-center gap-1 shadow-xs transition-colors"
          >
            {product.isReadyMade ? (
              <>
                <ShoppingBag className="w-3 h-3 text-white" />
                Add
              </>
            ) : (
              <>
                <Hammer className="w-3 h-3 text-white" />
                Quote
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
