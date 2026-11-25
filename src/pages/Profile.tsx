import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  User,
  Building,
  Mail,
  Phone,
  ShieldCheck,
  Heart,
  FileText,
  Package,
  MapPin,
  Bell,
  HelpCircle,
  PhoneCall,
  Info,
  ChevronRight,
  Edit3,
  Check,
  Plus,
  Trash2,
  LogOut,
  ExternalLink,
} from 'lucide-react'
import { useProfile } from '@/context/ProfileContext'
import { useWishlist } from '@/context/WishlistContext'
import { useOrders } from '@/context/OrderContext'
import { useQuotes } from '@/context/QuoteContext'
import { OrderShippingAddress } from '@/types'

export const Profile: React.FC = () => {
  const navigate = useNavigate()
  const { profile, updateProfile, addAddress, removeAddress } = useProfile()
  const { savedCount } = useWishlist()
  const { orders } = useOrders()
  const { quotes } = useQuotes()

  // Modals & Accordions State
  const [showEditProfileModal, setShowEditProfileModal] = useState(false)
  const [showAddAddressModal, setShowAddAddressModal] = useState(false)
  const [showFaqModal, setShowFaqModal] = useState(false)
  const [showAboutModal, setShowAboutModal] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [showLegalModal, setShowLegalModal] = useState<'privacy' | 'terms' | null>(null)

  // Edit Profile Form State
  const [editName, setEditName] = useState(profile.fullName)
  const [editEmail, setEditEmail] = useState(profile.email)
  const [editPhone, setEditPhone] = useState(profile.phone)
  const [editOrg, setEditOrg] = useState(profile.organizationName)
  const [editDept, setEditDept] = useState(profile.department)

  // New Address Form State
  const [newAddr, setNewAddr] = useState<OrderShippingAddress>({
    fullName: profile.fullName,
    email: profile.email,
    phone: profile.phone,
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: 'MD',
    zipCode: '',
    country: 'United States',
  })

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile({
      fullName: editName,
      email: editEmail,
      phone: editPhone,
      organizationName: editOrg,
      department: editDept,
    })
    setShowEditProfileModal(false)
  }

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newAddr.addressLine1 || !newAddr.city || !newAddr.zipCode) return
    addAddress(newAddr)
    setShowAddAddressModal(false)
    setNewAddr({
      fullName: profile.fullName,
      email: profile.email,
      phone: profile.phone,
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: 'MD',
      zipCode: '',
      country: 'United States',
    })
  }

  const handleResetSession = () => {
    if (window.confirm('Reset prototype demo session? This will reload initial mock data.')) {
      localStorage.clear()
      window.location.reload()
    }
  }

  return (
    <div className="w-full flex-1 flex flex-col bg-[#f8fafc] overflow-y-auto no-scrollbar pb-28 pt-3 px-4 space-y-4">
      {/* Quick Hub Navigation Cards */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => navigate('/saved')}
          className="bg-white rounded-2xl p-3 border border-slate-200/90 shadow-xs hover:border-blue-600 transition-all flex flex-col items-center text-center active:scale-95"
        >
          <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mb-1">
            <Heart className="w-4 h-4 fill-rose-500" />
          </div>
          <span className="text-[11px] font-bold text-slate-900">Saved Items</span>
          <span className="text-[9px] text-slate-400 font-semibold">{savedCount} items</span>
        </button>

        <button
          onClick={() => navigate('/orders')}
          className="bg-white rounded-2xl p-3 border border-slate-200/90 shadow-xs hover:border-blue-600 transition-all flex flex-col items-center text-center active:scale-95"
        >
          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-1">
            <FileText className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold text-slate-900">Quotations</span>
          <span className="text-[9px] text-slate-400 font-semibold">{quotes.length} quotes</span>
        </button>

        <button
          onClick={() => navigate('/orders')}
          className="bg-white rounded-2xl p-3 border border-slate-200/90 shadow-xs hover:border-blue-600 transition-all flex flex-col items-center text-center active:scale-95"
        >
          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-1">
            <Package className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold text-slate-900">Orders</span>
          <span className="text-[9px] text-slate-400 font-semibold">{orders.length} orders</span>
        </button>
      </div>

      {/* Organization & Agency Credentials */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="font-cinzel text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-blue-600" />
            Organization & Verification
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-300">
              Verified
            </span>
            <button
              onClick={() => setShowEditProfileModal(true)}
              className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-0.5"
              title="Edit Details"
            >
              <Edit3 className="w-3 h-3" />
              Edit
            </button>
          </div>
        </div>

          <div className="text-xs space-y-1.5 divide-y divide-slate-100 text-slate-700">
            <div className="pt-1 flex justify-between">
              <span className="text-slate-500">Agency / Company</span>
              <span className="font-semibold text-slate-900">{profile.organizationName}</span>
            </div>
            <div className="pt-1.5 flex justify-between">
              <span className="text-slate-500">Sub-Division / Unit</span>
              <span className="font-semibold text-slate-900">{profile.department}</span>
            </div>
            <div className="pt-1.5 flex justify-between">
              <span className="text-slate-500">Official Contact</span>
              <span className="font-semibold text-slate-900">{profile.email}</span>
            </div>
            <div className="pt-1.5 flex justify-between">
              <span className="text-slate-500">Phone Number</span>
              <span className="font-semibold text-slate-900">{profile.phone}</span>
            </div>
          </div>
        </div>

        {/* Saved Addresses Section */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-cinzel text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              Saved Delivery Addresses
            </h3>
            <button
              onClick={() => setShowAddAddressModal(true)}
              className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-0.5"
            >
              <Plus className="w-3 h-3" />
              Add New
            </button>
          </div>

          <div className="space-y-2">
            {profile.savedAddresses.map((addr, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-xl p-3 border border-slate-200 flex items-start justify-between text-xs gap-2"
              >
                <div>
                  <span className="font-bold text-slate-900 block font-cinzel">
                    {addr.fullName}
                  </span>
                  <p className="text-slate-600 mt-0.5">{addr.addressLine1}</p>
                  {addr.addressLine2 && <p className="text-slate-600">{addr.addressLine2}</p>}
                  <p className="text-slate-600">
                    {addr.city}, {addr.state} {addr.zipCode}
                  </p>
                </div>
                {profile.savedAddresses.length > 1 && (
                  <button
                    onClick={() => removeAddress(idx)}
                    className="p-1 text-slate-400 hover:text-rose-500"
                    title="Remove address"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Company & Support Actions */}
        <div className="bg-white rounded-2xl border border-slate-200/90 divide-y divide-slate-100 overflow-hidden shadow-xs text-xs">
          <button
            onClick={() => setShowFaqModal(true)}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-2.5">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-slate-800">
                Frequently Asked Questions (FAQ)
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => setShowAboutModal(true)}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-slate-800">
                About Frontline Coins USA
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => setShowContactModal(true)}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-2.5">
              <PhoneCall className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-slate-800">
                Contact Design Studio (Maryland, USA)
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => setShowLegalModal('privacy')}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-2.5">
              <Info className="w-4 h-4 text-slate-400" />
              <span className="font-semibold text-slate-700">Privacy Policy</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => setShowLegalModal('terms')}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-2.5">
              <Info className="w-4 h-4 text-slate-400" />
              <span className="font-semibold text-slate-700">Terms & Conditions</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Demo Session Reset / Logout Button */}
        <div className="pt-2">
          <button
            onClick={handleResetSession}
            className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4 text-slate-500" />
            <span>Reset Demo Prototype Session</span>
          </button>
        </div>

      {/* Edit Profile Modal */}
      {showEditProfileModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="font-cinzel text-sm font-bold text-slate-900">
                Edit Officer / Customer Profile
              </h4>
              <button
                onClick={() => setShowEditProfileModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-2.5 text-xs">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-0.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-0.5">
                  Email
                </label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-0.5">
                  Phone
                </label>
                <input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-0.5">
                  Organization / Agency
                </label>
                <input
                  type="text"
                  value={editOrg}
                  onChange={(e) => setEditOrg(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-0.5">
                  Department / Squad
                </label>
                <input
                  type="text"
                  value={editDept}
                  onChange={(e) => setEditDept(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditProfileModal(false)}
                  className="flex-1 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-[#162758] text-white font-bold"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Address Modal */}
      {showAddAddressModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="font-cinzel text-sm font-bold text-slate-900">
                Add Shipping Address
              </h4>
              <button
                onClick={() => setShowAddAddressModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveAddress} className="space-y-2.5 text-xs">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-0.5">
                  Street Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 100 Main St"
                  value={newAddr.addressLine1}
                  onChange={(e) => setNewAddr((p) => ({ ...p, addressLine1: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-0.5">
                  Suite / Unit / Room
                </label>
                <input
                  type="text"
                  placeholder="e.g. Station 4, Rm 102"
                  value={newAddr.addressLine2 || ''}
                  onChange={(e) => setNewAddr((p) => ({ ...p, addressLine2: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-0.5">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={newAddr.city}
                    onChange={(e) => setNewAddr((p) => ({ ...p, city: e.target.value }))}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-0.5">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    value={newAddr.state}
                    onChange={(e) => setNewAddr((p) => ({ ...p, state: e.target.value }))}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-0.5">
                    ZIP *
                  </label>
                  <input
                    type="text"
                    required
                    value={newAddr.zipCode}
                    onChange={(e) => setNewAddr((p) => ({ ...p, zipCode: e.target.value }))}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddAddressModal(false)}
                  className="flex-1 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-[#162758] text-white font-bold"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FAQ Modal */}
      {showFaqModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl max-h-[85vh] overflow-y-auto space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="font-cinzel text-xs font-bold text-slate-900">
                Frequently Asked Questions
              </h4>
              <button onClick={() => setShowFaqModal(false)} className="text-slate-400">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div>
                <strong className="text-slate-900 block font-cinzel text-[11px]">
                  Q: Are mold fees really $0?
                </strong>
                <p className="text-slate-600 mt-0.5 leading-relaxed text-[11px]">
                  Yes! Frontline Coins USA guarantees 0 mold fees and 0 die setup charges on all custom challenge coins, badges, and promotional items.
                </p>
              </div>

              <div>
                <strong className="text-slate-900 block font-cinzel text-[11px]">
                  Q: What if our department needs artwork revisions?
                </strong>
                <p className="text-slate-600 mt-0.5 leading-relaxed text-[11px]">
                  We provide unlimited free digital 3D proof revisions. You only approve production when every seal, motto, and color is 100% verified.
                </p>
              </div>

              <div>
                <strong className="text-slate-900 block font-cinzel text-[11px]">
                  Q: Can we send a rough sketch or cellphone photo?
                </strong>
                <p className="text-slate-600 mt-0.5 leading-relaxed text-[11px]">
                  Absolutely. Over 70% of our projects begin with a simple hand drawing or a photograph of a patch. Our master graphic artists turn it into a 3D digital proof.
                </p>
              </div>

              <div>
                <strong className="text-slate-900 block font-cinzel text-[11px]">
                  Q: What is the typical turnaround time?
                </strong>
                <p className="text-slate-600 mt-0.5 leading-relaxed text-[11px]">
                  Standard custom production is 12 to 16 business days following design approval. Rush 8-day turnarounds are available for retirement ceremonies or fallen officer memorials.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowFaqModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#0a1128] text-white font-bold text-xs"
            >
              Close FAQ
            </button>
          </div>
        </div>
      )}

      {/* About Company Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="font-cinzel text-xs font-bold text-slate-900">
                About Frontline Coins USA
              </h4>
              <button onClick={() => setShowAboutModal(false)} className="text-slate-400">
                ✕
              </button>
            </div>

            <div className="text-xs text-slate-700 space-y-2 leading-relaxed">
              <p>
                <strong>Frontline Coins USA</strong> is a proud law enforcement-owned and operated manufacturer founded in Glyndon, Maryland.
              </p>
              <p>
                Our mission is to provide fellow first responders, police squads, firefighters, military units, and patriotic organizations with museum-grade metal craftsmanship that honors sacrifice and celebrates brotherhood.
              </p>
              <p>
                Unlike generic novelty suppliers, we treat every badge seal, crest, and commemorative coin with the reverence and precision it deserves.
              </p>
            </div>

            <button
              onClick={() => setShowAboutModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#0a1128] text-white font-bold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Contact Studio Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="font-cinzel text-xs font-bold text-slate-900">
                Contact Frontline Coins USA
              </h4>
              <button onClick={() => setShowContactModal(false)} className="text-slate-400">
                ✕
              </button>
            </div>

            <div className="text-xs text-slate-700 space-y-2.5">
              <div>
                <strong className="block text-slate-900 font-cinzel">Studio Headquarters</strong>
                <p className="text-slate-600">Glyndon, Maryland, United States</p>
              </div>

              <div>
                <strong className="block text-slate-900 font-cinzel">Direct Customer Line</strong>
                <p className="text-slate-600">(410) 555-COIN (Toll-Free)</p>
                <p className="text-slate-400 text-[10px]">Mon-Fri 8:00 AM – 6:00 PM EST</p>
              </div>

              <div>
                <strong className="block text-slate-900 font-cinzel">Design & Proof Department</strong>
                <p className="text-slate-600">artwork@frontlinecoinsusa.com</p>
              </div>
            </div>

            <button
              onClick={() => setShowContactModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#0a1128] text-white font-bold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Privacy / Terms Modal */}
      {showLegalModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="font-cinzel text-xs font-bold text-slate-900">
                {showLegalModal === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
              </h4>
              <button onClick={() => setShowLegalModal(null)} className="text-slate-400">
                ✕
              </button>
            </div>

            <div className="text-xs text-slate-600 leading-relaxed space-y-2 max-h-60 overflow-y-auto">
              <p>
                Frontline Coins USA respects the operational confidentiality of police departments, tactical units, and military teams.
              </p>
              <p>
                Custom artwork, department seals, officer roster numbers, and reference sketches submitted through this portal are treated as proprietary property and are never shared or resold to third parties without express written authorization.
              </p>
              <p className="text-[10px] text-slate-400">
                Prototype demonstration notice: This application is an interactive frontend simulation.
              </p>
            </div>

            <button
              onClick={() => setShowLegalModal(null)}
              className="w-full py-2.5 rounded-xl bg-[#0a1128] text-white font-bold text-xs"
            >
              Acknowledge
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
