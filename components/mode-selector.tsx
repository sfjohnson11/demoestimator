"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Building, Home, ArrowLeft } from "lucide-react"
import { type EstimatorMode, modeConfigs } from "@/types/app-config"

interface ModeSelectorProps {
  onModeSelect: (mode: EstimatorMode) => void
  onBack?: () => void
}

export default function ModeSelector({ onModeSelect, onBack }: ModeSelectorProps) {
  const [selectedMode, setSelectedMode] = useState<EstimatorMode | null>(null)

  const handleSelect = (mode: EstimatorMode) => {
    setSelectedMode(mode)
  }

  const handleContinue = () => {
    if (selectedMode) {
      onModeSelect(selectedMode)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 via-blue-700 to-blue-500 p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Choose Your E-Deck Estimator Version</CardTitle>
          <CardDescription>Select the version that best fits your business needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Residential Option */}
            <div
              className={`border rounded-lg p-6 cursor-pointer transition-all ${
                selectedMode === "residential"
                  ? "border-blue-500 bg-blue-50 shadow-md"
                  : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
              }`}
              onClick={() => handleSelect("residential")}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <Home className="h-6 w-6 text-blue-600 mr-2" />
                  <h3 className="text-xl font-semibold">Residential</h3>
                </div>
                {selectedMode === "residential" && (
                  <div className="bg-blue-500 text-white p-1 rounded-full">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </div>

              <p className="text-gray-600 mb-4">
                Perfect for residential demolition contractors working on homes and small structures.
              </p>

              <div className="mb-4">
                <div className="text-2xl font-bold text-blue-600">
                  ${modeConfigs.residential.pricing.price}
                  <span className="text-sm font-normal text-gray-500">
                    /{modeConfigs.residential.pricing.billingCycle}
                  </span>
                </div>
              </div>

              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Residential demolition materials database</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Offline capabilities with auto-sync</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Photo gallery for documentation</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Basic reporting and visualization</span>
                </li>
              </ul>
            </div>

            {/* Commercial Option */}
            <div
              className={`border rounded-lg p-6 cursor-pointer transition-all ${
                selectedMode === "commercial"
                  ? "border-blue-500 bg-blue-50 shadow-md"
                  : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
              }`}
              onClick={() => handleSelect("commercial")}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <Building className="h-6 w-6 text-blue-600 mr-2" />
                  <h3 className="text-xl font-semibold">Commercial</h3>
                </div>
                {selectedMode === "commercial" && (
                  <div className="bg-blue-500 text-white p-1 rounded-full">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </div>

              <p className="text-gray-600 mb-4">
                Advanced features for commercial demolition contractors working on larger projects.
              </p>

              <div className="mb-4">
                <div className="text-2xl font-bold text-blue-600">
                  ${modeConfigs.commercial.pricing.price}
                  <span className="text-sm font-normal text-gray-500">
                    /{modeConfigs.commercial.pricing.billingCycle}
                  </span>
                </div>
              </div>

              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Commercial demolition materials database</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Offline capabilities with auto-sync</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Photo gallery for documentation</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Advanced reporting and visualization</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Team collaboration features</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Multi-user accounts</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Hazardous materials tracking</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {onBack && (
            <Button variant="outline" onClick={onBack} className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Back to Cover Page
            </Button>
          )}
          <Button
            onClick={handleContinue}
            disabled={!selectedMode}
            className={`${onBack ? "w-auto" : "w-full max-w-xs"}`}
            size="lg"
          >
            Continue with {selectedMode || "Selected"} Version
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
