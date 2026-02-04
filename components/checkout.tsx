'use client'

import { useCallback, useState } from 'react'
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import { startCheckoutSession } from '@/app/actions/stripe'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function Checkout({ productId, onComplete }: { productId: string, onComplete?: () => void }) {
  const [isComplete, setIsComplete] = useState(false)

  const startCheckoutSessionForProduct = useCallback(
    () => startCheckoutSession(productId),
    [productId],
  )

  const handleComplete = useCallback(() => {
    setIsComplete(true)
    if (onComplete) {
      onComplete()
    }
  }, [onComplete])

  if (isComplete) {
    return (
      <div className="text-center p-8 bg-green-50 rounded-lg">
        <h2 className="text-2xl font-bold text-green-700 mb-2">Payment Successful!</h2>
        <p className="text-green-600">Thank you for your purchase. You now have full access to E-Deck Estimator.</p>
        <p className="text-sm text-gray-500 mt-4">Refreshing your access...</p>
      </div>
    )
  }

  return (
    <div id="checkout" className="w-full">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ 
          clientSecret: startCheckoutSessionForProduct,
          onComplete: handleComplete
        }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}
