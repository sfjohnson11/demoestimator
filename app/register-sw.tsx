"use client"

import { useEffect } from "react"
import { setupConnectivityListeners } from "@/lib/offline-storage"

export default function RegisterServiceWorker() {
  useEffect(() => {
    // Register service worker
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((registration) => {
            console.log("ServiceWorker registration successful with scope: ", registration.scope)
          })
          .catch((error) => {
            console.error("ServiceWorker registration failed: ", error)
          })
      })
    }

    // Setup connectivity listeners
    setupConnectivityListeners()
  }, [])

  return null
}
