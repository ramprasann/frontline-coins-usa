import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, Compass, Hammer, Package, User } from 'lucide-react'
import { useOrders } from '@/context/OrderContext'

interface NavTab {
  name: string
  to: string
  icon: React.ElementType
  badgeCount?: number
}

export const BottomNavigation: React.FC = () => {
  const { orders } = useOrders()

  // Active / in-progress orders count
  const activeOrdersCount = orders.filter(
    (o) => o.currentStage !== 'delivered'
  ).length

  const tabs: NavTab[] = [
    { name: 'Home', to: '/', icon: Home },
    { name: 'Explore', to: '/explore', icon: Compass },
    { name: 'Custom', to: '/custom', icon: Hammer },
    {
      name: 'Orders',
      to: '/orders',
      icon: Package,
      badgeCount: activeOrdersCount > 0 ? activeOrdersCount : undefined,
    },
    { name: 'Profile', to: '/profile', icon: User },
  ]

  return (
    <div className="w-full px-3 pt-1 z-40 select-none shrink-0 bg-transparent pb-[max(0.625rem,env(safe-area-inset-bottom))] sm:pb-2.5">
      <nav
        aria-label="Bottom Navigation"
        className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-xl rounded-[26px] border border-slate-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)] px-1.5 py-1.5 pointer-events-auto"
      >
        <div className="grid grid-cols-5 items-center">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <NavLink
                key={tab.name}
                to={tab.to}
                end={tab.to === '/'}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center py-0.5 rounded-2xl transition-all duration-200 group active:scale-95 ${
                    isActive ? 'text-[#162758]' : 'text-slate-400 hover:text-slate-600'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={`relative w-12 h-7.5 rounded-full flex items-center justify-center transition-all duration-200 ${
                        isActive
                          ? 'bg-[#162758] text-white shadow-xs'
                          : 'text-slate-400 group-hover:text-slate-700'
                      }`}
                    >
                      <Icon
                        className={`w-4.5 h-4.5 transition-transform duration-200 ${
                          isActive ? 'scale-110 stroke-[2.3]' : 'stroke-[1.8]'
                        }`}
                      />
                      {tab.badgeCount !== undefined && tab.badgeCount > 0 && (
                        <span className="absolute -top-1 -right-0.5 bg-rose-600 text-white text-[9px] font-bold min-w-3.5 h-3.5 px-0.5 rounded-full flex items-center justify-center shadow-xs">
                          {tab.badgeCount}
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-[10px] tracking-tight mt-0.5 transition-colors ${
                        isActive
                          ? 'font-bold text-[#162758]'
                          : 'font-medium text-slate-500'
                      }`}
                    >
                      {tab.name}
                    </span>
                  </>
                )}
              </NavLink>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
