import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  Coins,
  Shield,
  Compass,
  Award,
  Layers,
  Key,
  Sparkles,
  CircleDot,
  Upload,
  Check,
  ChevronRight,
  ChevronLeft,
  Trash2,
  FileText,
  Image,
  AlertCircle,
  ShieldCheck,
  Calendar,
  Building,
  User,
  Mail,
  Phone,
  HelpCircle,
} from 'lucide-react'
import {
  CustomProductType,
  CustomerType,
  CustomSpecifications,
  OrganizationDetails,
  UploadedArtwork,
} from '@/types'
import { useQuotes } from '@/context/QuoteContext'
import { useProfile } from '@/context/ProfileContext'
import { useNotification } from '@/context/NotificationContext'
import { CoinArt } from '@/utils/productImages'

interface ProductOption {
  type: CustomProductType
  name: string
  desc: string
  icon: React.ElementType
  badge?: string
}

const productTypeOptions: ProductOption[] = [
  {
    type: 'challenge-coin',
    name: 'Custom Challenge Coin',
    desc: 'Solid brass 3D relief, dual-plating & precision cut edges',
    icon: Coins,
    badge: 'Most Popular',
  },
  {
    type: 'badge',
    name: 'Duty & Security Badge',
    desc: 'Official police, fire, sheriff & federal chest badges',
    icon: Shield,
    badge: 'Duty Grade',
  },
  {
    type: 'trail-badge',
    name: 'Trail & Hiking Badge',
    desc: 'Curved medallions with brad nails for hiking staves',
    icon: Compass,
  },
  {
    type: 'lapel-pin',
    name: 'Lapel Pin & Insignia',
    desc: 'Hard enamel cloisonne, soft enamel & die-struck metal',
    icon: Award,
  },
  {
    type: 'medal',
    name: 'Commemorative Medal',
    desc: 'Presentation awards, retirement medals & neck ribbons',
    icon: Sparkles,
  },
  {
    type: 'patch',
    name: 'Tactical Patch & PVC',
    desc: '3D all-weather PVC rubber & embroidered morale patches',
    icon: Layers,
  },
  {
    type: 'keychain',
    name: 'Metal Coin Keychain',
    desc: 'Double-sided embossed spinner medallions & key tags',
    icon: Key,
  },
  {
    type: 'bottle-opener',
    name: 'Tactical Bottle Opener',
    desc: 'Heavy cast metal coins with functional notched openers',
    icon: Sparkles,
  },
  {
    type: 'poker-chip',
    name: 'Custom Poker Chip',
    desc: 'Heavy 14g clay ceramic chips with full-bleed sublimation',
    icon: CircleDot,
  },
]

