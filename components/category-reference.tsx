"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Printer, ArrowLeft } from "lucide-react"
import { materialDatabase } from "@/data/materials"
import { commercialMaterialDatabase } from "@/data/commercial-materials"
import { getAllCategories } from "@/utils/category-utils"
import ReactToPrint from "react-to-print"
import { useRef } from "react"

interface CategoryReferenceProps {
  onBack: () => void
  onModeSwitch?: (mode: "residential" | "commercial") => void
}

export default function CategoryReference({ onBack, onModeSwitch }: CategoryReferenceProps) {
  const [mode, setMode] = useState<"residential" | "commercial">("residential")
  const printRef = useRef<HTMLDivElement>(null)

  const allCategories = getAllCategories()
  const categories = mode === "residential" ? allCategories.residential : allCategories.commercial
  const database = mode === "residential" ? materialDatabase : commercialMaterialDatabase

  const handlePrint = () => {
    if (printRef.current) {
      ReactToPrint({
        content: () => printRef.current,
        pageStyle: `
          @page {
            size: auto;
            margin: 20mm;
          }
          @media print {
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
        `,
      })
    }
  }

  const handleModeChange = (newMode: "residential" | "commercial") => {
    setMode(newMode)
    if (onModeSwitch) {
      onModeSwitch(newMode)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Back to Cover Page
          </Button>
          <div className="flex gap-2">
            <Button
              variant={mode === "residential" ? "default" : "outline"}
              onClick={() => handleModeChange("residential")}
            >
              Residential
            </Button>
            <Button
              variant={mode === "commercial" ? "default" : "outline"}
              onClick={() => handleModeChange("commercial")}
            >
              Commercial
            </Button>
            <Button variant="outline" onClick={handlePrint} className="flex items-center gap-1">
              <Printer className="h-4 w-4" /> Print Reference
            </Button>
          </div>
        </div>

        <Card className="bg-white shadow-lg mb-6">
          <CardHeader className="bg-blue-600 text-white">
            <CardTitle className="text-2xl">
              {mode === "commercial" ? "Commercial" : "Residential"} Demolition Categories Reference
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div ref={printRef} className="bg-white p-4">
              <h1 className="text-2xl font-bold text-center mb-6">
                {mode === "commercial" ? "Commercial" : "Residential"} Demolition Categories
              </h1>

              <p className="mb-4">
                This reference guide lists all available categories and items in the
                {mode === "commercial" ? " Commercial" : " Residential"} E-Deck Estimator.
              </p>

              <div className="space-y-6">
                {categories.map((category) => {
                  const items = database.filter((item) => item.category === category)
                  return (
                    <div key={category} className="border rounded-lg overflow-hidden">
                      <div className="bg-blue-50 p-3 font-semibold border-b">{category}</div>
                      <div className="p-3">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Item
                              </th>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Unit
                              </th>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                MH Unit
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {items.map((item) => (
                              <tr key={item.id}>
                                <td className="px-3 py-2 text-sm">{item.name}</td>
                                <td className="px-3 py-2 text-sm">{item.unit}</td>
                                <td className="px-3 py-2 text-sm">{item.manhourUnit}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-8 text-center text-sm text-gray-500">
                <p>E-Deck Estimator by S F Johnson Enterprises, LLC</p>
                <p>© {new Date().getFullYear()} All Rights Reserved</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
