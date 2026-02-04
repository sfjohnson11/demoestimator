"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "@/components/ui/recharts-wrapper"

interface DemolitionChartProps {
  lineItems: any[]
  additionalCosts: any[]
  materialDatabase: any[]
}

export default function DemolitionChart({ lineItems, additionalCosts, materialDatabase }: DemolitionChartProps) {
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

    console.log("Chart Data Processing:", {
      lineItems,
      processedLineItems,
      additionalCosts,
      processedAdditionalCosts,
      combinedData,
    })

    setChartData(combinedData)
  }, [lineItems, additionalCosts, materialDatabase])

  // Format currency for tooltip
  const formatCurrency = (value: number) => {
    return `$${value.toFixed(2)}`
  }

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
          <p className="font-bold">{label}</p>
          <p className="text-sm">
            Quantity: {data.quantity} {data.unit}
          </p>
          <p className="text-sm text-blue-600">Material Cost: {formatCurrency(data.materialCost)}</p>
          <p className="text-sm text-green-600">Labor Cost: {formatCurrency(data.laborCost)}</p>
          <p className="text-sm font-semibold">Total: {formatCurrency(data.total)}</p>
        </div>
      )
    }
    return null
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

  return (
    <Card className="border border-blue-200 mt-8">
      <CardHeader className="bg-blue-50">
        <CardTitle className="text-lg text-blue-800">Demolition Items Visualization</CardTitle>
        {showingSampleData && (
          <p className="text-sm text-blue-600">Showing sample data. Add demolition items to see your actual data.</p>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={displayData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 70,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} tick={{ fontSize: 12 }} interval={0} />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="materialCost" name="Material Cost" stackId="a" fill="#3b82f6" />
              <Bar dataKey="laborCost" name="Labor Cost" stackId="a" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
