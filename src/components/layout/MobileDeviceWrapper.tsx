import React from 'react'

interface MobileDeviceWrapperProps {
  children: React.ReactNode
}

export const MobileDeviceWrapper: React.FC<MobileDeviceWrapperProps> = ({ children }) => {
  return (
    <div className="w-full h-full h-[100dvh] bg-[#faf9f6] sm:min-h-screen sm:h-auto sm:bg-[#d8e0ea] sm:py-7 sm:px-4 sm:flex sm:flex-col sm:items-center sm:justify-center overflow-hidden">
      {/* 
        Smartphone Mockup Frame:
        - On desktop (sm:): Realistic smartphone with black curved bezel, drop shadow, and fixed dimensions (matching Gran Trade)
        - On mobile / DevTools Device Inspection (< 640px): 100% full screen, exact 100dvh viewport height
      */}
      <div
        className="
          w-full h-full h-[100dvh] max-h-[100dvh] bg-[#faf9f6] relative flex flex-col overflow-hidden
          sm:w-[395px] 
          sm:h-[844px] 
          sm:max-h-[92vh] 
          sm:rounded-[48px] 
          sm:border-[11px] sm:border-[#131519] 
          sm:ring-1 sm:ring-black/40
          sm:shadow-[0_25px_70px_rgba(0,0,0,0.38),0_10px_25px_rgba(0,0,0,0.18)]
          sm:[transform:translateZ(0)]
        "
      >
        {/* Actual Application Content */}
        <div className="flex-1 min-h-0 flex flex-col relative w-full overflow-hidden bg-[#faf9f6]">
          {children}
        </div>

        {/* Home Indicator Bar on Desktop Mockup (Hidden automatically on real mobile) */}
        <div className="hidden sm:block absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-stone-400/40 rounded-full z-50 pointer-events-none" />
      </div>
    </div>
  )
}