export const CustomBuilder: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { submitQuoteRequest } = useQuotes()
  const { profile } = useProfile()
  const { addNotification } = useNotification()

  // Current Step: 1 (Select), 2 (Specs), 3 (Org & Project), 4 (Artwork), 5 (Review & Submit), 6 (Success)
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [createdQuoteId, setCreatedQuoteId] = useState<string | null>(null)

  // Step 1: Selected Product Type
  const initialType = (searchParams.get('productType') as CustomProductType) || 'challenge-coin'
  const [selectedProductType, setSelectedProductType] = useState<CustomProductType>(initialType)

  // Step 2: Dynamic Specifications State
  const [specs, setSpecs] = useState<CustomSpecifications>({
    shape: 'Round with Rope Cut Edge',
    size: '2.0 inch (50.8mm)',
    thickness: '4.0 mm Heavy Gauge',
    metalFinish: 'Dual Plating (Antique Gold & Polished Silver)',
    enamelType: 'Hard Enamel (Cloisonne)',
    edgeStyle: 'Diamond Cross Cut',
    badgeStyle: '7-Point Star with Eagle Finial',
    badgeBacking: 'Heavy Duty Vertical Pin & Joint',
    ribbonStyle: 'Draped V-Neck Grosgrain Ribbon (Red, White & Blue)',
    pinAttachment: 'Dual Military Rubber Clutch',
    patchType: '3D Injection Molded Soft PVC (All-Weather)',
    patchBacking: 'Velcro Brand Hook Backing (With Loop Sheet)',
    frontDesignInstructions: '',
    backDesignInstructions: '',
  })

  // Step 3: Organization & Project Details State
  const [orgDetails, setOrgDetails] = useState<OrganizationDetails>({
    customerName: profile?.fullName || 'Customer Representative',
    email: profile?.email || 'orders@frontlinecoinsusa.com',
    phone: profile?.phone || '(410) 555-0194',
    organizationName: profile?.organizationName || 'Department / Agency Services',
    department: profile?.department || 'Operations & Procurement Division',
    customerType: profile?.customerType || 'police',
    projectName: 'Unit Commemorative Insignia Batch',
    intendedUse: 'Patrol squad recognition, annual awards & retirement gifts',
    quantity: 100,
    desiredDeliveryDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    additionalInstructions: '',
  })

  // Step 4: Artwork & Reference Files State
  const [uploadedArtwork, setUploadedArtwork] = useState<UploadedArtwork[]>([
    {
      id: 'mock-sample-art-1',
      name: 'Department_Patch_Ref.png',
      sizeMb: 2.1,
      type: 'image/png',
      previewUrl: CoinArt.valorEagle.front,
      category: 'badge',
      uploadedAt: new Date().toISOString().split('T')[0],
    },
  ])
  const [additionalArtNotes, setAdditionalArtNotes] = useState<string>('')

  // Pre-fill if url parameters change
  useEffect(() => {
    const pType = searchParams.get('productType') as CustomProductType
    if (pType && productTypeOptions.some((p) => p.type === pType)) {
      setSelectedProductType(pType)
    }
  }, [searchParams])

  // Helper to add mock artwork files for quick testing in prototype
  const handleSimulatedFileUpload = (category: UploadedArtwork['category'], name: string, previewUrl: string) => {
    const newArt: UploadedArtwork = {
      id: `art-${Date.now()}`,
      name,
      sizeMb: 1.8,
      type: 'image/png',
      previewUrl,
      category,
      uploadedAt: new Date().toISOString().split('T')[0],
    }
    setUploadedArtwork((prev) => [...prev, newArt])
  }

  const handleRemoveArtwork = (artId: string) => {
    setUploadedArtwork((prev) => prev.filter((a) => a.id !== artId))
  }

  // Handle final quote submission
  const handleSubmitQuote = () => {
    const selectedObj = productTypeOptions.find((p) => p.type === selectedProductType)
    const typeTitle = selectedObj?.name || 'Custom Product'

    const newQuote = submitQuoteRequest({
      productType: selectedProductType,
      productTypeName: typeTitle,
      productTitle: `${orgDetails.organizationName || 'Custom'} - ${typeTitle}`,
      organization: {
        ...orgDetails,
        additionalInstructions: additionalArtNotes
          ? `${orgDetails.additionalInstructions}\nArtwork Notes: ${additionalArtNotes}`
          : orgDetails.additionalInstructions,
      },
      specifications: specs,
      artwork: uploadedArtwork,
    })

    setCreatedQuoteId(newQuote.id)
    setCurrentStep(6) // Success screen

    addNotification({
      title: 'Quote Request Submitted!',
      message: `Your request #${newQuote.id} for "${newQuote.productTitle}" has been received. Our Maryland design team will prepare your 3D digital proof.`,
      type: 'quote',
      targetPath: `/quote/${newQuote.id}`,
      badgeLabel: 'New Quote',
    })
  }

  return (
    <div className="w-full flex-1 flex flex-col bg-[#f8fafc] overflow-y-auto no-scrollbar pb-6">
      {/* Sticky Progress Header */}
      <div className="sticky top-0 z-30 bg-gradient-to-r from-[#162758] via-[#1d3c8c] to-[#183274] text-white px-3.5 py-3 border-b border-blue-950/60 shadow-md">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-white text-[#162758] text-[10px] font-extrabold flex items-center justify-center">
              {currentStep > 5 ? 5 : currentStep}
            </span>
            <h2 className="font-cinzel text-xs font-bold text-white tracking-wider">
              {currentStep === 1 && 'Step 1: Select Product Type'}
              {currentStep === 2 && 'Step 2: Manufacturing Requirements'}
              {currentStep === 3 && 'Step 3: Organization & Project'}
              {currentStep === 4 && 'Step 4: Upload Artwork & Sketches'}
              {currentStep === 5 && 'Step 5: Review & Submit Quote'}
              {currentStep === 6 && 'Quotation Request Confirmed!'}
            </h2>
          </div>
          <span className="text-[10px] text-blue-200 font-mono">
            {currentStep <= 5 ? `${currentStep} of 5` : 'Complete'}
          </span>
        </div>

        {/* 5-Segment Progress Bar */}
        <div className="grid grid-cols-5 gap-1.5 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-300 ${currentStep >= 1 ? 'bg-blue-400' : 'bg-transparent'}`} />
          <div className={`h-full rounded-full transition-all duration-300 ${currentStep >= 2 ? 'bg-blue-400' : 'bg-transparent'}`} />
          <div className={`h-full rounded-full transition-all duration-300 ${currentStep >= 3 ? 'bg-blue-400' : 'bg-transparent'}`} />
          <div className={`h-full rounded-full transition-all duration-300 ${currentStep >= 4 ? 'bg-blue-400' : 'bg-transparent'}`} />
          <div className={`h-full rounded-full transition-all duration-300 ${currentStep >= 5 ? 'bg-blue-400' : 'bg-transparent'}`} />
        </div>
      </div>

      {/* Main Wizard Step Content */}
      <div className="px-3.5 py-4 flex-1">
        {/* ================= STEP 1: SELECT PRODUCT TYPE ================= */}
        {currentStep === 1 && (
          <div className="space-y-3">
            <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs">
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
                0 Mold Fees Guaranteed
              </span>
              <h3 className="font-cinzel text-sm font-bold text-slate-900 mt-0.5">
                What custom product would you like to create?
              </h3>
              <p className="text-[11px] text-slate-500 mt-1">
                Select your product category below. Our master die engravers specialize in law enforcement, military, and corporate custom minting.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {productTypeOptions.map((opt) => {
                const Icon = opt.icon
                const isSelected = selectedProductType === opt.type
                return (
                  <div
                    key={opt.type}
                    onClick={() => setSelectedProductType(opt.type)}
                    className={`cursor-pointer rounded-2xl p-3 border transition-all flex items-center justify-between gap-3 group active:scale-[0.99] ${
                      isSelected
                        ? 'border-[#0a1128] bg-gradient-to-r from-[#0a1128] to-[#121f45] text-white shadow-md'
                        : 'border-slate-200 bg-white text-slate-900 hover:border-blue-600'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-[#162758] text-white shadow-sm'
                            : 'bg-slate-100 text-[#0a1128] group-hover:bg-blue-50'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-cinzel text-xs font-bold truncate">
                            {opt.name}
                          </h4>
                          {opt.badge && (
                            <span
                              className={`text-[8px] font-bold px-1.5 py-0.2 rounded uppercase ${
                                isSelected
                                  ? 'bg-[#162758] text-white'
                                  : 'bg-blue-50 text-blue-900'
                              }`}
                            >
                              {opt.badge}
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-[10px] line-clamp-1 mt-0.5 ${
                            isSelected ? 'text-slate-300' : 'text-slate-500'
                          }`}
                        >
                          {opt.desc}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-blue-600 bg-[#162758] text-white'
                          : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ================= STEP 2: REQUIREMENTS CONFIGURATION ================= */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs">
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
                Configuring: {productTypeOptions.find((p) => p.type === selectedProductType)?.name}
              </span>
              <h3 className="font-cinzel text-sm font-bold text-slate-900 mt-0.5">
                Define Your Product Specifications
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Choose illustrative prototype specifications. Our design team will refine and match exact dimensions on your free 3D digital proof.
              </p>
            </div>

            {/* A. Challenge Coin Specific Options */}
            {selectedProductType === 'challenge-coin' && (
              <div className="space-y-3.5">
                {/* Shape Selection */}
                <div className="bg-white rounded-2xl p-3 border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-slate-900 block font-cinzel">
                    1. Coin Shape
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {[
                      'Round Classic',
                      'Shield Crest',
                      'Custom Die-Cut',
                      'Cross of St. Michael',
                      'Square Diamond',
                      'Dog Tag Silhouette',
                    ].map((shape) => (
                      <button
                        key={shape}
                        onClick={() => setSpecs((s) => ({ ...s, shape }))}
                        className={`py-2 px-1 rounded-xl text-[11px] font-semibold border text-center transition-all ${
                          specs.shape === shape
                            ? 'bg-[#162758] text-white border-[#0a1128] shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {shape}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Coin Diameter / Size */}
                <div className="bg-white rounded-2xl p-3 border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-slate-900 block font-cinzel">
                    2. Diameter / Size
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      '1.75 inch (44mm)',
                      '2.0 inch (51mm) - Popular',
                      '2.25 inch (57mm)',
                      '2.5 inch (64mm)',
                      '3.0 inch (76mm) - Large',
                      'Custom Size',
                    ].map((size) => (
                      <button
                        key={size}
                        onClick={() => setSpecs((s) => ({ ...s, size }))}
                        className={`py-2 px-1 rounded-xl text-[10px] font-semibold border text-center transition-all ${
                          specs.size === size
                            ? 'bg-[#162758] text-white border-[#0a1128] shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Thickness */}
                <div className="bg-white rounded-2xl p-3 border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-slate-900 block font-cinzel">
                    3. Coin Thickness
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      '3.0 mm (Standard)',
                      '3.5 mm (Mid Gauge)',
                      '4.0 mm (Heavy Duty)',
                      '4.5 mm (Extra Heavy)',
                      '5.0 mm (Supreme)',
                    ].map((thk) => (
                      <button
                        key={thk}
                        onClick={() => setSpecs((s) => ({ ...s, thickness: thk }))}
                        className={`py-2 px-1 rounded-xl text-[10px] font-semibold border text-center transition-all ${
                          specs.thickness === thk
                            ? 'bg-[#162758] text-white border-[#0a1128] shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {thk}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Plating & Metal Finish */}
                <div className="bg-white rounded-2xl p-3 border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-slate-900 block font-cinzel">
                    4. Metal Finish & Plating
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      'Antique Gold',
                      'Polished Gold',
                      'Antique Silver',
                      'Polished Nickel / Silver',
                      'Dual Plating (Antique Gold + Silver)',
                      'Antique Bronze',
                      'Black Nickel (Subdued)',
                      'Antique Copper',
                    ].map((metal) => (
                      <button
                        key={metal}
                        onClick={() => setSpecs((s) => ({ ...s, metalFinish: metal }))}
                        className={`py-2 px-2.5 rounded-xl text-[11px] font-semibold border text-left transition-all flex items-center justify-between ${
                          specs.metalFinish === metal
                            ? 'bg-[#162758] text-white border-[#0a1128] shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span className="truncate">{metal}</span>
                        {specs.metalFinish === metal && <Check className="w-3.5 h-3.5 text-white" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Edge Style */}
                <div className="bg-white rounded-2xl p-3 border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-slate-900 block font-cinzel">
                    5. Custom Edge Style
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      'Diamond Cross Cut',
                      'Rope Cut Contour',
                      'Wave Cut Edge',
                      'Reeded Coin Edge',
                      'Spiral Bevel',
                      'Smooth Flat Edge',
                    ].map((edge) => (
                      <button
                        key={edge}
                        onClick={() => setSpecs((s) => ({ ...s, edgeStyle: edge }))}
                        className={`py-2 px-1 rounded-xl text-[10px] font-semibold border text-center transition-all ${
                          specs.edgeStyle === edge
                            ? 'bg-[#162758] text-white border-[#0a1128] shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {edge}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* B. Duty Badge Specific Options */}
            {selectedProductType === 'badge' && (
              <div className="space-y-3.5">
                <div className="bg-white rounded-2xl p-3 border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-slate-900 block font-cinzel">
                    Badge Silhouette Style
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      '7-Point Star with Eagle Finial',
                      'Shield with Eagle Top',
                      '5-Point Star in Circle',
                      'State Police Sunburst Crest',
                    ].map((bStyle) => (
                      <button
                        key={bStyle}
                        onClick={() => setSpecs((s) => ({ ...s, badgeStyle: bStyle }))}
                        className={`py-2.5 px-2 rounded-xl text-[11px] font-semibold border text-left transition-all ${
                          specs.badgeStyle === bStyle
                            ? 'bg-[#162758] text-white border-[#0a1128] shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {bStyle}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-3 border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-slate-900 block font-cinzel">
                    Backing & Attachment
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      'Vertical Pin & Joint',
                      'Heavy Duty Wallet Clip',
                      'Screw Post & Nut',
                    ].map((backing) => (
                      <button
                        key={backing}
                        onClick={() => setSpecs((s) => ({ ...s, badgeBacking: backing }))}
                        className={`py-2 px-1 rounded-xl text-[10px] font-semibold border text-center transition-all ${
                          specs.badgeBacking === backing
                            ? 'bg-[#162758] text-white border-[#0a1128] shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {backing}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-3 border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-slate-900 block font-cinzel">
                    Metal Finish
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['24K Polished Gold', 'Rhodium Polished Silver', 'Two-Tone Gold & Silver', 'Black Nickel Subdued'].map((finish) => (
                      <button
                        key={finish}
                        onClick={() => setSpecs((s) => ({ ...s, metalFinish: finish }))}
                        className={`py-2 px-2 rounded-xl text-[11px] font-semibold border text-left transition-all ${
                          specs.metalFinish === finish
                            ? 'bg-[#162758] text-white border-[#0a1128]'
                            : 'bg-white text-slate-700 border-slate-200'
                        }`}
                      >
                        {finish}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* C. Tactical Patch Options */}
            {selectedProductType === 'patch' && (
              <div className="space-y-3.5">
                <div className="bg-white rounded-2xl p-3 border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-slate-900 block font-cinzel">
                    Patch Construction Type
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      '3D Injection Molded Soft PVC (All-Weather)',
                      '100% Full Tactical Embroidery',
                      '50% Standard Twill Embroidery',
                      'Laser-Cut Cordura with IR Film',
                    ].map((pt) => (
                      <button
                        key={pt}
                        onClick={() => setSpecs((s) => ({ ...s, patchType: pt }))}
                        className={`py-2.5 px-2 rounded-xl text-[11px] font-semibold border text-left transition-all ${
                          specs.patchType === pt
                            ? 'bg-[#162758] text-white border-[#0a1128] shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {pt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-3 border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-slate-900 block font-cinzel">
                    Backing Attachment
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'Velcro Hook Backing (Includes Loop Sheet)',
                      'Iron-On Heat Seal Backing',
                      'Peel-and-Stick Heavy Adhesive',
                      'Plain Sew-On Border',
                    ].map((bk) => (
                      <button
                        key={bk}
                        onClick={() => setSpecs((s) => ({ ...s, patchBacking: bk }))}
                        className={`py-2 px-2 rounded-xl text-[10px] font-semibold border text-left transition-all ${
                          specs.patchBacking === bk
                            ? 'bg-[#162758] text-white border-[#0a1128]'
                            : 'bg-white text-slate-700 border-slate-200'
                        }`}
                      >
                        {bk}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* D. Lapel Pin Options */}
            {selectedProductType === 'lapel-pin' && (
              <div className="space-y-3.5">
                <div className="bg-white rounded-2xl p-3 border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-slate-900 block font-cinzel">
                    Enamel & Manufacturing Process
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      'Genuine Cloisonne Hard Enamel',
                      'Soft Enamel with Epoxy Dome',
                      'Die-Struck Antique Relief (No Color)',
                      '3D Molded Relief',
                    ].map((en) => (
                      <button
                        key={en}
                        onClick={() => setSpecs((s) => ({ ...s, enamelType: en }))}
                        className={`py-2 px-2 rounded-xl text-[11px] font-semibold border text-left transition-all ${
                          specs.enamelType === en
                            ? 'bg-[#162758] text-white border-[#0a1128]'
                            : 'bg-white text-slate-700 border-slate-200'
                        }`}
                      >
                        {en}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-3 border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-slate-900 block font-cinzel">
                    Backing Attachment Clutch
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'Dual Military Rubber Clutches',
                      'Dual Butterfly Metal Clutches',
                      'Magnetic Uniform Backing',
                      'Deluxe Locking Flathead Clutches',
                    ].map((att) => (
                      <button
                        key={att}
                        onClick={() => setSpecs((s) => ({ ...s, pinAttachment: att }))}
                        className={`py-2 px-2 rounded-xl text-[10px] font-semibold border text-left transition-all ${
                          specs.pinAttachment === att
                            ? 'bg-[#162758] text-white border-[#0a1128]'
                            : 'bg-white text-slate-700 border-slate-200'
                        }`}
                      >
                        {att}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* E. Commemorative Medal Options */}
            {selectedProductType === 'medal' && (
              <div className="space-y-3.5">
                <div className="bg-white rounded-2xl p-3 border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-slate-900 block font-cinzel">
                    Ribbon Attachment Style
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      'Draped V-Neck Grosgrain Ribbon (Red, White, Blue)',
                      'Standard Ribbon Bar with Pin Clasp',
                      'Custom Sublimated Department Ribbon',
                      'Medal Only (With Jump Ring)',
                    ].map((rib) => (
                      <button
                        key={rib}
                        onClick={() => setSpecs((s) => ({ ...s, ribbonStyle: rib }))}
                        className={`py-2.5 px-2 rounded-xl text-[11px] font-semibold border text-left transition-all ${
                          specs.ribbonStyle === rib
                            ? 'bg-[#162758] text-white border-[#0a1128]'
                            : 'bg-white text-slate-700 border-slate-200'
                        }`}
                      >
                        {rib}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Front & Reverse Custom Notes */}
            <div className="bg-white rounded-2xl p-3 border border-slate-200 space-y-2">
              <label className="text-xs font-bold text-slate-900 block font-cinzel">
                Design Concept Instructions
              </label>
              <textarea
                value={specs.frontDesignInstructions || ''}
                onChange={(e) =>
                  setSpecs((s) => ({ ...s, frontDesignInstructions: e.target.value }))
                }
                rows={3}
                placeholder="Describe your design idea, required text, department mottos, dates, or symbols (e.g. 'Front: Police badge shield with 2026 centennial dates. Back: St. Michael protect us')..."
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#162758]"
              />
            </div>
          </div>
        )}

        {/* ================= STEP 3: ORGANIZATION & PROJECT ================= */}
        {currentStep === 3 && (
          <div className="space-y-3.5">
            <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs">
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
                Quote Recipient
              </span>
              <h3 className="font-cinzel text-sm font-bold text-slate-900 mt-0.5">
                Organization & Project Information
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Used to prepare your official departmental quote and tax-exempt verification.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-3.5 border border-slate-200 space-y-3">
              {/* Customer Type Selector */}
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1.5 font-cinzel">
                  Customer / Organization Type
                </label>
                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  {[
                    { id: 'police', label: 'Police / Law Enf.' },
                    { id: 'fire', label: 'Fire & Rescue' },
                    { id: 'ems', label: 'EMS / Paramedic' },
                    { id: 'military', label: 'Military Group' },
                    { id: 'nonprofit', label: 'Nonprofit / Union' },
                    { id: 'business', label: 'Business / Corp' },
                    { id: 'school', label: 'School / Club' },
                    { id: 'individual', label: 'Individual' },
                    { id: 'other', label: 'Other' },
                  ].map((ct) => (
                    <button
                      key={ct.id}
                      type="button"
                      onClick={() =>
                        setOrgDetails((prev) => ({
                          ...prev,
                          customerType: ct.id as CustomerType,
                        }))
                      }
                      className={`py-1.5 px-1 rounded-xl text-[10px] font-semibold border text-center transition-all ${
                        orgDetails.customerType === ct.id
                          ? 'bg-[#162758] text-white border-[#0a1128] shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {ct.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Organization & Department Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Organization / Agency Name *
                  </label>
                  <div className="relative">
                    <Building className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={orgDetails.organizationName}
                      onChange={(e) =>
                        setOrgDetails((p) => ({ ...p, organizationName: e.target.value }))
                      }
                      placeholder="e.g. Baltimore County Police Dept"
                      className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#162758]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Department / Squad / Unit
                  </label>
                  <input
                    type="text"
                    value={orgDetails.department}
                    onChange={(e) =>
                      setOrgDetails((p) => ({ ...p, department: e.target.value }))
                    }
                    placeholder="e.g. K-9 Unit, Station 14, Troop A"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#162758]"
                  />
                </div>
              </div>

              {/* Customer Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Contact Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={orgDetails.customerName}
                      onChange={(e) =>
                        setOrgDetails((p) => ({ ...p, customerName: e.target.value }))
                      }
                      placeholder="e.g. Department Coordinator / Officer"
                      className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#162758]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Official Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={orgDetails.email}
                      onChange={(e) =>
                        setOrgDetails((p) => ({ ...p, email: e.target.value }))
                      }
                      placeholder="e.g. officer@agency.gov"
                      className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#162758]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={orgDetails.phone}
                      onChange={(e) =>
                        setOrgDetails((p) => ({ ...p, phone: e.target.value }))
                      }
                      placeholder="e.g. (410) 555-0194"
                      className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#162758]"
                    />
                  </div>
                </div>
              </div>

              {/* Quantity Selector & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Required Quantity (Higher quantity = Lower unit cost)
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[50, 100, 250, 500, 1000].map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => setOrgDetails((p) => ({ ...p, quantity: q }))}
                        className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                          orgDetails.quantity === q
                            ? 'bg-[#162758] text-white border-[#0a1128]'
                            : 'bg-white text-slate-700 border-slate-200'
                        }`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Desired Delivery Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      value={orgDetails.desiredDeliveryDate}
                      onChange={(e) =>
                        setOrgDetails((p) => ({ ...p, desiredDeliveryDate: e.target.value }))
                      }
                      className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#162758]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 4: UPLOAD ARTWORK & REFERENCE ================= */}
        {currentStep === 4 && (
          <div className="space-y-3.5">
            <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs">
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
                Design Assistance
              </span>
              <h3 className="font-cinzel text-sm font-bold text-slate-900 mt-0.5">
                Upload Artwork, Sketches or Insignia
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                You do NOT need vector artwork! A rough napkin sketch, cell phone photo of an old badge, or department patch is 100% fine.
              </p>
            </div>

            {/* Upload Drop Zone Simulation */}
            <div className="bg-white rounded-2xl p-5 border-2 border-dashed border-blue-300 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#162758] text-white flex items-center justify-center mx-auto">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 font-cinzel">
                  Select Artwork or Reference Photo
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Supports PNG, JPG, PDF, AI, PSD, SVG (Max 25MB)
                </p>
              </div>

              {/* Sample files clicker for interactive prototype test */}
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[10px] font-semibold text-slate-500 block mb-2">
                  Quick Prototype Test: Click to attach sample insignia
                </span>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleSimulatedFileUpload('badge', 'Police_Patch_Scan.png', CoinArt.policeBadge.front)
                    }
                    className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] font-bold flex items-center gap-1 active:scale-95 transition-all"
                  >
                    + Police Badge Scan
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleSimulatedFileUpload('sketch', 'Rough_Unit_Sketch.jpg', CoinArt.valorEagle.back)
                    }
                    className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] font-bold flex items-center gap-1 active:scale-95 transition-all"
                  >
                    + Rough Hand Sketch
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleSimulatedFileUpload('logo', 'Fire_Maltese_Emblem.png', CoinArt.fireRescue.front)
                    }
                    className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] font-bold flex items-center gap-1 active:scale-95 transition-all"
                  >
                    + Fire Dept Emblem
                  </button>
                </div>
              </div>
            </div>

            {/* Attached Files List */}
            {uploadedArtwork.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 font-cinzel">
                  Attached Files ({uploadedArtwork.length})
                </h4>
                <div className="space-y-2">
                  {uploadedArtwork.map((art) => (
                    <div
                      key={art.id}
                      className="bg-white rounded-2xl p-2.5 border border-slate-200 shadow-xs flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-[#0a1128] p-1 flex items-center justify-center shrink-0 border border-slate-200 overflow-hidden">
                          <img
                            src={art.previewUrl}
                            alt={art.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="min-w-0">
                          <h5 className="font-bold text-xs text-slate-900 truncate">
                            {art.name}
                          </h5>
                          <p className="text-[10px] text-slate-400">
                            {art.sizeMb} MB • {art.category.toUpperCase()} • Ready for Proofing
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveArtwork(art.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors"
                        aria-label="Remove artwork"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Written Design Notes */}
            <div className="bg-white rounded-2xl p-3 border border-slate-200 space-y-1.5">
              <label className="text-xs font-bold text-slate-900 block font-cinzel">
                Additional Artwork or Engraving Notes
              </label>
              <textarea
                value={additionalArtNotes}
                onChange={(e) => setAdditionalArtNotes(e.target.value)}
                rows={2}
                placeholder="Mention any specific pantone colors, serial numbers, reverse inscriptions, or special packaging requests..."
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#162758]"
              />
            </div>
          </div>
        )}

        {/* ================= STEP 5: REVIEW & SUBMIT ================= */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs">
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
                Final Step
              </span>
              <h3 className="font-cinzel text-sm font-bold text-slate-900 mt-0.5">
                Review Custom Project Summary
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Please verify your details. No payment is required today. Our design department will prepare your personalized 3D proof.
              </p>
            </div>

            {/* Summary Card */}
            <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-xs text-xs">
              {/* Product Type */}
              <div className="p-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">
                    Product
                  </span>
                  <span className="font-bold text-slate-900 font-cinzel">
                    {productTypeOptions.find((p) => p.type === selectedProductType)?.name}
                  </span>
                </div>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-[11px] font-bold text-blue-700 hover:underline"
                >
                  Edit
                </button>
              </div>

              {/* Specifications */}
              <div className="p-3 flex items-start justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
                    Specifications
                  </span>
                  <ul className="text-[11px] text-slate-700 space-y-0.5">
                    {specs.shape && <li>• Shape: <strong>{specs.shape}</strong></li>}
                    {specs.size && <li>• Size: <strong>{specs.size}</strong></li>}
                    {specs.thickness && <li>• Thickness: <strong>{specs.thickness}</strong></li>}
                    {specs.metalFinish && <li>• Finish: <strong>{specs.metalFinish}</strong></li>}
                    {specs.edgeStyle && <li>• Edge: <strong>{specs.edgeStyle}</strong></li>}
                  </ul>
                </div>
                <button
                  onClick={() => setCurrentStep(2)}
                  className="text-[11px] font-bold text-blue-700 hover:underline"
                >
                  Edit
                </button>
              </div>

              {/* Organization & Quantity */}
              <div className="p-3 flex items-start justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
                    Organization & Order Volume
                  </span>
                  <div className="text-[11px] text-slate-700 space-y-0.5">
                    <p>• Organization: <strong>{orgDetails.organizationName}</strong></p>
                    <p>• Contact: <strong>{orgDetails.customerName}</strong> ({orgDetails.email})</p>
                    <p>• Quantity: <strong>{orgDetails.quantity} units</strong></p>
                    <p>• Target Date: <strong>{orgDetails.desiredDeliveryDate}</strong></p>
                  </div>
                </div>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="text-[11px] font-bold text-blue-700 hover:underline"
                >
                  Edit
                </button>
              </div>

              {/* Attached Files */}
              <div className="p-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">
                    Artwork Uploads
                  </span>
                  <span className="font-semibold text-slate-900">
                    {uploadedArtwork.length} files attached
                  </span>
                </div>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="text-[11px] font-bold text-blue-700 hover:underline"
                >
                  Edit
                </button>
              </div>
            </div>

            {/* Frontline Promise Banner */}
            <div className="bg-[#0a1128] rounded-2xl p-4 border border-blue-900/40 text-white space-y-2">
              <div className="flex items-center gap-2 text-white">
                <ShieldCheck className="w-5 h-5 text-white" />
                <h4 className="font-cinzel text-xs font-bold text-white tracking-wide">
                  100% Risk Free Prototype Submission
                </h4>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                $0 mold fee guaranteed. Unlimited free 3D digital revisions. You only approve and proceed once your design proof is perfect.
              </p>
            </div>
          </div>
        )}

        {/* ================= STEP 6: SUBMISSION SUCCESS SCREEN ================= */}
        {currentStep === 6 && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 text-center space-y-4 shadow-lg my-2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-700 via-indigo-500 to-blue-600 p-1 mx-auto shadow-md">
              <div className="w-full h-full rounded-full bg-[#0a1128] flex items-center justify-center">
                <Check className="w-8 h-8 text-white stroke-[3]" />
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
                Quote Request Submitted
              </span>
              <h3 className="font-cinzel text-lg font-bold text-slate-900 mt-1">
                Your Project Is in Motion!
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Quote Reference ID:
              </p>
              <div className="inline-block px-3 py-1 bg-slate-100 rounded-lg text-sm font-mono font-bold text-[#0a1128] mt-1 border border-slate-200">
                {createdQuoteId}
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
              Our master design team has received your project specifications. We have added a simulated quotation and digital 3D proof into your <strong>Orders</strong> tab!
            </p>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => navigate(`/quote/${createdQuoteId}`)}
                className="w-full py-3 rounded-2xl bg-[#162758] text-white text-xs font-bold border border-blue-900/40 active:scale-98 shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <FileText className="w-4 h-4" />
                View Quote Details & Pricing
              </button>

              <button
                onClick={() => navigate('/orders')}
                className="w-full py-3 rounded-2xl bg-white border border-slate-200 text-slate-800 text-xs font-semibold hover:bg-slate-50 active:scale-98 transition-all"
              >
                Go to Orders Tab
              </button>
            </div>
          </div>
        )}

        {/* Step Navigation Controls */}
        {currentStep <= 5 && (
          <div className="pt-4 pb-4 flex items-center gap-2.5">
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep((s) => s - 1)}
                className="py-3 px-4 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 active:scale-95 flex items-center gap-1 shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            )}

            {currentStep < 5 ? (
              <button
                onClick={() => setCurrentStep((s) => s + 1)}
                className="flex-1 py-3 px-4 rounded-xl bg-[#162758] text-white hover:bg-[#1f387d] active:scale-98 text-xs font-bold flex items-center justify-center gap-1.5 shadow-md border border-white/20 transition-all"
              >
                <span>Continue to Step {currentStep + 1}</span>
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            ) : (
              <button
                onClick={handleSubmitQuote}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#162758] via-[#1d3c8c] to-[#183274] text-white border border-white/20 hover:brightness-105 active:scale-98 text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-lg transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Submit Quote Request (0 Mold Fee)</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
