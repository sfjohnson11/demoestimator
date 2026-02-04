"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SimpleChartProps {
  lineItems: any[]
  additionalCosts: any[]
  materialDatabase: any[]
}

export default function SimpleChart({ lineItems, additionalCosts, materialDatabase }: SimpleChartProps) {
  const [chartData, setChartData] = useState<any[]>([])

  // Process data whenever inputs change
  useEffect(() => {
    // Process line items
    const processedLineItems = lineItems
      .filter((item) => item.material && item.quantity > 0)
      .map((item) => {
        const materialInfo = materialDatabase.find((m) => m.id === item.material)
        const materialName = materialInfo ? materialInfo.name : "Unknown Material"
        const quantity = Number.parseFloat(item.quantity) || 0
        const materialCost = Number.parseFloat(item.materialCost) || 0
        const laborRate = Number.parseFloat(item.laborRate) || 0
        const manhourUnit = Number.parseFloat(item.manhourUnit) || 0

        const totalMaterial = quantity * materialCost
        const totalManhours = quantity * manhourUnit
        const totalLabor = totalManhours * laborRate
        const lineTotal = totalMaterial + totalLabor

        return {
          name: materialName,
          materialCost: totalMaterial,
          laborCost: totalLabor,
          total: lineTotal,
          quantity: quantity,
          unit: item.materialUnit,
        }
      })

    // Process additional costs
    const processedAdditionalCosts = additionalCosts
      .filter((item) => item.description && item.quantity > 0)
      .map((item) => {
        const quantity = Number.parseFloat(item.quantity) || 0
        const materialCost = Number.parseFloat(item.materialCost) || 0
        const laborRate = Number.parseFloat(item.laborRate) || 0
        const manhourUnit = Number.parseFloat(item.manhourUnit) || 0

        const totalMaterial = quantity * materialCost
        const totalManhours = quantity * manhourUnit
        const totalLabor = totalManhours * laborRate
        const lineTotal = totalMaterial + totalLabor

        return {
          name: item.description || "Additional Cost",
          materialCost: totalMaterial,
          laborCost: totalLabor,
          total: lineTotal,
          quantity: quantity,
          unit: item.unit,
        }
      })

    // Combine and set chart data
    const combinedData = [...processedLineItems, ...processedAdditionalCosts]
    setChartData(combinedData)
  }, [lineItems, additionalCosts, materialDatabase])

  // Format currency for tooltip
  const formatCurrency = (value: number) => {
    return `$${value.toFixed(2)}`
  }

  // Create a sample chart data if no real data exists
  const getSampleData = () => {
    return [
      {
        name: "Sample Item 1",
        materialCost: 500,
        laborCost: 750,
        total: 1250,
        quantity: 100,
        unit: "SF",
      },
      {
        name: "Sample Item 2",
        materialCost: 300,
        laborCost: 450,
        total: 750,
        quantity: 50,
        unit: "LF",
      },
    ]
  }

  // Use sample data if no real data exists
  const displayData = chartData.length > 0 ? chartData : getSampleData()
  const showingSampleData = chartData.length === 0

  // Find the maximum value for scaling
  const maxValue = Math.max(...displayData.map((item) => item.total))
  const scale = maxValue > 0 ? 300 / maxValue : 1 // 300px is the max bar height

  return (
    <Card className="border border-blue-200 mt-8">
      <CardHeader className="bg-blue-50">
        <CardTitle className="text-lg text-blue-800">Demolition Items Visualization</CardTitle>
        {showingSampleData && <p className="text-sm text-blue-600">Add demolition items to see your visualization.</p>}
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-80 w-full overflow-x-auto">
          <div className="min-w-full flex flex-wrap items-end h-64 gap-2 sm:gap-4 pt-4" style={{ minWidth: "500px" }}>
            {displayData.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="flex flex-col-reverse h-60">
                  <div
                    className="bg-blue-500 w-12 sm:w-16"
                    style={{ height: `${item.materialCost * scale}px` }}
                    title={`Material Cost: ${formatCurrency(item.materialCost)}`}
                  ></div>
                  <div
                    className="bg-green-500 w-12 sm:w-16"
                    style={{ height: `${item.laborCost * scale}px` }}
                    title={`Labor Cost: ${formatCurrency(item.laborCost)}`}
                  ></div>
                </div>
                <div className="mt-2 text-xs text-center w-20 truncate" title={item.name}>
                  {item.name}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 gap-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-500 mr-2"></div>
              <span className="text-sm">Material Cost</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 mr-2"></div>
              <span className="text-sm">Labor Cost</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
