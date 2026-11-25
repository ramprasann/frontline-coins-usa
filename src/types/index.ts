export type CustomProductType =
  | 'challenge-coin'
  | 'badge'
  | 'trail-badge'
  | 'lapel-pin'
  | 'medal'
  | 'keychain'
  | 'bottle-opener'
  | 'poker-chip'
  | 'patch'

export interface ProductCategory {
  id: string
  name: string
  slug: CustomProductType
  description: string
  icon: string
  imageUrl: string
  badgeText?: string
  popularCount: string
}

export interface ProductSpecification {
  label: string
  value: string
}

export interface Product {
  id: string
  name: string
  category: CustomProductType
  categoryName: string
  demoPrice?: number
  isReadyMade: boolean
  isCustomizable: boolean
  description: string
  shortDescription: string
  images: {
    front: string
    back?: string
    detail?: string
  }
  specifications: ProductSpecification[]
  features: string[]
  finishOptions?: string[]
  sizeOptions?: string[]
  minOrderQty: number
  leadTime: string
  rating: number
  reviewCount: number
  inStock?: boolean
  badgeTag?: string
  isFeatured?: boolean
  isNewArrival?: boolean
  isPopular?: boolean
}

export interface CustomSpecifications {
  shape?: string
  size?: string
  thickness?: string
  metalFinish?: string
  enamelType?: string
  edgeStyle?: string
  badgeStyle?: string
  badgeBacking?: string
  ribbonStyle?: string
  pinAttachment?: string
  patchType?: string
  patchBacking?: string
  frontDesignInstructions?: string
  backDesignInstructions?: string
  specialFeatures?: string[]
}

export type CustomerType =
  | 'police'
  | 'fire'
  | 'ems'
  | 'military'
  | 'law_enforcement'
  | 'nonprofit'
  | 'business'
  | 'school'
  | 'individual'
  | 'other'

export interface OrganizationDetails {
  customerName: string
  email: string
  phone: string
  organizationName: string
  department: string
  customerType: CustomerType
  projectName: string
  intendedUse: string
  quantity: number
  desiredDeliveryDate: string
  additionalInstructions: string
}

export interface UploadedArtwork {
  id: string
  name: string
  sizeMb: number
  type: string
  previewUrl: string
  category: 'logo' | 'badge' | 'sketch' | 'reference' | 'patch'
  uploadedAt: string
}

export type QuoteStatus =
  | 'submitted'
  | 'under_review'
  | 'more_info_required'
  | 'quote_ready'
  | 'accepted'
  | 'rejected'
  | 'expired'

export interface QuoteRequest {
  id: string
  productType: CustomProductType
  productTypeName: string
  productTitle: string
  organization: OrganizationDetails
  specifications: CustomSpecifications
  artwork: UploadedArtwork[]
  submittedDate: string
  status: QuoteStatus
  quotedDemoAmount?: number
  unitPriceDemo?: number
  moldFeeDemo: number // Always 0 (No mold fee guaranteed)
  designFeeDemo: number // Always 0 (Free design revisions)
  estimatedProductionDays?: string
  quoteValidUntil?: string
  companyReviewerNotes?: string
  revisionCount: number
}

export interface RevisionHistoryItem {
  version: number
  date: string
  notes: string
  customerFeedback?: string
  status: 'superseded' | 'current'
  frontImageUrl: string
  backImageUrl?: string
}

export interface DesignProof {
  id: string
  quoteId: string
  productName: string
  currentVersion: number
  status: 'pending_review' | 'revision_requested' | 'approved'
  frontImageUrl: string
  backImageUrl: string
  designerNotes: string
  customerFeedbackNotes?: string
  lastUpdated: string
  history: RevisionHistoryItem[]
}

export type CustomOrderStage =
  | 'quote_accepted'
  | 'artwork_in_progress'
  | 'awaiting_design_approval'
  | 'design_approved'
  | 'production_started'
  | 'production_completed'
  | 'shipped'
  | 'delivered'

export interface OrderItem {
  productId?: string
  name: string
  productType: string
  quantity: number
  unitDemoPrice: number
  totalDemoPrice: number
  imageUrl: string
  summaryText?: string
}

export interface OrderShippingAddress {
  fullName: string
  email: string
  phone: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface Order {
  id: string
  orderType: 'ready_made' | 'custom_manufactured'
  quoteId?: string
  items: OrderItem[]
  subtotalDemoPrice: number
  shippingDemoPrice: number
  totalDemoPrice: number
  orderDate: string
  paymentStatus: 'demo_paid' | 'pending_demo_payment'
  paymentMethod: string
  shippingAddress: OrderShippingAddress
  currentStage: CustomOrderStage
  stageTimestamps: Partial<Record<CustomOrderStage, string>>
  trackingNumber?: string
  carrierName?: string
  estimatedDeliveryDate?: string
  designProof?: DesignProof
}

export interface CartItem {
  id: string // product id + finish + size
  product: Product
  quantity: number
  selectedFinish?: string
  selectedSize?: string
  customNotes?: string
}

export interface NotificationItem {
  id: string
  title: string
  message: string
  type: 'quote' | 'artwork' | 'order' | 'system'
  timestamp: string
  isRead: boolean
  targetPath?: string
  badgeLabel?: string
}

export interface UserProfile {
  fullName: string
  email: string
  phone: string
  organizationName: string
  department: string
  customerType: CustomerType
  badgeOrTitle?: string
  savedAddresses: OrderShippingAddress[]
  notificationPreferences: {
    emailAlerts: boolean
    smsUpdates: boolean
    proofAlerts: boolean
  }
}
