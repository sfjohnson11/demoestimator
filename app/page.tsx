"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import CoverSheet from "@/components/cover-sheet"
import EstimatorForm from "@/components/estimator-form"
import TestModeBanner from "@/components/test-mode-banner"
import ModeSelector from "@/components/mode-selector"
import { AppProvider, useApp } from "@/contexts/app-context"
import type { EstimatorMode } from "@/types/app-config"
import CategoryReference from "@/components/category-reference"
import LogoutButton from "@/components/logout-button"
import { checkSubscriptionStatus } from "@/app/actions/stripe"

function AppContent() {
  const { mode, setMode } = useApp()
  const router = useRouter()
  const [showEstimator, setShowEstimator] = useState(false)
  const [testMode, setTestMode] = useState(false)
  const [demoMode, setDemoMode] = useState(false)
  const [showModeSelector, setShowModeSelector] = useState(false)
  const [showCategoryReference, setShowCategoryReference] = useState(false)
  const [hasSubscription, setHasSubscription] = useState(false)
  const [isCheckingSubscription, setIsCheckingSubscription] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    async function checkAccess() {
      try {
        const result = await checkSubscriptionStatus()
        
        if (result.status === 'not_logged_in') {
          setIsLoggedIn(false)
          setHasSubscription(false)
          setIsCheckingSubscription(false)
          return
        }
        
        setIsLoggedIn(true)
        setHasSubscription(result.hasAccess)
      } catch (error) {
        console.error('Error checking subscription:', error)
        setIsLoggedIn(false)
        setHasSubscription(false)
      } finally {
        setIsCheckingSubscription(false)
      }
    }
    checkAccess()

    // Check if mode is already selected
    const savedMode = localStorage.getItem("estimator-mode")
    if (!savedMode) {
      setShowModeSelector(true)
    }
  }, [router])

  const handleEstimatorClick = () => {
    setShowEstimator(true)
    setDemoMode(false)
  }

  const handleDemoClick = () => {
    setShowEstimator(true)
    setDemoMode(true)
    setShowModeSelector(false) // Skip mode selector in demo
    setMode("residential") // Default to residential in demo
  }

  const handleTestModeClick = () => {
    setTestMode(true)
    setShowEstimator(true)
    setDemoMode(false)
  }

  const handleBackClick = () => {
    setShowEstimator(false)
    setTestMode(false)
    setDemoMode(false)
  }

  const handleModeSelect = (selectedMode: EstimatorMode) => {
    setMode(selectedMode)
    setShowModeSelector(false)
  }

  const handleModeSwitch = (newMode: EstimatorMode) => {
    setMode(newMode)
    // Save to localStorage
    localStorage.setItem("estimator-mode", newMode)
  }

  // Show loading while checking subscription
  if (isCheckingSubscription) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 via-blue-700 to-blue-500">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  // If user is NOT logged in, force them to login
  if (!isLoggedIn && !testMode && !demoMode) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 via-blue-700 to-blue-500 p-4">
        <div className="text-center text-white max-w-md">
          <h1 className="text-3xl font-bold mb-4">E-Deck Estimator</h1>
          <p className="mb-6">Please log in or create an account to continue.</p>
          <div className="space-y-3">
            <button
              onClick={() => router.push('/auth/login')}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Log In
            </button>
            <button
              onClick={() => router.push('/auth/sign-up')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Create Account
            </button>
            <button
              onClick={handleDemoClick}
              className="w-full bg-transparent border border-white/50 hover:bg-white/10 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Try Demo Mode
            </button>
          </div>
        </div>
      </div>
    )
  }

  // If user is logged in but doesn't have subscription, show subscribe page
  if (isLoggedIn && !hasSubscription && !testMode && !demoMode) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 via-blue-700 to-blue-500 p-4">
        <div className="text-center text-white max-w-md">
          <h1 className="text-3xl font-bold mb-4">Subscription Required</h1>
          <p className="mb-6">You need an active subscription to access E-Deck Estimator.</p>
          <div className="space-y-3">
            <button
              onClick={() => router.push('/subscribe')}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Subscribe Now - $499/year
            </button>
            <button
              onClick={handleDemoClick}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Try Demo Mode
            </button>
          </div>
        </div>
        <div className="fixed top-4 right-4">
          <LogoutButton />
        </div>
      </div>
    )
  }

  if (showModeSelector) {
    return <ModeSelector onModeSelect={handleModeSelect} onBack={() => setShowModeSelector(false)} />
  }

  if (showCategoryReference) {
    return <CategoryReference onBack={() => setShowCategoryReference(false)} onModeSwitch={handleModeSwitch} />
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Logout button in top-right corner */}
      <div className="fixed top-4 right-4 z-50">
        <LogoutButton />
      </div>
      {testMode && <TestModeBanner />}

      {!showEstimator ? (
        <CoverSheet
          onEstimatorClick={handleEstimatorClick}
          onDemoClick={handleDemoClick}
          onTestModeClick={handleTestModeClick}
          onCategoryReferenceClick={() => setShowCategoryReference(true)}
          onModeSwitch={handleModeSwitch}
          mode={mode}
        />
      ) : (
        <EstimatorForm
          testMode={testMode}
          demoMode={demoMode}
          onBackClick={handleBackClick}
          mode={mode}
          onModeSwitch={handleModeSwitch}
        />
      )}
    </main>
  )
}

export default function Home() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
