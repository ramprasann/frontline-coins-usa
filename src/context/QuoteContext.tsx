import React, { createContext, useContext, useState, useEffect } from 'react'
import { QuoteRequest } from '@/types'
import { initialMockQuotes } from '@/data/mockQuotes'

interface QuoteContextType {
  quotes: QuoteRequest[]
  getQuoteById: (id: string) => QuoteRequest | undefined
  submitQuoteRequest: (quoteData: Omit<QuoteRequest, 'id' | 'submittedDate' | 'status' | 'revisionCount' | 'moldFeeDemo' | 'designFeeDemo'>) => QuoteRequest
  acceptQuote: (quoteId: string) => void
  rejectQuote: (quoteId: string) => void
  updateQuoteStatus: (quoteId: string, status: QuoteRequest['status'], notes?: string) => void
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined)

const QUOTES_STORAGE_KEY = 'frontline_coins_quotes_v1'

export const QuoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quotes, setQuotes] = useState<QuoteRequest[]>(() => {
    try {
      const saved = localStorage.getItem(QUOTES_STORAGE_KEY)
      return saved ? JSON.parse(saved) : initialMockQuotes
    } catch {
      return initialMockQuotes
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(QUOTES_STORAGE_KEY, JSON.stringify(quotes))
    } catch (e) {
      console.error('Failed to save quotes', e)
    }
  }, [quotes])

  const getQuoteById = (id: string) => {
    return quotes.find((q) => q.id === id)
  }

  const submitQuoteRequest = (
    quoteData: Omit<QuoteRequest, 'id' | 'submittedDate' | 'status' | 'revisionCount' | 'moldFeeDemo' | 'designFeeDemo'>
  ): QuoteRequest => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000)
    const newId = `FCU-Q-${randomDigits}`
    const today = new Date().toISOString().split('T')[0]

    // Estimate realistic demo price based on quantity
    const qty = quoteData.organization.quantity || 100
    let estUnit = 4.85
    if (quoteData.productType === 'badge') estUnit = 38.0
    else if (quoteData.productType === 'medal') estUnit = 12.5
    else if (quoteData.productType === 'patch') estUnit = 4.2
    else if (quoteData.productType === 'lapel-pin') estUnit = 2.95
    else if (quoteData.productType === 'keychain') estUnit = 5.2
    else if (quoteData.productType === 'bottle-opener') estUnit = 6.4

    if (qty >= 500) estUnit *= 0.85
    else if (qty >= 250) estUnit *= 0.92

    const quotedTotal = Math.round(estUnit * qty * 100) / 100

    const newQuote: QuoteRequest = {
      ...quoteData,
      id: newId,
      submittedDate: today,
      status: 'under_review',
      quotedDemoAmount: quotedTotal,
      unitPriceDemo: Math.round(estUnit * 100) / 100,
      moldFeeDemo: 0, // Guarantee $0 mold fee
      designFeeDemo: 0, // Guarantee free design revisions
      estimatedProductionDays: '12-16 Business Days after Design Approval',
      quoteValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      companyReviewerNotes: 'Thank you for your custom request! Our Maryland design studio has received your project specs. We will prepare your digital 3D proof with 0 mold fee and unlimited free design revisions.',
      revisionCount: 0,
    }

    setQuotes((prev) => [newQuote, ...prev])
    return newQuote
  }

  const acceptQuote = (quoteId: string) => {
    setQuotes((prev) =>
      prev.map((q) => (q.id === quoteId ? { ...q, status: 'accepted' as const } : q))
    )
  }

  const rejectQuote = (quoteId: string) => {
    setQuotes((prev) =>
      prev.map((q) => (q.id === quoteId ? { ...q, status: 'rejected' as const } : q))
    )
  }

  const updateQuoteStatus = (quoteId: string, status: QuoteRequest['status'], notes?: string) => {
    setQuotes((prev) =>
      prev.map((q) =>
        q.id === quoteId
          ? {
              ...q,
              status,
              companyReviewerNotes: notes || q.companyReviewerNotes,
            }
          : q
      )
    )
  }

  return (
    <QuoteContext.Provider
      value={{
        quotes,
        getQuoteById,
        submitQuoteRequest,
        acceptQuote,
        rejectQuote,
        updateQuoteStatus,
      }}
    >
      {children}
    </QuoteContext.Provider>
  )
}

export const useQuotes = () => {
  const context = useContext(QuoteContext)
  if (!context) {
    throw new Error('useQuotes must be used within a QuoteProvider')
  }
  return context
}
