import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Heart, ShoppingBag, ArrowRight } from 'lucide-react'
import { useWishlist } from '@/context/WishlistContext'
import { useCart } from '@/context/CartContext'
import { mockProducts } from '@/data/mockProducts'
import { ProductCard } from '@/components/products/ProductCard'

export const Saved: React.FC = () => {
  const navigate = useNavigate()
  const { wishlistIds } = useWishlist()
  const { addToCart } = useCart()

  const savedProducts = mockProducts.filter((p) => wishlistIds.includes(p.id))

  const handleAddAllToCart = () => {
    savedProducts.forEach((p) => {
      if (p.isReadyMade) {
        addToCart(p, 1)
      }
    })
    navigate('/cart')
  }

  return (
    <div className="w-full flex-1 flex flex-col bg-[#f8fafc] overflow-y-auto no-scrollbar pb-28">
      {/* Top Header */}
      <div className="sticky top-0 z-40 bg-gradient-to-r from-[#162758] via-[#1d3c8c] to-[#183274] text-white px-3.5 py-2.5 flex items-center justify-between border-b border-blue-950/60 shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="p-1.5 -ml-1 rounded-full text-slate-200 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <span className="font-cinzel text-xs font-bold text-white tracking-wider">
          Saved Items ({savedProducts.length})
        </span>

        {savedProducts.length > 0 ? (
          <button
            onClick={handleAddAllToCart}
            className="text-[11px] font-bold text-blue-200 hover:text-white hover:underline"
          >
            Add All to Cart
          </button>
        ) : (
          <div className="w-6" />
        )}
      </div>

      <div className="px-4 py-4 space-y-4">
        {savedProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {savedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 text-center border border-slate-200 shadow-xs my-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-rose-400">
              <Heart className="w-6 h-6" />
            </div>
            <h4 className="font-cinzel text-base font-bold text-slate-900">
              No Saved Items Yet
            </h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Tap the heart icon on any challenge coin, breast badge, or custom product to save it to your wishlist for later.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate('/explore')}
                className="py-2.5 px-4 rounded-xl bg-[#162758] text-white text-xs font-bold shadow-xs active:scale-98 flex items-center justify-center gap-1.5 mx-auto"
              >
                <span>Browse Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
