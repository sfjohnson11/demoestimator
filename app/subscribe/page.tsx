'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, ArrowLeft } from 'lucide-react'
import Checkout from '@/components/checkout'
import { checkSubscriptionStatus } from '@/app/actions/stripe'

export default function SubscribePage() {
  const router = useRouter()
  const [showCheckout, setShowCheckout] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)

  useEffect(() => {
    async function checkAccess() {
      const { hasAccess } = await checkSubscriptionStatus()
      setHasAccess(hasAccess)
      setIsLoading(false)
      
      if (hasAccess) {
        // Redirect to app if already subscribed
        router.push('/')
      }
    }
    checkAccess()
  }, [router])

  const handlePaymentComplete = () => {
    // Wait a moment for webhook to process, then redirect
    setTimeout(() => {
      router.push('/')
    }, 3000)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 via-blue-700 to-blue-500">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 via-blue-700 to-blue-500">
        <div className="text-white text-xl">You already have access! Redirecting...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-700 to-blue-500 p-4">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="outline" 
          onClick={() => router.push('/auth/login')}
          className="mb-6 bg-white/10 text-white border-white/30 hover:bg-white/20"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">E-Deck Estimator</h1>
          <p className="text-blue-100">Professional Demolition Estimating Software</p>
        </div>

        {!showCheckout ? (
          <Card className="max-w-xl mx-auto">
            <CardHeader className="text-center">
              <div className="bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg p-4 mb-4">
                <div className="text-4xl font-bold">$499<span className="text-lg font-normal">/year</span></div>
                <p className="text-green-100 mt-1">Unlimited Access</p>
              </div>
              <CardTitle className="text-2xl">Get Full Access Today</CardTitle>
              <CardDescription>One payment, full year of unlimited access</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Full access to Residential and Commercial modes</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Unlimited estimates and projects</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Complete materials database</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Offline capabilities with auto-sync</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Photo gallery for documentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Advanced reporting and visualization</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Free updates and support for one year</span>
                </li>
              </ul>

              <Button 
                onClick={() => setShowCheckout(true)} 
                className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
                size="lg"
              >
                Subscribe Now - $499/year
              </Button>

              <p className="text-center text-sm text-gray-500 mt-4">
                Secure payment powered by Stripe
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Complete Your Purchase</CardTitle>
              <CardDescription>E-Deck Estimator - Unlimited Access ($499/year)</CardDescription>
            </CardHeader>
            <CardContent>
              <Checkout productId="edeck-unlimited-annual" onComplete={handlePaymentComplete} />
              <Button 
                variant="outline" 
                onClick={() => setShowCheckout(false)}
                className="mt-4 bg-transparent"
              >
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to plan details
              </Button>
            </CardContent>
          </Card>
        )}

        <p className="text-center text-blue-100 text-sm mt-8">
          &copy; 2026 E-Deck Estimator by S F Johnson Enterprises, LLC. All rights reserved.
        </p>
      </div>
    </div>
  )
}
