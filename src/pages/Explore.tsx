import React, { useState, useMemo, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import {
  Search,
  Filter,
  SlidersHorizontal,
  Sparkles,
  ShoppingBag,
  Hammer,
  X,
  ChevronDown,
} from 'lucide-react'
import { mockProducts } from '@/data/mockProducts'
import { mockCategories } from '@/data/mockCategories'
import { ProductCard } from '@/components/products/ProductCard'
import { CustomProductType } from '@/types'

export const Explore: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const initialCategory = searchParams.get('category') || 'all'
  const initialSearch = searchParams.get('search') || ''

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory)
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch)
  const [filterType, setFilterType] = useState<'all' | 'ready_made' | 'custom'>('all')
  const [sortBy, setSortBy] = useState<'popular' | 'price_low' | 'price_high' | 'rating'>('popular')
  const [showSortDropdown, setShowSortDropdown] = useState<boolean>(false)

  // Sync state if url parameters change
  useEffect(() => {
    const cat = searchParams.get('category')
    const q = searchParams.get('search')
    if (cat) setSelectedCategory(cat)
    if (q !== null) setSearchQuery(q)
  }, [searchParams])

  const filteredProducts = useMemo(() => {
    return mockProducts
      .filter((p) => {
        // Category Filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false
        }
        // Journey / Type Filter
        if (filterType === 'ready_made' && !p.isReadyMade) return false
        if (filterType === 'custom' && !p.isCustomizable) return false

        // Search text matching
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim()
          const matchName = p.name.toLowerCase().includes(q)
          const matchCat = p.categoryName.toLowerCase().includes(q)
          const matchDesc = p.description.toLowerCase().includes(q)
          const matchFinish = p.finishOptions?.some((f) => f.toLowerCase().includes(q))
          if (!matchName && !matchCat && !matchDesc && !matchFinish) {
            return false
          }
        }
        return true
      })
      .sort((a, b) => {
        if (sortBy === 'price_low') {
          return (a.demoPrice || 0) - (b.demoPrice || 0)
        }
        if (sortBy === 'price_high') {
          return (b.demoPrice || 0) - (a.demoPrice || 0)
        }
        if (sortBy === 'rating') {
          return b.rating - a.rating
        }
        // Default: popular
        return (b.reviewCount || 0) - (a.reviewCount || 0)
      })
  }, [selectedCategory, filterType, searchQuery, sortBy])

  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(slug)
    setSearchParams((prev) => {
      if (slug === 'all') {
        prev.delete('category')
      } else {
        prev.set('category', slug)
      }
      return prev
    })
  }

  const resetFilters = () => {
    setSelectedCategory('all')
    setSearchQuery('')
    setFilterType('all')
    setSortBy('popular')
    setSearchParams({})
  }

  return (
    <div className="w-full flex flex-col pb-24 space-y-4">
      {/* Sticky Search and Filter Controls */}
      <div className="sticky top-0 z-30 bg-[#f8fafc]/95 backdrop-blur-md px-3.5 pt-3 pb-2 border-b border-slate-200/80 space-y-2.5">
        {/* Search Bar */}
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search coin shapes, badges, metals, finishes..."
            className="w-full pl-9.5 pr-8 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#162758] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Type / Purchase Journey Toggle */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl text-[11px] font-semibold">
          <button
            onClick={() => setFilterType('all')}
            className={`flex-1 py-1 px-2 rounded-lg transition-all ${
              filterType === 'all'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => setFilterType('ready_made')}
            className={`flex-1 py-1 px-2 rounded-lg flex items-center justify-center gap-1 transition-all ${
              filterType === 'ready_made'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShoppingBag className="w-3 h-3 text-blue-600" />
            Ready-Made
          </button>
          <button
            onClick={() => setFilterType('custom')}
            className={`flex-1 py-1 px-2 rounded-lg flex items-center justify-center gap-1 transition-all ${
              filterType === 'custom'
                ? 'bg-[#162758] text-white shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Hammer className="w-3 h-3 text-white" />
            Custom Made
          </button>
        </div>

        {/* Horizontal Category Scrollable Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5">
          <button
            onClick={() => handleCategorySelect('all')}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#162758] text-white border border-blue-900/40 shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            All ({mockProducts.length})
          </button>

          {mockCategories.map((cat) => {
            const count = mockProducts.filter((p) => p.category === cat.slug).length
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.slug)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.slug
                    ? 'bg-[#162758] text-white border border-blue-900/40 shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {cat.name} {count > 0 && `(${count})`}
              </button>
            )
          })}
        </div>

        {/* Results Count & Sort Dropdown */}
        <div className="flex items-center justify-between text-xs pt-1 px-0.5">
          <span className="text-slate-500 font-medium">
            Showing <strong className="text-slate-900">{filteredProducts.length}</strong> items
          </span>

          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs"
            >
              <SlidersHorizontal className="w-3 h-3 text-blue-600" />
              <span>
                {sortBy === 'popular' && 'Most Popular'}
                {sortBy === 'price_low' && 'Price: Low to High'}
                {sortBy === 'price_high' && 'Price: High to Low'}
                {sortBy === 'rating' && 'Highest Rated'}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showSortDropdown && (
              <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50">
                <button
                  onClick={() => {
                    setSortBy('popular')
                    setShowSortDropdown(false)
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs ${
                    sortBy === 'popular' ? 'bg-blue-50 text-blue-900 font-bold' : 'text-slate-700'
                  }`}
                >
                  Most Popular
                </button>
                <button
                  onClick={() => {
                    setSortBy('price_low')
                    setShowSortDropdown(false)
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs ${
                    sortBy === 'price_low' ? 'bg-blue-50 text-blue-900 font-bold' : 'text-slate-700'
                  }`}
                >
                  Price: Low to High
                </button>
                <button
                  onClick={() => {
                    setSortBy('price_high')
                    setShowSortDropdown(false)
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs ${
                    sortBy === 'price_high' ? 'bg-blue-50 text-blue-900 font-bold' : 'text-slate-700'
                  }`}
                >
                  Price: High to Low
                </button>
                <button
                  onClick={() => {
                    setSortBy('rating')
                    setShowSortDropdown(false)
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs ${
                    sortBy === 'rating' ? 'bg-blue-50 text-blue-900 font-bold' : 'text-slate-700'
                  }`}
                >
                  Highest Rated
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Grid or Empty State */}
      <div className="px-3.5">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 text-center border border-slate-200/90 shadow-xs my-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <h4 className="font-cinzel text-base font-bold text-slate-900">
              No Matching Products Found
            </h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              We couldn't find items matching "{searchQuery}". You can submit a custom quotation request for any design!
            </p>
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={resetFilters}
                className="py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
              >
                Clear All Filters
              </button>
              <button
                onClick={() => navigate('/custom')}
                className="py-2 px-4 rounded-xl bg-[#162758] text-white text-xs font-bold transition-colors"
              >
                Request Custom Manufacturing
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Promotional Custom Manufacturing Callout */}
      <div className="px-3.5">
        <div className="bg-gradient-to-r from-[#0a1128] via-[#111e40] to-[#0a1128] rounded-2xl p-4 text-white border border-white/20 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold text-white uppercase tracking-wider block">
              Need Something Unique?
            </span>
            <h4 className="font-cinzel text-xs font-bold text-white mt-0.5">
              0 Mold Fees on Custom Batches
            </h4>
            <p className="text-[10px] text-slate-300 mt-0.5">
              Upload your department crest or sketch for a free 3D digital proof.
            </p>
          </div>
          <button
            onClick={() => navigate('/custom')}
            className="shrink-0 px-3 py-2 rounded-xl bg-white text-[#162758] text-xs font-extrabold active:scale-95 transition-all shadow-md"
          >
            Customize
          </button>
        </div>
      </div>
    </div>
  )
}
