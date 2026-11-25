import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Sparkles,
  ArrowRight,
  Award,
  Layers,
  Coins,
  Shield,
  Compass,
  Key,
} from 'lucide-react'
import { mockProducts } from '@/data/mockProducts'
import { mockCategories } from '@/data/mockCategories'
import { ProductCard } from '@/components/products/ProductCard'
import { HeroBanner } from '@/components/home/HeroBanner'

export const Home: React.FC = () => {
  const navigate = useNavigate()

  const popularCoins = mockProducts.filter((p) => p.category === 'challenge-coin')
  const dutyBadgesAndPins = mockProducts.filter(
    (p) => p.category === 'badge' || p.category === 'lapel-pin'
  )

  return (
    <div className="w-full flex flex-col pb-24 pt-3 space-y-4">
      {/* Main Animated Hero Banner */}
      <HeroBanner />

      {/* Featured Categories (Horizontal Scrollable Pills) */}
      <section className="px-3.5">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="font-cinzel text-sm font-bold text-slate-900 tracking-wide">
            Product Categories
          </h3>
          <button
            onClick={() => navigate('/explore')}
            className="text-[11px] font-bold text-blue-700 hover:text-blue-900 flex items-center gap-0.5"
          >
            View All ({mockCategories.length})
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {mockCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate(`/explore?category=${cat.slug}`)}
              className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-blue-600 active:scale-95 transition-all"
            >
              <div className="w-6 h-6 rounded-lg bg-[#162758] text-white flex items-center justify-center">
                {cat.slug === 'challenge-coin' && <Coins className="w-3.5 h-3.5" />}
                {cat.slug === 'badge' && <Shield className="w-3.5 h-3.5" />}
                {cat.slug === 'trail-badge' && <Compass className="w-3.5 h-3.5" />}
                {cat.slug === 'lapel-pin' && <Award className="w-3.5 h-3.5" />}
                {cat.slug === 'patch' && <Layers className="w-3.5 h-3.5" />}
                {cat.slug === 'keychain' && <Key className="w-3.5 h-3.5" />}
                {cat.slug !== 'challenge-coin' &&
                  cat.slug !== 'badge' &&
                  cat.slug !== 'trail-badge' &&
                  cat.slug !== 'lapel-pin' &&
                  cat.slug !== 'patch' &&
                  cat.slug !== 'keychain' && <Sparkles className="w-3.5 h-3.5" />}
              </div>
              <span className="text-xs font-semibold text-slate-800 whitespace-nowrap">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Popular Challenge Coins */}
      <section className="px-3.5">
        <div className="flex items-center justify-between mb-2.5">
          <div>
            <h3 className="font-cinzel text-sm font-bold text-slate-900 tracking-wide">
              Popular Challenge Coins
            </h3>
            <p className="text-[10px] text-slate-500">
              Solid brass, 3D relief, dual-plating & diamond edges
            </p>
          </div>
          <button
            onClick={() => navigate('/explore?category=challenge-coin')}
            className="text-[11px] font-bold text-blue-700 hover:text-blue-900 flex items-center gap-0.5"
          >
            See Coins
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {popularCoins.slice(0, 2).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Custom Badges & Lapel Pins */}
      <section className="px-3.5">
        <div className="flex items-center justify-between mb-2.5">
          <div>
            <h3 className="font-cinzel text-sm font-bold text-slate-900 tracking-wide">
              Duty Badges & Lapel Pins
            </h3>
            <p className="text-[10px] text-slate-500">
              Departmental breast badges, stars & cloisonne pins
            </p>
          </div>
          <button
            onClick={() => navigate('/explore?category=badge')}
            className="text-[11px] font-bold text-blue-700 hover:text-blue-900 flex items-center gap-0.5"
          >
            See Badges
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-2.5">
          {dutyBadgesAndPins.map((product) => (
            <ProductCard key={product.id} product={product} layout="horizontal" />
          ))}
        </div>
      </section>
    </div>
  )
}
