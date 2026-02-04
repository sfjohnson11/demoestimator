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

// Unified pricing for unlimited access to both modes
export const unlimitedPricing = {
  name: "Unlimited Access",
  price: 499,
  billingCycle: "annual" as const,
  description: "Full access to both Residential and Commercial modes",
}

// Default configurations for different modes
export const modeConfigs: Record<EstimatorMode, AppConfig> = {
  residential: {
    mode: "residential",
    features: {
      offlineCapabilities: true,
      photoGallery: true,
      visualization: true,
      advancedReporting: true,
      userAccounts: true,
      teamCollaboration: true,
    },
    pricing: {
      name: "Unlimited Access",
      price: 499,
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
      name: "Unlimited Access",
      price: 499,
      billingCycle: "annual",
    },
  },
}
