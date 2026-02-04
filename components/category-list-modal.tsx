"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"
import { materialDatabase } from "@/data/materials"
import { commercialMaterialDatabase } from "@/data/commercial-materials"
import type { EstimatorMode } from "@/types/app-config"

interface CategoryListModalProps {
  onClose: () => void
  mode: EstimatorMode
}

export default function CategoryListModal({ onClose, mode }: CategoryListModalProps) {
  const [categories, setCategories] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const isCommercial = mode === "commercial"
  const database = isCommercial ? commercialMaterialDatabase : materialDatabase

  useEffect(() => {
    // Extract unique categories from the database
    const uniqueCategories = Array.from(new Set(database.map((item) => item.category))).sort()
    setCategories(uniqueCategories)
  }, [database])

  // Filter categories based on search term
  const filteredCategories = categories.filter((category) => category.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between bg-blue-50">
          <div>
            <CardTitle className="text-blue-800">
              {isCommercial ? "Commercial" : "Residential"} Demolition Categories
            </CardTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <div className="p-4 border-b">
          <input
            type="text"
            placeholder="Search categories..."
            className="w-full p-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <CardContent className="flex-grow overflow-y-auto p-0">
          <div className="p-4">
            <p className="text-sm text-gray-500 mb-4">
              {filteredCategories.length} categories available in {isCommercial ? "commercial" : "residential"} mode
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {filteredCategories.map((category) => (
                <div key={category} className="p-2 border rounded hover:bg-blue-50">
                  {category}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <div className="p-4 border-t bg-gray-50">
          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </Card>
    </div>
  )
}
