import { materialDatabase } from "@/data/materials"
import { commercialMaterialDatabase } from "@/data/commercial-materials"

export function getResidentialCategories(): string[] {
  return Array.from(new Set(materialDatabase.map((item) => item.category))).sort()
}

export function getCommercialCategories(): string[] {
  return Array.from(new Set(commercialMaterialDatabase.map((item) => item.category))).sort()
}

export function getCategoryItems(category: string, isCommercial = false) {
  const database = isCommercial ? commercialMaterialDatabase : materialDatabase
  return database.filter((item) => item.category === category)
}

export function getAllCategories() {
  return {
    residential: getResidentialCategories(),
    commercial: getCommercialCategories(),
  }
}
