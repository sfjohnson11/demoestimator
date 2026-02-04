export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
}

// E-Deck Estimator product - $499/year unlimited access
export const PRODUCTS: Product[] = [
  {
    id: 'edeck-unlimited-annual',
    name: 'E-Deck Estimator - Unlimited Access',
    description: 'Full access to both Residential and Commercial demolition estimating tools for one year. Includes all features, updates, and support.',
    priceInCents: 49900, // $499.00
  },
]
