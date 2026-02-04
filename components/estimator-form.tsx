"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Printer, Save, ArrowLeft, Plus, HelpCircle, List, Home, Building, Trash2 } from "lucide-react"
// Let's try a completely different approach for printing
import { materialDatabase } from "@/data/materials"
import { commercialMaterialDatabase } from "@/data/commercial-materials"
import LineItem from "@/components/line-item"
import AdditionalCosts from "@/components/additional-costs"
import CoverPage from "@/components/cover-page"
import PhotoGallery, { type PhotoItem } from "@/components/photo-gallery"
// Import the SimpleChart component
import SimpleChart from "@/components/simple-chart"
// Import the DataDebugger component
// import DataDebugger from "@/components/data-debugger"
// Import the MobileTableNotice component
import MobileTableNotice from "@/components/mobile-table-notice"
// Add these imports at the top of the file
import { saveEstimate, type EstimateData } from "@/lib/offline-storage"
import OfflineStatus from "@/components/offline-status"
import type { EstimatorMode } from "@/types/app-config"

interface EstimatorFormProps {
  testMode: boolean
  demoMode: boolean
  onBackClick: () => void
  mode: EstimatorMode
  onModeSwitch?: (mode: EstimatorMode) => void
}

export default function EstimatorForm({ testMode, demoMode, onBackClick, mode, onModeSwitch }: EstimatorFormProps) {
  const isCommercial = mode === "commercial"
  const activeMaterialDatabase = isCommercial ? commercialMaterialDatabase : materialDatabase

  const [showInstructions, setShowInstructions] = useState(false)
  // Add this to the state declarations at the top of the component
  const [showCategoryList, setShowCategoryList] = useState(false)

  // Add this function right after the component declaration, before the state declarations
  const getStorageKey = (currentMode: EstimatorMode) => `e-deck-estimator-data-${currentMode}-mode-v2`
  const LOCAL_STORAGE_KEY = getStorageKey(mode)

  // Modify the existing state declarations to load from localStorage if available
  // Find the state declarations for lineItems, additionalCosts, etc. and replace them with:
  const [lineItems, setLineItems] = useState<any[]>([
    {
      id: 1,
      material: "",
      quantity: 0,
      materialUnit: "",
      materialCost: 0,
      laborRate: 0,
      manhourUnit: 0,
    },
  ])
  const [additionalCosts, setAdditionalCosts] = useState<any[]>([])
  const [overhead, setOverhead] = useState(0)
  const [profit, setProfit] = useState(0)
  const [tax, setTax] = useState(0)
  const [exclusions, setExclusions] = useState("")
  const [projectName, setProjectName] = useState("")
  const [clientName, setClientName] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])

  // New state for contractor information
  const [contractorName, setContractorName] = useState("")
  const [contractorAddress, setContractorAddress] = useState("")
  const [contractorPhone, setContractorPhone] = useState("")
  const [contractorEmail, setContractorEmail] = useState("")

  // Global hourly rate that will be applied to all line items
  const [hourlyRate, setHourlyRate] = useState("")

  // Add state for photos
  const [photos, setPhotos] = useState<PhotoItem[]>([])

  const printRef = useRef<HTMLDivElement>(null)

  // Add this state at the top of the component with other state declarations
  const [currentEstimateId, setCurrentEstimateId] = useState<string | null>(null)
  const [previousMode, setPreviousMode] = useState<EstimatorMode | null>(null)

  // Effect to update all line items when hourly rate changes
  useEffect(() => {
    const rate = Number.parseFloat(hourlyRate) || 0
    if (rate > 0) {
      // Update all line items with the new rate
      setLineItems(
        lineItems.map((item) => ({
          ...item,
          laborRate: rate,
        })),
      )

      // Update all additional costs with the new rate
      setAdditionalCosts(
        additionalCosts.map((item) => ({
          ...item,
          laborRate: rate,
        })),
      )
    }
  }, [hourlyRate])

  // Effect to initialize the first line item with the hourly rate
  useEffect(() => {
    const rate = Number.parseFloat(hourlyRate) || 0
    if (rate > 0 && lineItems.length === 1 && lineItems[0].material === "") {
      setLineItems([
        {
          ...lineItems[0],
          laborRate: rate,
        },
      ])
    }
  }, [hourlyRate])

  // Add this useEffect hook after other useEffect hooks:

  useEffect(() => {
    // Add print-specific stylesheet
    const style = document.createElement("style")
    style.textContent = `
    @media print {
      @page {
        size: landscape;
        margin: 10mm;
      }
      body {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      .no-print {
        display: none !important;
      }
      table {
        page-break-inside: auto;
      }
      tr {
        page-break-inside: avoid;
        page-break-after: auto;
      }
      thead {
        display: table-header-group;
      }
      tfoot {
        display: table-footer-group;
      }
    }
  `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  // Update the handleSave function to use our offline storage
  const handleSave = async () => {
    if (demoMode) {
      alert("Saving is not available in demo mode.")
      return
    }

    try {
      // Create a simplified version of photos without the file object
      const simplifiedPhotos = photos.map(({ id, url, description }) => ({
        id,
        url,
        description,
      }))

      const estimateData: EstimateData = {
        id: currentEstimateId || undefined,
        projectName,
        clientName,
        date,
        lineItems,
        additionalCosts,
        overhead,
        profit,
        tax,
        exclusions,
        photos: simplifiedPhotos,
        totals: calculateTotals(),
        contractorInfo: {
          name: contractorName,
          address: contractorAddress,
          phone: contractorPhone,
          email: contractorEmail,
          hourlyRate,
        },
        lastModified: Date.now(),
        syncStatus: "pending",
        mode: mode,
      }

      const savedId = await saveEstimate(estimateData)
      setCurrentEstimateId(savedId)

      alert("Estimate saved successfully! It will sync with the server when you're online.")
      // Modify the handleSave function to clear localStorage after successful save to server
      // Find the handleSave function and add this line after the alert:
      localStorage.removeItem(LOCAL_STORAGE_KEY)
    } catch (error) {
      console.error("Error saving estimate:", error)
      alert("There was an error saving your estimate. Please try again.")
    }
  }

  // Let's implement a simple print function using the browser's native print functionality
  const handlePrint = () => {
    if (demoMode) {
      alert("Printing is not available in demo mode.")
      return
    }

    // Prepare the document for printing
    const originalTitle = document.title
    document.title = `${projectName || "Demolition"}_Estimate`

    // Add a small delay to ensure the document is ready
    setTimeout(() => {
      window.print()
      document.title = originalTitle
    }, 250)
  }

  // Demo mode limits
  const DEMO_MAX_LINE_ITEMS = 3
  const DEMO_MAX_MATERIALS = 10 // Only show first 10 materials in demo

  // Get limited material database for demo mode
  const demoMaterialDatabase = demoMode 
    ? activeMaterialDatabase.slice(0, DEMO_MAX_MATERIALS) 
    : activeMaterialDatabase

  const addLineItem = () => {
    // Limit line items in demo mode
    if (demoMode && lineItems.length >= DEMO_MAX_LINE_ITEMS) {
      alert(`Demo mode is limited to ${DEMO_MAX_LINE_ITEMS} line items. Subscribe for unlimited access!`)
      return
    }

    const newId = lineItems.length > 0 ? Math.max(...lineItems.map((item) => item.id)) + 1 : 1
    const rate = Number.parseFloat(hourlyRate) || 0

    setLineItems([
      ...lineItems,
      {
        id: newId,
        material: "",
        quantity: 0,
        materialUnit: "",
        materialCost: 0,
        laborRate: rate, // Use the global hourly rate
        manhourUnit: 0,
      },
    ])
  }

  const updateLineItem = (id: number, field: string, value: any) => {
    setLineItems(
      lineItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }

          // Auto-fill material unit and manhour unit when material is selected
          if (field === "material" && value) {
            const materialInfo = activeMaterialDatabase.find((m) => m.id === value)
            if (materialInfo) {
              updatedItem.materialUnit = materialInfo.unit
              updatedItem.manhourUnit = materialInfo.manhourUnit
            }
          }

          return updatedItem
        }
        return item
      }),
    )
  }

  const removeLineItem = (id: number) => {
    setLineItems(lineItems.filter((item) => item.id !== id))
  }

  const addAdditionalCost = () => {
    // Disable additional costs in demo mode
    if (demoMode) {
      alert("Additional costs are not available in demo mode. Subscribe for full access!")
      return
    }

    const newId = additionalCosts.length > 0 ? Math.max(...additionalCosts.map((item) => item.id)) + 1 : 1
    const rate = Number.parseFloat(hourlyRate) || 0

    setAdditionalCosts([
      ...additionalCosts,
      {
        id: newId,
        description: "",
        quantity: 0,
        unit: "",
        materialCost: 0,
        laborRate: rate, // Use the global hourly rate
        manhourUnit: 0,
      },
    ])
  }

  const updateAdditionalCost = (id: number, field: string, value: any) => {
    setAdditionalCosts(
      additionalCosts.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value }
        }
        return item
      }),
    )
  }

  const removeAdditionalCost = (id: number) => {
    setAdditionalCosts(additionalCosts.filter((item) => item.id !== id))
  }

  // Add photo handlers
  const handleAddPhoto = (photo: PhotoItem) => {
    setPhotos([...photos, photo])
  }

  const handleRemovePhoto = (id: string) => {
    setPhotos(photos.filter((photo) => photo.id !== id))
  }

  const handleUpdatePhotoDescription = (id: string, description: string) => {
    setPhotos(photos.map((photo) => (photo.id === id ? { ...photo, description } : photo)))
  }

  const calculateTotals = () => {
    // Calculate line item totals
    const lineItemsSubtotal = lineItems.reduce((sum, item) => {
      const quantity = Number.parseFloat(item.quantity) || 0
      const materialCost = Number.parseFloat(item.materialCost) || 0
      const laborRate = Number.parseFloat(item.laborRate) || 0
      const manhourUnit = Number.parseFloat(item.manhourUnit) || 0

      const totalMaterial = quantity * materialCost
      const totalManhours = quantity * manhourUnit
      const totalLabor = totalManhours * laborRate
      const lineTotal = totalMaterial + totalLabor

      return sum + lineTotal
    }, 0)

    // Calculate additional costs total
    const additionalCostsTotal = additionalCosts.reduce((sum, item) => {
      const quantity = Number.parseFloat(item.quantity) || 0
      const materialCost = Number.parseFloat(item.materialCost) || 0
      const laborRate = Number.parseFloat(item.laborRate) || 0
      const manhourUnit = Number.parseFloat(item.manhourUnit) || 0

      const totalMaterial = quantity * materialCost
      const totalManhours = quantity * manhourUnit
      const totalLabor = totalManhours * laborRate
      const lineTotal = totalMaterial + totalLabor

      return sum + lineTotal
    }, 0)

    // Calculate estimate subtotal
    const estimateSubtotal = lineItemsSubtotal + additionalCostsTotal

    // Calculate overhead
    const overheadAmount = estimateSubtotal * (Number.parseFloat(overhead.toString()) / 100 || 0)

    // Calculate profit
    const profitAmount = estimateSubtotal * (Number.parseFloat(profit.toString()) / 100 || 0)

    // Calculate tax
    const taxAmount = estimateSubtotal * (Number.parseFloat(tax.toString()) / 100 || 0)

    // Calculate final price
    const finalPrice = estimateSubtotal + overheadAmount + profitAmount + taxAmount

    return {
      lineItemsSubtotal,
      additionalCostsTotal,
      estimateSubtotal,
      overheadAmount,
      profitAmount,
      taxAmount,
      finalPrice,
    }
  }

  const totals = calculateTotals()
  const disableInputs = demoMode || testMode

  // Add this useEffect to save form data to localStorage whenever it changes
  useEffect(() => {
    // Only save if not in demo mode and after initial load
    if (!demoMode && previousMode === mode) {
      const formData = {
        lineItems: lineItems.map((item) => ({
          ...item,
          // Ensure numeric values are properly saved
          quantity: typeof item.quantity === "string" ? Number.parseFloat(item.quantity) || 0 : item.quantity || 0,
          materialCost:
            typeof item.materialCost === "string" ? Number.parseFloat(item.materialCost) || 0 : item.materialCost || 0,
          laborRate: typeof item.laborRate === "string" ? Number.parseFloat(item.laborRate) || 0 : item.laborRate || 0,
          manhourUnit:
            typeof item.manhourUnit === "string" ? Number.parseFloat(item.manhourUnit) || 0 : item.manhourUnit || 0,
        })),
        additionalCosts: additionalCosts.map((item) => ({
          ...item,
          // Ensure numeric values are properly saved
          quantity: typeof item.quantity === "string" ? Number.parseFloat(item.quantity) || 0 : item.quantity || 0,
          materialCost:
            typeof item.materialCost === "string" ? Number.parseFloat(item.materialCost) || 0 : item.materialCost || 0,
          laborRate: typeof item.laborRate === "string" ? Number.parseFloat(item.laborRate) || 0 : item.laborRate || 0,
          manhourUnit:
            typeof item.manhourUnit === "string" ? Number.parseFloat(item.manhourUnit) || 0 : item.manhourUnit || 0,
        })),
        overhead: typeof overhead === "string" ? Number.parseFloat(overhead) || 0 : overhead || 0,
        profit: typeof profit === "string" ? Number.parseFloat(profit) || 0 : profit || 0,
        tax: typeof tax === "string" ? Number.parseFloat(tax) || 0 : tax || 0,
        exclusions,
        projectName,
        clientName,
        date,
        contractorName,
        contractorAddress,
        contractorPhone,
        contractorEmail,
        hourlyRate,
        photos,
        mode, // Include the current mode
      }

      // Save to the mode-specific key
      const modeSpecificKey = getStorageKey(mode)
      localStorage.setItem(modeSpecificKey, JSON.stringify(formData))
      console.log(`Auto-saved ${mode} data to ${modeSpecificKey}`)
    }
  }, [
    lineItems,
    additionalCosts,
    overhead,
    profit,
    tax,
    exclusions,
    projectName,
    clientName,
    date,
    contractorName,
    contractorAddress,
    contractorPhone,
    contractorEmail,
    hourlyRate,
    photos,
    mode,
    demoMode,
    previousMode,
  ])

  // Add a more aggressive form reset function:
  const forceCompleteReset = () => {
    console.log(`FORCE RESET: Completely resetting form for mode: ${mode}`)

    // Reset all form fields to their default values
    setLineItems([
      {
        id: 1,
        material: "",
        quantity: 0,
        materialUnit: "",
        materialCost: 0,
        laborRate: 0,
        manhourUnit: 0,
      },
    ])
    setAdditionalCosts([])
    setOverhead(0)
    setProfit(0)
    setTax(0)
    setExclusions("")
    setProjectName("")
    setClientName("")
    setDate(new Date().toISOString().split("T")[0])
    setContractorName("")
    setContractorAddress("")
    setContractorPhone("")
    setContractorEmail("")
    setHourlyRate("")
    setPhotos([])

    // Also clear the current estimate ID
    setCurrentEstimateId(null)

    console.log("FORCE RESET: Form has been completely reset")
  }

  // Add this useEffect to load form data from localStorage on component mount or mode change
  // Add a new state to track the previous mode

  // Then replace the useEffect with this version:
  useEffect(() => {
    console.log(`Mode change detected: ${mode}, Previous mode: ${previousMode}`)

    // Only handle mode changes
    if (previousMode !== null && previousMode !== mode) {
      console.log(`Mode changed from ${previousMode} to ${mode}`)

      // Save current data for the previous mode before switching
      if (!demoMode) {
        const previousModeKey = getStorageKey(previousMode)
        const formData = {
          lineItems,
          additionalCosts,
          overhead,
          profit,
          tax,
          exclusions,
          projectName,
          clientName,
          date,
          contractorName,
          contractorAddress,
          contractorPhone,
          contractorEmail,
          hourlyRate,
          photos,
          mode: previousMode,
        }
        console.log(`Saving ${previousMode} data before switching modes`)
        localStorage.setItem(previousModeKey, JSON.stringify(formData))
      }

      // Update previous mode
      setPreviousMode(mode)

      // Load data for the new mode - but don't reset first
      const modeSpecificKey = getStorageKey(mode)
      console.log(`Loading data for mode: ${mode} from key: ${modeSpecificKey}`)

      if (!demoMode) {
        try {
          const savedData = localStorage.getItem(modeSpecificKey)
          console.log("Found saved data:", savedData ? "YES" : "NO")

          if (savedData) {
            const parsedData = JSON.parse(savedData)
            console.log("Parsed data mode:", parsedData.mode, "Current mode:", mode)

            // Double-check that the data is for the current mode
            if (parsedData.mode === mode) {
              console.log("Loading saved data for mode:", mode)

              // Load data in a specific order
              if (parsedData.hourlyRate) setHourlyRate(parsedData.hourlyRate)

              if (parsedData.lineItems && parsedData.lineItems.length > 0) {
                const rate = parsedData.hourlyRate ? Number.parseFloat(parsedData.hourlyRate) : 0
                setLineItems(
                  parsedData.lineItems.map((item) => ({
                    ...item,
                    // Ensure numeric values are properly parsed
                    quantity:
                      typeof item.quantity === "string" ? Number.parseFloat(item.quantity) || 0 : item.quantity || 0,
                    materialCost:
                      typeof item.materialCost === "string"
                        ? Number.parseFloat(item.materialCost) || 0
                        : item.materialCost || 0,
                    laborRate:
                      rate ||
                      (typeof item.laborRate === "string"
                        ? Number.parseFloat(item.laborRate) || 0
                        : item.laborRate || 0),
                    manhourUnit:
                      typeof item.manhourUnit === "string"
                        ? Number.parseFloat(item.manhourUnit) || 0
                        : item.manhourUnit || 0,
                  })),
                )
              } else {
                // Set default line item if none exist
                setLineItems([
                  {
                    id: 1,
                    material: "",
                    quantity: 0,
                    materialUnit: "",
                    materialCost: 0,
                    laborRate: Number.parseFloat(parsedData.hourlyRate) || 0,
                    manhourUnit: 0,
                  },
                ])
              }

              if (parsedData.additionalCosts && parsedData.additionalCosts.length > 0) {
                const rate = parsedData.hourlyRate ? Number.parseFloat(parsedData.hourlyRate) : 0
                setAdditionalCosts(
                  parsedData.additionalCosts.map((item) => ({
                    ...item,
                    // Ensure numeric values are properly parsed
                    quantity:
                      typeof item.quantity === "string" ? Number.parseFloat(item.quantity) || 0 : item.quantity || 0,
                    materialCost:
                      typeof item.materialCost === "string"
                        ? Number.parseFloat(item.materialCost) || 0
                        : item.materialCost || 0,
                    laborRate:
                      rate ||
                      (typeof item.laborRate === "string"
                        ? Number.parseFloat(item.laborRate) || 0
                        : item.laborRate || 0),
                    manhourUnit:
                      typeof item.manhourUnit === "string"
                        ? Number.parseFloat(item.manhourUnit) || 0
                        : item.manhourUnit || 0,
                  })),
                )
              } else {
                setAdditionalCosts([])
              }

              if (parsedData.overhead !== undefined) {
                const overheadValue =
                  typeof parsedData.overhead === "string"
                    ? Number.parseFloat(parsedData.overhead) || 0
                    : parsedData.overhead || 0
                console.log("Setting overhead:", overheadValue)
                setOverhead(overheadValue)
              }

              if (parsedData.profit !== undefined) {
                const profitValue =
                  typeof parsedData.profit === "string"
                    ? Number.parseFloat(parsedData.profit) || 0
                    : parsedData.profit || 0
                console.log("Setting profit:", profitValue)
                setProfit(profitValue)
              }

              if (parsedData.tax !== undefined) {
                const taxValue =
                  typeof parsedData.tax === "string" ? Number.parseFloat(parsedData.tax) || 0 : parsedData.tax || 0
                console.log("Setting tax:", taxValue)
                setTax(taxValue)
              }

              if (parsedData.exclusions) {
                console.log("Setting exclusions to:", parsedData.exclusions)
                setExclusions(parsedData.exclusions)
              } else {
                console.log("No exclusions found in saved data")
                setExclusions("")
              }

              if (parsedData.projectName) setProjectName(parsedData.projectName)
              if (parsedData.clientName) setClientName(parsedData.clientName)
              if (parsedData.date) setDate(parsedData.date)
              if (parsedData.contractorName) setContractorName(parsedData.contractorName)
              if (parsedData.contractorAddress) setContractorAddress(parsedData.contractorAddress)
              if (parsedData.contractorPhone) setContractorPhone(parsedData.contractorPhone)
              if (parsedData.contractorEmail) setContractorEmail(parsedData.contractorEmail)
              if (parsedData.photos) setPhotos(parsedData.photos)
            } else {
              console.log("Saved data mode doesn't match current mode, not loading data")
              // Set defaults for new mode
              setLineItems([
                {
                  id: 1,
                  material: "",
                  quantity: 0,
                  materialUnit: "",
                  materialCost: 0,
                  laborRate: 0,
                  manhourUnit: 0,
                },
              ])
              setAdditionalCosts([])
              setOverhead(0)
              setProfit(0)
              setTax(0)
              setExclusions("")
              setProjectName("")
              setClientName("")
              setDate(new Date().toISOString().split("T")[0])
              setContractorName("")
              setContractorAddress("")
              setContractorPhone("")
              setContractorEmail("")
              setHourlyRate("")
              setPhotos([])
            }
          } else {
            console.log("No saved data found for mode:", mode)
            // Set defaults for new mode
            setLineItems([
              {
                id: 1,
                material: "",
                quantity: 0,
                materialUnit: "",
                materialCost: 0,
                laborRate: 0,
                manhourUnit: 0,
              },
            ])
            setAdditionalCosts([])
            setOverhead(0)
            setProfit(0)
            setTax(0)
            setExclusions("")
            setProjectName("")
            setClientName("")
            setDate(new Date().toISOString().split("T")[0])
            setContractorName("")
            setContractorAddress("")
            setContractorPhone("")
            setContractorEmail("")
            setHourlyRate("")
            setPhotos([])
          }
        } catch (error) {
          console.error("Error loading saved form data:", error)
        }
      }
    } else if (previousMode === null) {
      // First load - set previous mode and load data
      setPreviousMode(mode)

      // Load data for the current mode
      const modeSpecificKey = getStorageKey(mode)
      console.log(`Initial load for mode: ${mode} from key: ${modeSpecificKey}`)

      if (!demoMode) {
        try {
          const savedData = localStorage.getItem(modeSpecificKey)
          console.log("Found saved data on initial load:", savedData ? "YES" : "NO")

          if (savedData) {
            const parsedData = JSON.parse(savedData)

            // Load all the data fields with proper numeric parsing
            if (parsedData.hourlyRate) setHourlyRate(parsedData.hourlyRate)

            if (parsedData.lineItems && parsedData.lineItems.length > 0) {
              const rate = parsedData.hourlyRate ? Number.parseFloat(parsedData.hourlyRate) : 0
              setLineItems(
                parsedData.lineItems.map((item) => ({
                  ...item,
                  // Ensure numeric values are properly parsed
                  quantity:
                    typeof item.quantity === "string" ? Number.parseFloat(item.quantity) || 0 : item.quantity || 0,
                  materialCost:
                    typeof item.materialCost === "string"
                      ? Number.parseFloat(item.materialCost) || 0
                      : item.materialCost || 0,
                  laborRate:
                    rate ||
                    (typeof item.laborRate === "string" ? Number.parseFloat(item.laborRate) || 0 : item.laborRate || 0),
                  manhourUnit:
                    typeof item.manhourUnit === "string"
                      ? Number.parseFloat(item.manhourUnit) || 0
                      : item.manhourUnit || 0,
                })),
              )
            }

            if (parsedData.additionalCosts && parsedData.additionalCosts.length > 0) {
              const rate = parsedData.hourlyRate ? Number.parseFloat(parsedData.hourlyRate) : 0
              setAdditionalCosts(
                parsedData.additionalCosts.map((item) => ({
                  ...item,
                  // Ensure numeric values are properly parsed
                  quantity:
                    typeof item.quantity === "string" ? Number.parseFloat(item.quantity) || 0 : item.quantity || 0,
                  materialCost:
                    typeof item.materialCost === "string"
                      ? Number.parseFloat(item.materialCost) || 0
                      : item.materialCost || 0,
                  laborRate:
                    rate ||
                    (typeof item.laborRate === "string" ? Number.parseFloat(item.laborRate) || 0 : item.laborRate || 0),
                  manhourUnit:
                    typeof item.manhourUnit === "string"
                      ? Number.parseFloat(item.manhourUnit) || 0
                      : item.manhourUnit || 0,
                })),
              )
            }

            if (parsedData.overhead !== undefined)
              setOverhead(
                typeof parsedData.overhead === "string"
                  ? Number.parseFloat(parsedData.overhead) || 0
                  : parsedData.overhead || 0,
              )
            if (parsedData.profit !== undefined)
              setProfit(
                typeof parsedData.profit === "string"
                  ? Number.parseFloat(parsedData.profit) || 0
                  : parsedData.profit || 0,
              )
            if (parsedData.tax !== undefined)
              setTax(typeof parsedData.tax === "string" ? Number.parseFloat(parsedData.tax) || 0 : parsedData.tax || 0)
            if (parsedData.exclusions) setExclusions(parsedData.exclusions)
            if (parsedData.projectName) setProjectName(parsedData.projectName)
            if (parsedData.clientName) setClientName(parsedData.clientName)
            if (parsedData.date) setDate(parsedData.date)
            if (parsedData.contractorName) setContractorName(parsedData.contractorName)
            if (parsedData.contractorAddress) setContractorAddress(parsedData.contractorAddress)
            if (parsedData.contractorPhone) setContractorPhone(parsedData.contractorPhone)
            if (parsedData.contractorEmail) setContractorEmail(parsedData.contractorEmail)
            if (parsedData.photos) setPhotos(parsedData.photos)
          }
        } catch (error) {
          console.error("Error loading saved form data on initial load:", error)
        }
      }
    }
  }, [mode, demoMode]) // Only depend on mode and demoMode

  // 3. Add a separate effect for saving data
  useEffect(() => {
    // Only save if not in demo mode and after initial load
    if (!demoMode && previousMode === mode) {
      const formData = {
        lineItems: lineItems.map((item) => ({
          ...item,
          // Ensure numeric values are properly saved
          quantity: typeof item.quantity === "string" ? Number.parseFloat(item.quantity) || 0 : item.quantity || 0,
          materialCost:
            typeof item.materialCost === "string" ? Number.parseFloat(item.materialCost) || 0 : item.materialCost || 0,
          laborRate: typeof item.laborRate === "string" ? Number.parseFloat(item.laborRate) || 0 : item.laborRate || 0,
          manhourUnit:
            typeof item.manhourUnit === "string" ? Number.parseFloat(item.manhourUnit) || 0 : item.manhourUnit || 0,
        })),
        additionalCosts: additionalCosts.map((item) => ({
          ...item,
          // Ensure numeric values are properly saved
          quantity: typeof item.quantity === "string" ? Number.parseFloat(item.quantity) || 0 : item.quantity || 0,
          materialCost:
            typeof item.materialCost === "string" ? Number.parseFloat(item.materialCost) || 0 : item.materialCost || 0,
          laborRate: typeof item.laborRate === "string" ? Number.parseFloat(item.laborRate) || 0 : item.laborRate || 0,
          manhourUnit:
            typeof item.manhourUnit === "string" ? Number.parseFloat(item.manhourUnit) || 0 : item.manhourUnit || 0,
        })),
        overhead: typeof overhead === "string" ? Number.parseFloat(overhead) || 0 : overhead || 0,
        profit: typeof profit === "string" ? Number.parseFloat(profit) || 0 : profit || 0,
        tax: typeof tax === "string" ? Number.parseFloat(tax) || 0 : tax || 0,
        exclusions,
        projectName,
        clientName,
        date,
        contractorName,
        contractorAddress,
        contractorPhone,
        contractorEmail,
        hourlyRate,
        photos,
        mode, // Include the current mode
      }

      // Save to the mode-specific key
      const modeSpecificKey = getStorageKey(mode)
      localStorage.setItem(modeSpecificKey, JSON.stringify(formData))
      console.log(`Auto-saved ${mode} data to ${modeSpecificKey}`)
    }
  }, [
    lineItems,
    additionalCosts,
    overhead,
    profit,
    tax,
    exclusions,
    projectName,
    clientName,
    date,
    contractorName,
    contractorAddress,
    contractorPhone,
    contractorEmail,
    hourlyRate,
    photos,
    mode,
    demoMode,
    previousMode,
  ])

  // Add a separate effect to ensure labor rate is applied to line items
  useEffect(() => {
    // Apply the hourly rate to all line items whenever mode changes
    const rate = Number.parseFloat(hourlyRate) || 0
    if (rate > 0) {
      setLineItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          laborRate: rate,
        })),
      )

      setAdditionalCosts((prevCosts) =>
        prevCosts.map((item) => ({
          ...item,
          laborRate: rate,
        })),
      )
    }
  }, [mode, hourlyRate])

  // Add a function to clear form data when needed
  const clearFormData = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY)
    setLineItems([
      {
        id: 1,
        material: "",
        quantity: 0,
        materialUnit: "",
        materialCost: 0,
        laborRate: 0,
        manhourUnit: 0,
      },
    ])
    setAdditionalCosts([])
    setOverhead(0)
    setProfit(0)
    setTax(0)
    setExclusions("")
    setProjectName("")
    setClientName("")
    setDate(new Date().toISOString().split("T")[0])
    setContractorName("")
    setContractorAddress("")
    setContractorPhone("")
    setContractorEmail("")
    setHourlyRate("")
    setPhotos([])
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 py-6">
      <div className="container mx-auto px-4">
        {demoMode && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="font-bold text-lg">Demo Mode - Limited Access</p>
                <ul className="text-sm mt-2 space-y-1">
                  <li>- Maximum {DEMO_MAX_LINE_ITEMS} line items</li>
                  <li>- {DEMO_MAX_MATERIALS} materials available (of {activeMaterialDatabase.length}+)</li>
                  <li>- No saving or printing</li>
                  <li>- No additional costs</li>
                  <li>- No photo gallery</li>
                </ul>
              </div>
              <a 
                href="/subscribe" 
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-center transition-colors whitespace-nowrap"
              >
                Subscribe for $499/year
              </a>
            </div>
          </div>
        )}
        {/* Add the OfflineStatus component to the UI, right after the buttons at the top */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
          <Button
            variant="outline"
            onClick={() => {
              // Save current form data before navigating away
              if (!demoMode) {
                const modeSpecificKey = getStorageKey(mode)
                const formData = {
                  lineItems,
                  additionalCosts,
                  overhead,
                  profit,
                  tax,
                  exclusions,
                  projectName,
                  clientName,
                  date,
                  contractorName,
                  contractorAddress,
                  contractorPhone,
                  contractorEmail,
                  hourlyRate,
                  photos,
                  mode, // Include the current mode
                }
                console.log(`Saving ${mode} data to ${modeSpecificKey} before navigating away`)
                localStorage.setItem(modeSpecificKey, JSON.stringify(formData))
              }
              onBackClick()
            }}
            className="flex items-center gap-1 no-print"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Cover Page
          </Button>
          {/* Add this right after the OfflineStatus component in the UI */}
          <div className="flex flex-wrap items-center gap-2">
            <OfflineStatus />
            <Button
              variant="outline"
              onClick={() => setShowInstructions(true)}
              className="flex items-center gap-1 no-print"
            >
              <HelpCircle className="h-4 w-4" /> Instructions
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowCategoryList(true)}
              className="flex items-center gap-1 no-print"
            >
              <List className="h-4 w-4" /> View All Categories
            </Button>
            <Button
              variant="outline"
              onClick={handleSave}
              className="flex items-center gap-1 no-print bg-transparent"
              disabled={demoMode}
            >
              <Save className="h-4 w-4" /> Save
            </Button>
            {/* Then update the button onClick handler to just call handlePrint without any conditions: */}
            <Button
              variant="outline"
              onClick={handlePrint}
              className="flex items-center gap-1 no-print bg-transparent"
              disabled={demoMode}
            >
              <Printer className="h-4 w-4" /> Print
            </Button>
            {/* Add a "Clear Form" button in the UI
            Find the button group in the UI and add this button: */}
            <Button
              variant="outline"
              onClick={clearFormData}
              className="flex items-center gap-1 no-print bg-transparent"
              disabled={demoMode}
            >
              <Trash2 className="h-4 w-4" /> Clear Form
            </Button>
          </div>
        </div>

        <Card className="bg-white shadow-lg mb-6">
          <CardHeader className="bg-blue-600 text-white">
            <CardTitle className="text-2xl">
              E-Deck Estimator {isCommercial ? "(Commercial)" : "(Residential)"}
            </CardTitle>
            {onModeSwitch && !demoMode && (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-blue-100">Switch Mode:</span>
                <div className="flex bg-blue-700 rounded-lg p-1">
                  <Button
                    variant={isCommercial ? "ghost" : "default"}
                    size="sm"
                    className={`flex items-center gap-1 text-xs ${
                      !isCommercial ? "bg-blue-500" : "text-blue-100 hover:text-white"
                    }`}
                    onClick={() => {
                      // First save current form data with the CURRENT mode key
                      if (!demoMode) {
                        const currentModeKey = getStorageKey(mode)
                        const formData = {
                          lineItems,
                          additionalCosts,
                          overhead,
                          profit,
                          tax,
                          exclusions,
                          projectName,
                          clientName,
                          date,
                          contractorName,
                          contractorAddress,
                          contractorPhone,
                          contractorEmail,
                          hourlyRate,
                          photos,
                          mode, // Include the current mode
                        }
                        console.log(`Saving ${mode} data to ${currentModeKey} before switching to residential`)
                        localStorage.setItem(currentModeKey, JSON.stringify(formData))
                      }

                      // Then switch mode - this will trigger the useEffect that loads mode-specific data
                      onModeSwitch("residential")
                    }}
                  >
                    <Home className="h-3 w-3" />
                    Residential
                  </Button>
                  <Button
                    variant={isCommercial ? "default" : "ghost"}
                    size="sm"
                    className={`flex items-center gap-1 text-xs ${
                      isCommercial ? "bg-blue-500" : "text-blue-100 hover:text-white"
                    }`}
                    onClick={() => {
                      // First save current form data with the CURRENT mode key
                      if (!demoMode) {
                        const currentModeKey = getStorageKey(mode)
                        const formData = {
                          lineItems,
                          additionalCosts,
                          overhead,
                          profit,
                          tax,
                          exclusions,
                          projectName,
                          clientName,
                          date,
                          contractorName,
                          contractorAddress,
                          contractorPhone,
                          contractorEmail,
                          hourlyRate,
                          photos,
                          mode, // Include the current mode
                        }
                        console.log(`Saving ${mode} data to ${currentModeKey} before switching to commercial`)
                        localStorage.setItem(currentModeKey, JSON.stringify(formData))
                      }

                      // Then switch mode - this will trigger the useEffect that loads mode-specific data
                      onModeSwitch("commercial")
                    }}
                  >
                    <Building className="h-3 w-3" />
                    Commercial
                  </Button>
                </div>
              </div>
            )}
            <CardDescription className="text-blue-100">
              Create detailed {isCommercial ? "commercial" : "residential"} demolition estimates quickly and easily
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="text-blue-700 font-medium">How to use this form:</p>
              <ol className="list-decimal list-inside text-blue-600 mt-2">
                <li>Enter project details (name, client, date)</li>
                <li>Set your default hourly labor rate (will apply to all items)</li>
                <li>Add demolition items using the "Add Item" button</li>
                <li>Include any additional costs</li>
                <li>Add photos of the project site or items to be demolished</li>
                <li>Adjust overhead, profit, and tax percentages</li>
                <li>Review the final price and add any exclusions</li>
                <li>Save or print your estimate</li>
              </ol>
            </div>

            <div ref={printRef}>
              <div className="print:block hidden">
                <CoverPage isCommercial={isCommercial} />
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold text-blue-800">
                    {isCommercial ? "COMMERCIAL" : "RESIDENTIAL"} DEMOLITION ESTIMATE
                  </h1>
                  <p className="text-sm text-blue-600">by S F Johnson Enterprises, LLC</p>
                </div>

                {/* Contractor Information */}
                <Card className="mb-6 border border-blue-200">
                  <CardHeader className="bg-blue-50">
                    <CardTitle className="text-lg text-blue-800">Contractor Information</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contractorName" className="text-blue-700">
                        Contractor Name
                      </Label>
                      <Input
                        id="contractorName"
                        value={contractorName}
                        onChange={(e) => setContractorName(e.target.value)}
                        placeholder="Enter contractor name"
                        className="border-blue-300 focus:border-blue-500"
                        disabled={disableInputs}
                      />
                    </div>
                    <div>
                      <Label htmlFor="contractorAddress" className="text-blue-700">
                        Address
                      </Label>
                      <Input
                        id="contractorAddress"
                        value={contractorAddress}
                        onChange={(e) => setContractorAddress(e.target.value)}
                        placeholder="Enter contractor address"
                        className="border-blue-300 focus:border-blue-500"
                        disabled={disableInputs}
                      />
                    </div>
                    <div>
                      <Label htmlFor="contractorPhone" className="text-blue-700">
                        Phone
                      </Label>
                      <Input
                        id="contractorPhone"
                        value={contractorPhone}
                        onChange={(e) => setContractorPhone(e.target.value)}
                        placeholder="Enter contractor phone"
                        className="border-blue-300 focus:border-blue-500"
                        disabled={disableInputs}
                      />
                    </div>
                    <div>
                      <Label htmlFor="contractorEmail" className="text-blue-700">
                        Email
                      </Label>
                      <Input
                        id="contractorEmail"
                        value={contractorEmail}
                        onChange={(e) => setContractorEmail(e.target.value)}
                        placeholder="Enter contractor email"
                        className="border-blue-300 focus:border-blue-500"
                        disabled={disableInputs}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="hourlyRate" className="text-blue-700 font-semibold">
                        Default Hourly Labor Rate ($ per hour)
                      </Label>
                      <Input
                        id="hourlyRate"
                        type="number"
                        value={hourlyRate}
                        onChange={(e) => setHourlyRate(e.target.value)}
                        placeholder="Enter default hourly rate"
                        className="border-blue-300 focus:border-blue-500 max-w-xs"
                        disabled={disableInputs}
                      />
                      <p className="text-sm text-blue-600 mt-1">
                        This rate will be applied to all line items automatically
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Project Information */}
                <Card className="mb-6 border border-blue-200">
                  <CardHeader className="bg-blue-50">
                    <CardTitle className="text-lg text-blue-800">Project Information</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="projectName" className="text-blue-700">
                        Project Name
                      </Label>
                      <Input
                        id="projectName"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder="Enter project name"
                        className="border-blue-300 focus:border-blue-500"
                        disabled={disableInputs}
                      />
                    </div>
                    <div>
                      <Label htmlFor="clientName" className="text-blue-700">
                        Client Name
                      </Label>
                      <Input
                        id="clientName"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Enter client name"
                        className="border-blue-300 focus:border-blue-500"
                        disabled={disableInputs}
                      />
                    </div>
                    <div>
                      <Label htmlFor="date" className="text-blue-700">
                        Date
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="border-blue-300 focus:border-blue-500"
                        disabled={disableInputs}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Demolition Items */}
                <Card className="mb-6 border border-blue-200">
                  <CardHeader className="bg-blue-50">
                    <CardTitle className="text-lg text-blue-800">Demolition Items</CardTitle>
                    <CardDescription className="text-blue-600">
                      Add all demolition items below. Click the + button to add more items.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MobileTableNotice />
                    <div className="overflow-x-auto -mx-4 sm:mx-0">
                      <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden">
                          <table className="min-w-full border-collapse print:table-fixed">
                            <thead>
                              <tr className="bg-gray-100 text-left text-xs">
                                <th className="p-2 border">Material</th>
                                <th className="p-2 border w-24">Qty</th>
                                <th className="p-2 border w-20">Unit</th>
                                <th className="p-2 border w-28">Material Cost</th>
                                <th className="p-2 border w-28">Total Material</th>
                                <th className="p-2 border w-28">Labor Rate</th>
                                <th className="p-2 border w-24">MH Unit</th>
                                <th className="p-2 border w-28">Total MH</th>
                                <th className="p-2 border w-28">Total Labor</th>
                                <th className="p-2 border w-28">Line Total</th>
                                <th className="p-2 border w-12"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {lineItems.map((item) => (
                                <LineItem
                                  key={item.id}
                                  item={item}
                                  updateLineItem={updateLineItem}
                                  removeLineItem={removeLineItem}
                                  disabled={disableInputs}
                                  materialDatabase={demoMode ? demoMaterialDatabase : activeMaterialDatabase}
                                />
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addLineItem}
                      className="mt-4 flex items-center gap-1 text-blue-600 border-blue-300 hover:bg-blue-50 no-print bg-transparent"
                      disabled={disableInputs}
                    >
                      <Plus className="h-4 w-4" /> Add Item
                    </Button>
                  </CardContent>
                </Card>

                {/* Additional Costs */}
                <Card className="mb-6 border border-blue-200">
                  <CardHeader className="bg-blue-50">
                    <CardTitle className="text-lg text-blue-800">Additional Costs</CardTitle>
                    <CardDescription className="text-blue-600">
                      Add any additional costs such as permits, equipment, or other expenses.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MobileTableNotice />
                    <div className="overflow-x-auto -mx-4 sm:mx-0">
                      <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden">
                          <table className="min-w-full border-collapse print:table-fixed">
                            <thead>
                              <tr className="bg-gray-100 text-left text-xs">
                                <th className="p-2 border">Description</th>
                                <th className="p-2 border w-16">Qty</th>
                                <th className="p-2 border w-16">Unit</th>
                                <th className="p-2 border w-24">Material Cost</th>
                                <th className="p-2 border w-24">Total Material</th>
                                <th className="p-2 border w-24">Labor Rate</th>
                                <th className="p-2 border w-16">MH Unit</th>
                                <th className="p-2 border w-24">Total MH</th>
                                <th className="p-2 border w-24">Total Labor</th>
                                <th className="p-2 border w-24">Line Total</th>
                                <th className className="p-2 border w-12"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {additionalCosts.map((item) => (
                                <AdditionalCosts
                                  key={item.id}
                                  item={item}
                                  updateAdditionalCost={updateAdditionalCost}
                                  removeAdditionalCost={removeAdditionalCost}
                                  disabled={disableInputs}
                                />
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addAdditionalCost}
                      className="mt-4 flex items-center gap-1 text-blue-600 border-blue-300 hover:bg-blue-50 no-print bg-transparent"
                      disabled={disableInputs}
                    >
                      <Plus className="h-4 w-4" /> Add Additional Cost
                    </Button>
                  </CardContent>
                </Card>

                {/* Totals and Final Price */}
                <div className="flex justify-end mb-6">
                  <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div className="font-semibold text-right">Items Subtotal:</div>
                      <div className="text-right">${totals.lineItemsSubtotal.toFixed(2)}</div>

                      <div className="font-semibold text-right">Additional Costs:</div>
                      <div className="text-right">${totals.additionalCostsTotal.toFixed(2)}</div>

                      <div className="font-semibold text-right border-t pt-1">Estimate Subtotal:</div>
                      <div className="text-right border-t pt-1">${totals.estimateSubtotal.toFixed(2)}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 items-center mb-2">
                      <div className="font-semibold text-right">Overhead (%):</div>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={overhead}
                          onChange={(e) => setOverhead(Number.parseFloat(e.target.value) || 0)}
                          className="w-20 text-right border-blue-300 focus:border-blue-500 no-print"
                          disabled={disableInputs}
                        />
                        <div className="text-right w-20">${totals.overheadAmount.toFixed(2)}</div>
                      </div>

                      <div className="font-semibold text-right">Profit (%):</div>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={profit}
                          onChange={(e) => setProfit(Number.parseFloat(e.target.value) || 0)}
                          className="w-20 text-right border-blue-300 focus:border-blue-500 no-print"
                          disabled={disableInputs}
                        />
                        <div className="text-right w-20">${totals.profitAmount.toFixed(2)}</div>
                      </div>

                      <div className="font-semibold text-right">Tax (%):</div>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={tax}
                          onChange={(e) => setTax(Number.parseFloat(e.target.value) || 0)}
                          className="w-20 text-right border-blue-300 focus:border-blue-500 no-print"
                          disabled={disableInputs}
                        />
                        <div className="text-right w-20">${totals.taxAmount.toFixed(2)}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div className="font-semibold text-right border-t border-black pt-1 text-lg">
                        Proposed Demolition Price:
                      </div>
                      <div className="text-right border-t border-black pt-1 text-lg font-bold">
                        ${totals.finalPrice.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Exclusions */}
                <div className="mb-6">
                  <Label htmlFor="exclusions" className="font-semibold text-blue-700">
                    Exclusions:
                  </Label>
                  <Textarea
                    id="exclusions"
                    key={`exclusions-${mode}`} // Add this line to force re-render on mode change
                    value={exclusions}
                    onChange={(e) => {
                      console.log("Setting exclusions to:", e.target.value)
                      setExclusions(e.target.value)
                    }}
                    placeholder="Enter any exclusions or notes for this estimate"
                    className="min-h-[100px] border-blue-300 focus:border-blue-500"
                    disabled={disableInputs}
                  />
                </div>

                {/* Photo Gallery - Hidden in Demo Mode */}
                {!demoMode && (
                  <PhotoGallery
                    photos={photos}
                    onAddPhoto={handleAddPhoto}
                    onRemovePhoto={handleRemovePhoto}
                    onUpdatePhotoDescription={handleUpdatePhotoDescription}
                    disabled={disableInputs}
                  />
                )}
                {demoMode && (
                  <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 mb-6 text-center">
                    <p className="text-gray-500 font-medium">Photo Gallery - Available with subscription</p>
                    <a href="/subscribe" className="text-blue-600 underline text-sm">Upgrade to access</a>
                  </div>
                )}

                {/* Chart - Hidden in Demo Mode */}
                {!demoMode && (
                  <SimpleChart
                    lineItems={lineItems}
                    additionalCosts={additionalCosts}
                    materialDatabase={activeMaterialDatabase}
                  />
                )}
                {demoMode && (
                  <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 mb-6 text-center">
                    <p className="text-gray-500 font-medium">Cost Breakdown Chart - Available with subscription</p>
                    <a href="/subscribe" className="text-blue-600 underline text-sm">Upgrade to access</a>
                  </div>
                )}
                {/* Add this after the SimpleChart component */}
                {/* We can add the DataDebugger component here if needed 
              <DataDebugger
                lineItems={lineItems}
                additionalCosts={additionalCosts}
                materialDatabase={activeMaterialDatabase}
              /> */}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
