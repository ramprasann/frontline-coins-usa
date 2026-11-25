import React from 'react'
import { useLocation } from 'react-router-dom'
import { Header } from './Header'
import { BottomNavigation } from './BottomNavigation'
import { MobileDeviceWrapper } from './MobileDeviceWrapper'

interface AppLayoutProps {
  children: React.ReactNode
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation()

  // Pages with custom dedicated headers or fullscreen workflows
  const isDetailsPage = location.pathname.startsWith('/product/')
  const isOrderDetailsPage = location.pathname.startsWith('/order/')
  const isQuoteDetailsPage = location.pathname.startsWith('/quote/')
  const isDesignProofPage = location.pathname.startsWith('/design-proof/')
  const isCustomReviewPage = location.pathname === '/custom/review'
  const isCheckoutPage = location.pathname === '/checkout'
  const isOrderSuccessPage = location.pathname.startsWith('/order-success')
  const isCartPage = location.pathname === '/cart'
  const isNotificationsPage = location.pathname === '/notifications'
  const isSavedPage = location.pathname === '/saved'

  const showMainHeader =
    !isDetailsPage &&
    !isOrderDetailsPage &&
    !isQuoteDetailsPage &&
    !isDesignProofPage &&
    !isCustomReviewPage &&
    !isCheckoutPage &&
    !isOrderSuccessPage &&
    !isCartPage &&
    !isNotificationsPage &&
    !isSavedPage

  // Hide bottom nav on detail views, full builder steps, checkout, and cart
  const hideBottomNav =
    isCheckoutPage ||
    isOrderSuccessPage ||
    isCartPage ||
    isDetailsPage ||
    isDesignProofPage ||
    isCustomReviewPage

  return (
    <MobileDeviceWrapper>
      <div className="w-full h-full flex-1 flex flex-col relative bg-[#f8fafc] overflow-hidden text-slate-900 antialiased selection:bg-blue-600/20">
        {/* Sticky Top App Header with Frontline Coins Logo, Live Cart & Bell */}
        {showMainHeader && <Header />}

        {/* Scrollable Mobile Content Canvas */}
        <main
          className={`flex-1 min-h-0 flex flex-col relative w-full bg-[#f8fafc] ${
            isCartPage || isDetailsPage ? 'overflow-hidden' : 'overflow-y-auto no-scrollbar'
          }`}
        >
          {children}
        </main>

        {/* Pinned 5-Tab Mobile Bottom Navigation */}
        {!hideBottomNav && <BottomNavigation />}
      </div>
    </MobileDeviceWrapper>
  )
}
