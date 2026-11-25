import React, { createContext, useContext, useState, useEffect } from 'react'
import { CartItem, Product } from '@/types'

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (product: Product, quantity?: number, selectedFinish?: string, selectedSize?: string) => void
  removeFromCart: (cartItemId: string) => void
  updateQuantity: (cartItemId: string, delta: number) => void
  clearCart: () => void
  totalCount: number
  subtotal: number
  estimatedShipping: number
  orderTotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'frontline_coins_cart_v1'

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
    } catch (e) {
      console.error('Failed to save cart to localStorage', e)
    }
  }, [cartItems])

  const addToCart = (product: Product, quantity = 1, selectedFinish?: string, selectedSize?: string) => {
    const finish = selectedFinish || (product.finishOptions?.[0] ?? 'Standard')
    const size = selectedSize || (product.sizeOptions?.[0] ?? 'Standard')
    const itemId = `${product.id}-${finish}-${size}`

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemId)
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        )
      }
      return [...prev, { id: itemId, product, quantity, selectedFinish: finish, selectedSize: size }]
    })
  }

  const removeFromCart = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId))
  }

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta
            return newQty > 0 ? { ...item, quantity: newQty } : null
          }
          return item
        })
        .filter((item): item is CartItem => item !== null)
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.product.demoPrice || 0) * item.quantity,
    0
  )
  const estimatedShipping = subtotal > 75 || subtotal === 0 ? 0 : 5.95
  const orderTotal = subtotal + estimatedShipping

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
        estimatedShipping,
        orderTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
