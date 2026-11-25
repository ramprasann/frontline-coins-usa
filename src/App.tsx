import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { CartProvider } from '@/context/CartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { QuoteProvider } from '@/context/QuoteContext'
import { OrderProvider } from '@/context/OrderContext'
import { ProfileProvider } from '@/context/ProfileContext'
import { NotificationProvider } from '@/context/NotificationContext'
import { AppLayout } from '@/components/layout/AppLayout'

// Pages
import { Home } from '@/pages/Home'
import { Explore } from '@/pages/Explore'
import { ProductDetails } from '@/pages/ProductDetails'
import { CustomBuilder } from '@/pages/CustomBuilder'
import { QuoteDetails } from '@/pages/QuoteDetails'
import { DesignApproval } from '@/pages/DesignApproval'
import { Orders } from '@/pages/Orders'
import { OrderDetails } from '@/pages/OrderDetails'
import { Cart } from '@/pages/Cart'
import { Checkout } from '@/pages/Checkout'
import { OrderSuccess } from '@/pages/OrderSuccess'
import { Saved } from '@/pages/Saved'
import { Notifications } from '@/pages/Notifications'
import { Profile } from '@/pages/Profile'

// Helper component to scroll to top on navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <Router>
      <NotificationProvider>
        <ProfileProvider>
          <WishlistProvider>
            <CartProvider>
              <QuoteProvider>
                <OrderProvider>
                  <ScrollToTop />
                  <AppLayout>
                    <Routes>
                      {/* Main 5 Navigation Tabs */}
                      <Route path="/" element={<Home />} />
                      <Route path="/explore" element={<Explore />} />
                      <Route path="/custom" element={<CustomBuilder />} />
                      <Route path="/orders" element={<Orders />} />
                      <Route path="/profile" element={<Profile />} />

                      {/* Product Exploration & Details */}
                      <Route path="/product/:id" element={<ProductDetails />} />
                      <Route path="/saved" element={<Saved />} />

                      {/* Custom Manufacturing Journey Screens */}
                      <Route path="/quote/:quoteId" element={<QuoteDetails />} />
                      <Route path="/design-proof/:quoteId" element={<DesignApproval />} />

                      {/* Ready-Made & Custom Order Fulfillment */}
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/order-success/:orderId" element={<OrderSuccess />} />
                      <Route path="/order/:orderId" element={<OrderDetails />} />

                      {/* In-App Notifications */}
                      <Route path="/notifications" element={<Notifications />} />

                      {/* Fallback */}
                      <Route path="*" element={<Home />} />
                    </Routes>
                  </AppLayout>
                </OrderProvider>
              </QuoteProvider>
            </CartProvider>
          </WishlistProvider>
        </ProfileProvider>
      </NotificationProvider>
    </Router>
  )
}
