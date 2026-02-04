"use client"

import { useState, useEffect } from "react"
import CoverSheet from "@/components/cover-sheet"
import EstimatorForm from "@/components/estimator-form"
import TestModeBanner from "@/components/test-mode-banner"
import ModeSelector from "@/components/mode-selector"
import { AppProvider, useApp } from "@/contexts/app-context"
import type { EstimatorMode } from "@/types/app-config"
import CategoryReference from "@/components/category-reference"
import LogoutButton from "@/components/logout-button"

function AppContent() {
  const { mode, setMode } = useApp()
  const [showEstimator, setShowEstimator] = useState(false)
  const [testMode, setTestMode] = useState(false)
  const [demoMode, setDemoMode] = useState(false)
  const [showModeSelector, setShowModeSelector] = useState(false)
  const [showCategoryReference, setShowCategoryReference] = useState(false)

  useEffect(() => {
    // Check if mode is already selected
    const savedMode = localStorage.getItem("estimator-mode")
    if (!savedMode) {
      setShowModeSelector(true)
    }
  }, [])

  const handleEstimatorClick = () => {
    setShowEstimator(true)
    setDemoMode(false)
  }

  const handleDemoClick = () => {
    setShowEstimator(true)
    setDemoMode(true)
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
