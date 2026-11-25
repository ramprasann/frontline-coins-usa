import { UserProfile, CustomerType } from '@/types'

export const initialMockProfile: UserProfile = {
  fullName: 'Customer Account',
  email: 'orders@frontlinecoinsusa.com',
  phone: '(410) 555-0194',
  organizationName: 'Department / Agency Services',
  department: 'Operations & Procurement Division',
  customerType: 'police' as CustomerType,
  badgeOrTitle: 'Authorized Representative',
  savedAddresses: [
    {
      fullName: 'Customer Representative',
      email: 'orders@frontlinecoinsusa.com',
      phone: '(410) 555-0194',
      addressLine1: '1000 West Baltimore Street',
      addressLine2: 'Attn: Procurement Division Rm 204',
      city: 'Baltimore',
      state: 'MD',
      zipCode: '21223',
      country: 'United States',
    },
    {
      fullName: 'Delivery Coordinator',
      email: 'orders@frontlinecoinsusa.com',
      phone: '(410) 555-0194',
      addressLine1: '4821 Rolling Green Way',
      city: 'Catonsville',
      state: 'MD',
      zipCode: '21228',
      country: 'United States',
    },
  ],
  notificationPreferences: {
    emailAlerts: true,
    smsUpdates: true,
    proofAlerts: true,
  },
}
