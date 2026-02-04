"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SampleEstimate from "@/components/sample-estimate"
import AdminLoginModal from "@/components/admin-login-modal"
import { Building, Home } from "lucide-react"
import type { EstimatorMode } from "@/types/app-config"

// Update the interface to include the new prop
interface CoverSheetProps {
  onDemoClick: () => void
  onTestModeClick: () => void
  onEstimatorClick: () => void
  onCategoryReferenceClick: () => void
  onModeSwitch: (mode: EstimatorMode) => void
  mode: EstimatorMode
}

// Update the function signature to include the new prop
export default function CoverSheet({
  onDemoClick,
  onTestModeClick,
  onEstimatorClick,
  onCategoryReferenceClick,
  onModeSwitch,
  mode,
}: CoverSheetProps) {
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  const isCommercial = mode === "commercial"

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("adminToken")
      if (token) {
        try {
          const response = await fetch("/api/verify-token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          })

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }

          const data = await response.json()

          if (data.valid) {
            setIsAdmin(true)
          } else {
            localStorage.removeItem("adminToken")
          }
        } catch (error) {
          console.error("Error verifying token:", error)
          localStorage.removeItem("adminToken")
        }
      }
    }

    verifyToken()
  }, [])

  const handleTestModeClick = () => {
    if (isAdmin) {
      onTestModeClick()
    } else {
      setShowAdminLogin(true)
    }
  }

  const handleAdminLogin = (success: boolean) => {
    setIsAdmin(success)
    if (success) {
      onTestModeClick()
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-900 via-blue-700 to-blue-500 text-white">
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-blue-300 rounded-full animate-pulse"></div>
              <div className="absolute inset-2 bg-blue-500 rounded-full"></div>
            </div>
            <h1 className="text-3xl font-bold">E-Deck Estimator</h1>
            {isCommercial ? (
              <div className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                <Building className="h-3 w-3 mr-1" />
                Commercial
              </div>
            ) : (
              <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                <Home className="h-3 w-3 mr-1" />
                Residential
              </div>
            )}
          </div>

          {/* Mode Switcher */}
          <div className="mt-4 flex items-center gap-2">
            <span className="text-blue-100">Switch Mode:</span>
            <div className="flex bg-blue-800 rounded-lg p-1">
              <Button
                variant={isCommercial ? "ghost" : "default"}
                size="sm"
                className={`flex items-center gap-1 ${!isCommercial ? "bg-blue-600" : "text-blue-100 hover:text-white"}`}
                onClick={() => onModeSwitch("residential")}
              >
                <Home className="h-4 w-4" />
                Residential
              </Button>
              <Button
                variant={isCommercial ? "default" : "ghost"}
                size="sm"
                className={`flex items-center gap-1 ${isCommercial ? "bg-blue-600" : "text-blue-100 hover:text-white"}`}
                onClick={() => onModeSwitch("commercial")}
              >
                <Building className="h-4 w-4" />
                Commercial
              </Button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left Column - Marketing Content */}
          <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-bold">
                {isCommercial ? "Commercial" : "Residential"} Demolition Estimating Revolution
              </CardTitle>
              <CardDescription className="text-blue-100 text-lg">
                Transform Your {isCommercial ? "Commercial" : "Residential"} Demolition Business with Our Cutting-Edge
                Estimation Tool
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <h3 className="text-xl font-semibold">Benefits of Our Estimator</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-blue-300 flex items-center justify-center text-blue-900 flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span>Lightning-fast estimates in minutes, not hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-blue-300 flex items-center justify-center text-blue-900 flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span>Comprehensive {isCommercial ? "Commercial" : "Residential"} Demolition component database</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-blue-300 flex items-center justify-center text-blue-900 flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span>Automatic calculations for labor and materials</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-blue-300 flex items-center justify-center text-blue-900 flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span>Customizable pricing and profit margins</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-blue-300 flex items-center justify-center text-blue-900 flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span>Professional-looking estimate reports</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-blue-300 flex items-center justify-center text-blue-900 flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span>Cloud-based access from anywhere</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-blue-300 flex items-center justify-center text-blue-900 flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span>Regular updates with the latest industry pricing</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-blue-300 flex items-center justify-center text-blue-900 flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span>Work offline with automatic syncing when connection is restored</span>
                </li>
                {isCommercial && (
                  <>
                    <li className="flex items-start gap-2">
                      <div className="h-6 w-6 rounded-full bg-blue-300 flex items-center justify-center text-blue-900 flex-shrink-0 mt-0.5">
                        ✓
                      </div>
                      <span>Team collaboration features</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-6 w-6 rounded-full bg-blue-300 flex items-center justify-center text-blue-900 flex-shrink-0 mt-0.5">
                        ✓
                      </div>
                      <span>Hazardous materials tracking</span>
                    </li>
                  </>
                )}
              </ul>
              {/* Pricing Section */}
              <div className="mt-6 p-4 bg-gradient-to-r from-green-600 to-green-500 rounded-lg border-2 border-green-300 shadow-lg">
                <div className="text-center">
                  <h4 className="font-bold text-xl text-white mb-2">Unlimited Access</h4>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-4xl font-bold text-white">$499</span>
                    <span className="text-lg text-green-100">/year</span>
                  </div>
                  <p className="text-green-100 mt-2 text-sm">Unlimited estimates, unlimited projects, unlimited potential</p>
                  <ul className="text-left mt-3 space-y-1 text-sm text-white">
                    <li className="flex items-center gap-2">
                      <span className="text-green-200">&#10003;</span> Full access to all features
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-200">&#10003;</span> Both Residential and Commercial modes
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-200">&#10003;</span> Free updates and support
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-200">&#10003;</span> Cloud backup and offline access
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-600/30 rounded-lg border border-blue-300/50">
                <h4 className="font-semibold flex items-center gap-2">
                  <span className="inline-block p-1 bg-blue-500 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <path d="M22 2L2 22"></path>
                      <path d="M8 12H4a9.9 9.9 0 0 0 9.8 10C20.1 22 22 19.3 22 15.8V12h-4"></path>
                      <path d="M16 8h4a9.9 9.9 0 0 0-9.8-10C4.1 2 2 4.7 2 8.2V12h4"></path>
                    </svg>
                  </span>
                  NEW: Offline Capabilities
                </h4>
                <p className="text-sm mt-2">
                  Create and edit estimates even without internet connection. Your work is automatically saved locally
                  and synced when you're back online. Perfect for job sites with poor connectivity!
                </p>
              </div>
              <div className="pt-4">
                <p className="text-sm opacity-80 mb-4">By S F Johnson Enterprises, LLC</p>
                {/* Add a new button in the button group in the left column */}
                {/* Find the div with the "flex flex-wrap gap-3" className and add this button: */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={onEstimatorClick}
                    className="bg-green-500 text-white hover:bg-green-600 w-full sm:w-auto"
                  >
                    Start Estimating
                  </Button>
                  <Button
                    onClick={onDemoClick}
                    className="bg-blue-300 text-blue-900 hover:bg-blue-200 w-full sm:w-auto"
                  >
                    Try Demo
                  </Button>
                  <Button
                    onClick={onCategoryReferenceClick}
                    className="bg-blue-400 text-white hover:bg-blue-500 w-full sm:w-auto"
                  >
                    Category Reference
                  </Button>
                  <Button
                    onClick={handleTestModeClick}
                    variant="outline"
                    className="border-blue-300 text-blue-100 hover:bg-blue-800/50 w-full sm:w-auto bg-transparent"
                  >
                    Test Mode
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Sample Estimate */}
          <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Sample Estimate</CardTitle>
              <CardDescription className="text-blue-100">See what your estimates will look like</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-white rounded-lg p-4 text-black">
                <SampleEstimate isCommercial={isCommercial} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-blue-100 max-w-2xl mx-auto mb-6">
            Start creating professional {isCommercial ? "commercial" : "residential"} demolition estimates today with
            our easy-to-use, comprehensive estimating tool designed specifically for{" "}
            {isCommercial ? "commercial" : "residential"} demolition contractors.
          </p>
        </div>
      </div>

      {/* Copyright notice and disclaimer */}
      <div className="mt-auto py-4 text-center text-sm text-blue-200 bg-blue-900/50">
        <p>© 2025 E-Deck Estimator by S F Johnson Enterprises, LLC. All rights reserved.</p>
        <p className="mt-2">Unauthorized use or reproduction of this software is strictly prohibited.</p>
      </div>

      {showAdminLogin && <AdminLoginModal onClose={() => setShowAdminLogin(false)} onLogin={handleAdminLogin} />}
    </div>
  )
}
