// Define the application modes and configuration types

export type EstimatorMode = "residential" | "commercial"

export interface AppConfig {
  mode: EstimatorMode
  features: {
    offlineCapabilities: boolean
    photoGallery: boolean
    visualization: boolean
    advancedReporting: boolean
    userAccounts: boolean
    teamCollaboration: boolean
  }
  pricing: {
    name: string
    price: number
    billingCycle: "monthly" | "annual" | "one-time"
  }
}

// Default configurations for different modes
export const modeConfigs: Record<EstimatorMode, AppConfig> = {
  residential: {
    mode: "residential",
    features: {
      offlineCapabilities: true,
      photoGallery: true,
      visualization: true,
      advancedReporting: false,
      userAccounts: false,
      teamCollaboration: false,
    },
    pricing: {
      name: "Residential",
      price: 99,
      billingCycle: "annual",
    },
  },
  commercial: {
    mode: "commercial",
    features: {
      offlineCapabilities: true,
      photoGallery: true,
      visualization: true,
      advancedReporting: true,
      userAccounts: true,
      teamCollaboration: true,
    },
    pricing: {
      name: "Commercial",
      price: 199,
      billingCycle: "annual",
    },
  },
}
