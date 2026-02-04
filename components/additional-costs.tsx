"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface AdditionalCostsProps {
  item: any
  updateAdditionalCost: (id: number, field: string, value: any) => void
  removeAdditionalCost: (id: number) => void
  disabled?: boolean
}

export default function AdditionalCosts({
  item,
  updateAdditionalCost,
  removeAdditionalCost,
  disabled = false,
}: AdditionalCostsProps) {
  // Calculate derived values
  const quantity = Number.parseFloat(item.quantity) || 0
  const materialCost = Number.parseFloat(item.materialCost) || 0
  const laborRate = Number.parseFloat(item.laborRate) || 0
  const manhourUnit = Number.parseFloat(item.manhourUnit) || 0

  const totalMaterial = quantity * materialCost
  const totalManhours = quantity * manhourUnit
  const totalLabor = totalManhours * laborRate
  const lineTotal = totalMaterial + totalLabor

  return (
    <tr className="border-b">
      <td className="p-2 border">
        <Input
          value={item.description}
          onChange={(e) => updateAdditionalCost(item.id, "description", e.target.value)}
          className="h-8 min-w-[120px]"
          placeholder="Enter description"
          disabled={disabled}
        />
      </td>
      <td className="p-2 border">
        <Input
          type="number"
          value={item.quantity === 0 ? "" : item.quantity}
          onChange={(e) => updateAdditionalCost(item.id, "quantity", Number.parseFloat(e.target.value) || 0)}
          className="h-8 text-right w-full min-w-[60px]"
          placeholder="0"
          disabled={disabled}
        />
      </td>
      <td className="p-2 border">
        <Input
          value={item.unit}
          onChange={(e) => updateAdditionalCost(item.id, "unit", e.target.value)}
          className="h-8 text-center w-full min-w-[40px]"
          placeholder="Unit"
          disabled={disabled}
        />
      </td>
      <td className="p-2 border">
        <Input
          type="number"
          value={item.materialCost === 0 ? "" : item.materialCost}
          onChange={(e) => updateAdditionalCost(item.id, "materialCost", Number.parseFloat(e.target.value) || 0)}
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
        <Input
          type="number"
          value={item.manhourUnit === 0 ? "" : item.manhourUnit}
          onChange={(e) => updateAdditionalCost(item.id, "manhourUnit", Number.parseFloat(e.target.value) || 0)}
          className="h-8 text-center w-full min-w-[50px]"
          placeholder="0"
          disabled={disabled}
        />
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
          onClick={() => removeAdditionalCost(item.id)}
          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
          disabled={disabled}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </td>
    </tr>
  )
}
