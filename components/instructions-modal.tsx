"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"

interface InstructionsModalProps {
  onClose: () => void
  isCommercial?: boolean
}

export default function InstructionsModal({ onClose, isCommercial = false }: InstructionsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>How to Use the E-Deck {isCommercial ? "Commercial" : "Residential"} Estimator</CardTitle>
            <CardDescription>Follow these steps to create your demolition estimate</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">Getting Started</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Enter your project details at the top of the form (Project Name, Client Name, Date).</li>
              <li>Enter your contractor information and set your default hourly labor rate.</li>
              <li>Begin adding demolition items using the form below.</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Setting Your Labor Rate</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Enter your default hourly labor rate in the Contractor Information section.</li>
              <li>This rate will automatically be applied to all line items and additional costs.</li>
              <li>If you change the default rate, all existing items will be updated with the new rate.</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">
              Adding {isCommercial ? "Commercial" : "Residential"} Demolition Items
            </h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Select a material from the dropdown menu. Materials are organized by category.</li>
              <li>Enter the quantity of the material to be demolished.</li>
              <li>The material unit (LF, SF, EA, etc.) will auto-fill based on your material selection.</li>
              <li>Enter the material cost per unit (if applicable).</li>
              <li>The labor rate will be automatically filled from your default rate.</li>
              <li>The manhour unit will auto-fill based on your material selection.</li>
              <li>
                All calculations (Total Material, Total Manhours, Total Labor, Line Total) will be performed
                automatically.
              </li>
              <li>Click the "Add Item" button to add more demolition items as needed.</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Adding Additional Costs</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                Use the Additional Costs section to add expenses like permits, equipment rental, disposal fees, etc.
              </li>
              <li>Enter a description, quantity, unit, material cost, and manhour unit as needed.</li>
              <li>The labor rate will be automatically filled from your default rate.</li>
              <li>Click the "Add Additional Cost" button to add more items as needed.</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Adding Project Photos</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                Use the Project Photos section to add images of the demolition site or specific items to be demolished.
              </li>
              <li>Click the "Add Photos" button or drag and drop images into the designated area.</li>
              <li>Add descriptions to each photo to provide context or notes.</li>
              <li>Photos will be included in your saved estimate and can be printed with your estimate.</li>
            </ol>
          </div>

          {isCommercial && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Commercial-Specific Features</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  The commercial database includes specialized materials like structural steel, commercial HVAC systems,
                  and more.
                </li>
                <li>
                  Use the hazardous materials category for items like asbestos, lead paint, and PCBs that require
                  special handling.
                </li>
                <li>
                  For large commercial projects, consider breaking down the estimate by floors or sections for better
                  organization.
                </li>
                <li>
                  Commercial estimates typically require more detailed exclusions - be thorough in documenting what's
                  not included.
                </li>
              </ol>
            </div>
          )}

          <div>
            <h3 className="font-semibold text-lg mb-2">Finalizing Your Estimate</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Enter your overhead percentage.</li>
              <li>Enter your profit percentage.</li>
              <li>Enter any applicable tax percentage.</li>
              <li>Add any exclusions or notes in the Exclusions box.</li>
              <li>Review your Proposed Demolition Price.</li>
              <li>Click the "Print" button to print your estimate or "Save" to download a copy.</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Tips</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Be thorough in your material selections to ensure accurate estimates.</li>
              <li>Double-check quantities and rates before finalizing.</li>
              <li>Use the Exclusions section to clearly state what is NOT included in your estimate.</li>
              <li>Add photos to document existing conditions or specific items requiring demolition.</li>
              <li>Save your estimates regularly to avoid losing your work.</li>
              {isCommercial && (
                <li>
                  For commercial projects, consider adding line items for permits, disposal fees, and special equipment
                  rental.
                </li>
              )}
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={onClose} className="w-full">
            Close Instructions
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
