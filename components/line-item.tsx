"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface LineItemProps {
  item: any
  updateLineItem: (id: number, field: string, value: any) => void
  removeLineItem: (id: number) => void
  disabled?: boolean
  materialDatabase: any[]
}

export default function LineItem({
  item,
  updateLineItem,
  removeLineItem,
  disabled = false,
  materialDatabase,
}: LineItemProps) {
  // Calculate derived values
  const quantity = Number.parseFloat(item.quantity) || 0
  const materialCost = Number.parseFloat(item.materialCost) || 0
  const laborRate = Number.parseFloat(item.laborRate) || 0
  const manhourUnit = Number.parseFloat(item.manhourUnit) || 0

  const totalMaterial = quantity * materialCost
  const totalManhours = quantity * manhourUnit
  const totalLabor = totalManhours * laborRate
  const lineTotal = totalMaterial + totalLabor

  // Group materials by category for the dropdown
  const materialsByCategory: Record<string, any[]> = {}
  materialDatabase.forEach((material) => {
    if (!materialsByCategory[material.category]) {
      materialsByCategory[material.category] = []
    }
    materialsByCategory[material.category].push(material)
  })

  return (
    <tr className="border-b">
      <td className="p-2 border">
        <Select
          value={item.material}
          onValueChange={(value) => updateLineItem(item.id, "material", value)}
          disabled={disabled}
        >
          <SelectTrigger className="h-8 min-w-[120px] max-w-full">
            <SelectValue placeholder="Select material" />
          </SelectTrigger>
          <SelectContent className="max-h-[50vh] overflow-y-auto">
            {Object.keys(materialsByCategory).map((category) => (
              <div key={category}>
                <div className="px-2 py-1.5 text-sm font-semibold bg-gray-100">{category}</div>
                {materialsByCategory[category].map((material) => (
                  <SelectItem key={material.id} value={material.id}>
                    {material.name}
                  </SelectItem>
                ))}
              </div>
            ))}
          </SelectContent>
        </Select>
      </td>
      <td className="p-2 border">
        <Input
          type="number"
          value={item.quantity === 0 ? "" : item.quantity}
          onChange={(e) => updateLineItem(item.id, "quantity", Number.parseFloat(e.target.value) || 0)}
          className="h-8 text-right w-full min-w-[60px]"
          placeholder="0"
          disabled={disabled}
        />
      </td>
      <td className="p-2 border">
        <Input value={item.materialUnit} readOnly className="h-8 text-center bg-gray-50 w-full min-w-[40px]" />
      </td>
      <td className="p-2 border">
        <Input
          type="number"
          value={item.materialCost === 0 ? "" : item.materialCost}
          onChange={(e) => updateLineItem(item.id, "materialCost", Number.parseFloat(e.target.value) || 0)}
          className="h-8 text-right w-full min-w-[60px]"
          placeholder="0"
          disabled={disabled}
        />
      </td>
      <td className="p-2 border">
        <Input
          value={`$${totalMaterial.toFixed(2)}`}
          readOnly
          className="h-8 text-right bg-gray-50 w-full min-w-[70px]"
        />
      </td>
      <td className="p-2 border">
        <Input
          type="number"
          value={item.laborRate === 0 ? "" : item.laborRate}
          readOnly // Make this field read-only since it's populated from the global rate
          className="h-8 text-right bg-gray-50 w-full min-w-[60px]"
          placeholder="0"
        />
      </td>
      <td className="p-2 border">
        <Input value={item.manhourUnit} readOnly className="h-8 text-center bg-gray-50 w-full min-w-[50px]" />
      </td>
      <td className="p-2 border">
        <Input value={totalManhours.toFixed(2)} readOnly className="h-8 text-right bg-gray-50 w-full min-w-[60px]" />
      </td>
      <td className="p-2 border">
        <Input value={`$${totalLabor.toFixed(2)}`} readOnly className="h-8 text-right bg-gray-50 w-full min-w-[70px]" />
      </td>
      <td className="p-2 border">
        <Input
          value={`$${lineTotal.toFixed(2)}`}
          readOnly
          className="h-8 text-right bg-gray-50 font-semibold w-full min-w-[80px]"
        />
      </td>
      <td className="p-2 border">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeLineItem(item.id)}
          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
          disabled={disabled}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </td>
    </tr>
  )
}
