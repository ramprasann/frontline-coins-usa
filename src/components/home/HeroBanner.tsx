import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ShieldCheck,
  CheckCircle2,
  RotateCw,
} from 'lucide-react'

export const HeroBanner: React.FC = () => {
  const navigate = useNavigate()
  const [isFlipped, setIsFlipped] = useState(false)
  const [isManualPause, setIsManualPause] = useState(false)

  const toggleFlip = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFlipped(!isFlipped)
    setIsManualPause(true)
    setTimeout(() => setIsManualPause(false), 4000)
  }

  return (
    <section className="px-3.5">
      <div
        onClick={() => navigate('/explore')}
        className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#050b18] via-[#0c1633] to-[#070e24] border border-blue-900/50 shadow-xl p-4.5 sm:p-5 text-white select-none cursor-pointer group"
      >
        {/* Animated Ambient Light Beam Sweep Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated Blue Particle / Light Orb */}
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-blue-500/15 blur-3xl animate-pulse" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-indigo-500/10 blur-3xl" />
          
          {/* Diagonal Metallic Sheen Sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_6s_infinite]" />
        </div>

        {/* Content Layout: Left Text & CTAs, Right 3D Animated Coin Showcase */}
        <div className="relative z-10 flex items-center justify-between gap-3">
          {/* Left Column: Headlines & Badges */}
          <div className="flex-1 min-w-0 pr-1">
            {/* Law Enforcement & Veteran Tag */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-200 text-[9.5px] font-bold tracking-wider uppercase mb-2">
              <ShieldCheck className="w-3 h-3 text-blue-300" />
              <span>Veteran & LE Owned</span>
            </div>

            <h2 className="font-cinzel text-lg sm:text-xl font-extrabold tracking-tight leading-tight text-white mb-1.5">
              Create Something <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-200">
                Worth Remembering
              </span>
            </h2>

            <p className="text-[11px] text-slate-300 leading-snug line-clamp-2 mb-3">
              Precision die-struck custom challenge coins, duty badges & medals.
            </p>

            {/* Quick Badges */}
            <div className="flex items-center gap-2 text-[9.5px] text-slate-200 font-semibold">
              <span className="flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md">
                <CheckCircle2 className="w-3 h-3 text-blue-300" />
                0 Mold Fees
              </span>
              <span className="flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md">
                <CheckCircle2 className="w-3 h-3 text-blue-300" />
                Free 3D Proofs
              </span>
            </div>
          </div>

          {/* Right Column: 3D Animated Interactive Circular Coin Showcase */}
          <div
            onClick={toggleFlip}
            className="cursor-pointer flex flex-col items-center justify-center shrink-0 group"
            title="Click to flip coin face"
          >
            {/* 3D Coin Stage */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center [perspective:800px]">
              {/* Outer Blue Aura Glow Ring */}
              <div className="absolute inset-1.5 rounded-full bg-gradient-to-tr from-blue-600/35 via-indigo-500/25 to-blue-400/10 blur-md group-hover:scale-110 transition-transform pointer-events-none" />

              {/* Rotating Coin Container with CSS 3D transformation */}
              <div
                className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full transition-transform duration-700 [transform-style:preserve-3d] shadow-[0_10px_25px_rgba(0,0,0,0.6)] ${
                  isFlipped ? '[transform:rotateY(180deg)]' : isManualPause ? '' : 'animate-[coinRotate_10s_linear_infinite]'
                }`}
                style={{ borderRadius: '50%' }}
              >
                {/* Front Face (Obverse) - 100% Circular Minted Coin */}
                <div
                  className="absolute inset-0 rounded-full overflow-hidden [backface-visibility:hidden] flex items-center justify-center border border-blue-400/40 shadow-inner"
                  style={{ borderRadius: '50%', clipPath: 'circle(50% at 50% 50%)' }}
                >
                  <img
                    src="/images/official/custom-die-struck-coin-circle.png"
                    alt="Frontline Precision Die-Struck Challenge Coin Obverse"
                    className="w-full h-full object-cover rounded-full"
                    style={{ borderRadius: '50%', clipPath: 'circle(50% at 50% 50%)' }}
                  />
                  {/* Circular Specular Sheen Over Coin */}
                  <div
                    className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-60 pointer-events-none"
                    style={{ borderRadius: '50%', clipPath: 'circle(50% at 50% 50%)' }}
                  />
                </div>

                {/* Back Face (Reverse) - 100% Circular Minted Coin */}
                <div
                  className="absolute inset-0 rounded-full overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)] flex items-center justify-center border border-blue-400/40 shadow-inner"
                  style={{ borderRadius: '50%', clipPath: 'circle(50% at 50% 50%)' }}
                >
                  <img
                    src="/images/official/custom-showcase-coin-2-circle.png"
                    alt="Frontline Commemorative Challenge Coin Reverse"
                    className="w-full h-full object-cover rounded-full"
                    style={{ borderRadius: '50%', clipPath: 'circle(50% at 50% 50%)' }}
                  />
                  <div
                    className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-60 pointer-events-none"
                    style={{ borderRadius: '50%', clipPath: 'circle(50% at 50% 50%)' }}
                  />
                </div>
              </div>
            </div>

            {/* Tap to Flip Hint */}
            <div className="mt-1 flex items-center gap-1 text-[9px] font-bold text-white bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/20">
              <RotateCw className="w-2.5 h-2.5 animate-spin text-blue-300" />
              <span>Tap to Flip</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
