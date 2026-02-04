"use client"

import { useState, useEffect } from "react"
import { Info } from "lucide-react"

export default function MobileTableNotice() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  if (!isMobile) return null

  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-4 flex items-start">
      <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
      <div className="text-sm text-blue-700">
        <p className="font-medium">Mobile View</p>
        <p>
          Scroll horizontally to see all columns in the tables. For the best experience, use a tablet or desktop device.
        </p>
      </div>
    </div>
  )
}
