import React, { createContext, useContext, useState, useEffect } from 'react'
import { UserProfile, OrderShippingAddress } from '@/types'
import { initialMockProfile } from '@/data/mockProfile'

interface ProfileContextType {
  profile: UserProfile
  updateProfile: (updated: Partial<UserProfile>) => void
  addAddress: (address: OrderShippingAddress) => void
  removeAddress: (index: number) => void
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

const PROFILE_STORAGE_KEY = 'frontline_coins_profile_v2'

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      // Clear legacy storage if present
      localStorage.removeItem('frontline_coins_profile_v1')
      const saved = localStorage.getItem(PROFILE_STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.fullName && parsed.fullName.includes('Marcus')) {
          return initialMockProfile
        }
        return parsed
      }
      return initialMockProfile
    } catch {
      return initialMockProfile
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile))
    } catch (e) {
      console.error('Failed to save profile', e)
    }
  }, [profile])

  const updateProfile = (updated: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }))
  }

  const addAddress = (address: OrderShippingAddress) => {
    setProfile((prev) => ({
      ...prev,
      savedAddresses: [...prev.savedAddresses, address],
    }))
  }

  const removeAddress = (index: number) => {
    setProfile((prev) => ({
      ...prev,
      savedAddresses: prev.savedAddresses.filter((_, i) => i !== index),
    }))
  }

  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateProfile,
        addAddress,
        removeAddress,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfile = () => {
  const context = useContext(ProfileContext)
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  return context
}
