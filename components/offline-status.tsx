"use client"

import { useState, useEffect } from "react"
import { Wifi, WifiOff } from "lucide-react"

export default function OfflineStatus() {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    // Set initial state
    setIsOnline(navigator.onLine)

    // Add event listeners
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Clean up
    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  if (isOnline) {
    return (
      <div className="flex items-center text-green-600 text-sm">
        <Wifi className="h-4 w-4 mr-1" />
        <span>Online</span>
      </div>
    )
  }

  return (
    <div className="flex items-center text-amber-600 text-sm">
      <WifiOff className="h-4 w-4 mr-1" />
      <span>Offline - Changes will sync when connection is restored</span>
    </div>
  )
}
