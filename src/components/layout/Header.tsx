import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ShoppingBag, Bell, ArrowLeft, Shield } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useNotification } from '@/context/NotificationContext'

interface HeaderProps {
  title?: string
  showBack?: boolean
  onBack?: () => void
  rightAction?: React.ReactNode
}

export const Header: React.FC<HeaderProps> = ({ title, showBack, onBack, rightAction }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { totalCount } = useCart()
  const { unreadCount } = useNotification()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      navigate(-1)
    }
  }

  const isCartPage = location.pathname === '/cart'
  const isNotificationsPage = location.pathname === '/notifications'

  return (
    <header className="w-full shrink-0 z-40 bg-gradient-to-r from-[#162758] via-[#1d3c8c] to-[#183274] text-white px-3.5 py-2.5 flex items-center justify-between border-b border-blue-950/60 shadow-md select-none">
      {/* Left: Back Button OR Frontline Coins Brand Emblem */}
      <div className="flex items-center gap-2 min-w-0">
        {showBack ? (
          <button
            onClick={handleBack}
            className="p-1.5 -ml-1 rounded-full text-slate-200 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        ) : (
          <div
            onClick={() => navigate('/')}
            className="cursor-pointer flex items-center gap-2 group min-w-0"
          >
            <div className="relative w-8 h-8 rounded-full border border-white/25 p-0.5 shadow-md shrink-0 bg-[#0c1938]">
              <div className="w-full h-full rounded-full bg-[#162758] flex items-center justify-center overflow-hidden">
                <img
                  src="/logo.svg"
                  alt="Frontline Coins USA"
                  className="w-7 h-7 object-contain group-hover:scale-105 transition-transform"
                />
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-cinzel tracking-wider font-bold text-xs text-white leading-none group-hover:text-blue-200 transition-colors truncate">
                FRONTLINE COINS
              </span>
              <span className="text-[8px] text-blue-200 tracking-widest uppercase font-semibold mt-0.5 truncate flex items-center gap-1">
                <Shield className="w-2.5 h-2.5 inline text-blue-300" />
                Veteran & LE Owned
              </span>
            </div>
          </div>
        )}

        {title && showBack && (
          <h1 className="font-semibold text-sm text-slate-100 truncate ml-1 font-cinzel">
            {title}
          </h1>
        )}
      </div>

      {/* Right: Custom Action, Shopping Cart (Always in Header!) and Notification Bell */}
      <div className="flex items-center gap-1.5 shrink-0">
        {rightAction}

        {/* Shopping Cart Button */}
        <button
          onClick={() => navigate('/cart')}
          className={`relative p-2 rounded-full active:scale-95 transition-colors ${
            isCartPage
              ? 'bg-white/20 text-white shadow-sm'
              : 'text-slate-200 hover:text-white hover:bg-white/10'
          }`}
          aria-label="Shopping Cart"
          title="Shopping Cart"
        >
          <ShoppingBag className="w-5 h-5" />
          {totalCount > 0 && (
            <span
              className={`absolute -top-0.5 -right-0.5 text-[10px] font-bold min-w-4.5 h-4.5 px-1 rounded-full flex items-center justify-center shadow-md ${
                isCartPage
                  ? 'bg-rose-600 text-white border border-white/40'
                  : 'bg-rose-600 text-white border border-[#162758]'
              }`}
            >
              {totalCount}
            </span>
          )}
        </button>

        {/* Notification Bell Button */}
        <button
          onClick={() => navigate('/notifications')}
          className={`relative p-2 rounded-full active:scale-95 transition-colors ${
            isNotificationsPage
              ? 'bg-white/20 text-white shadow-sm'
              : 'text-slate-200 hover:text-white hover:bg-white/10'
          }`}
          aria-label="Notifications"
          title="In-app Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span
              className={`absolute -top-0.5 -right-0.5 text-[10px] font-bold min-w-4.5 h-4.5 px-1 rounded-full flex items-center justify-center shadow-md ${
                isNotificationsPage
                  ? 'bg-rose-600 text-white border border-white/40'
                  : 'bg-rose-600 text-white border border-[#162758]'
              }`}
            >
              {unreadCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
