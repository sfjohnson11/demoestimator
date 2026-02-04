"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type EstimatorMode, type AppConfig, modeConfigs } from "@/types/app-config"

interface AppContextType {
  mode: EstimatorMode
  config: AppConfig
  setMode: (mode: EstimatorMode) => void
  isCommercial: boolean
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<EstimatorMode>("residential")
  const [config, setConfig] = useState<AppConfig>(modeConfigs.residential)

  useEffect(() => {
    // Load saved mode from localStorage if available
    const savedMode = localStorage.getItem("estimator-mode") as EstimatorMode | null
    if (savedMode && (savedMode === "residential" || savedMode === "commercial")) {
      setMode(savedMode)
      setConfig(modeConfigs[savedMode])
    }
  }, [])

  const handleSetMode = (newMode: EstimatorMode) => {
    setMode(newMode)
    setConfig(modeConfigs[newMode])
    localStorage.setItem("estimator-mode", newMode)
  }

  return (
    <AppContext.Provider
      value={{
        mode,
        config,
        setMode: handleSetMode,
        isCommercial: mode === "commercial",
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
