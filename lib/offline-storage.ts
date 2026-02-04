// This utility handles offline data storage and synchronization

import { v4 as uuidv4 } from "uuid"

// Types for our data
export interface EstimateData {
  id: string
  projectName: string
  clientName: string
  date: string
  lineItems: any[]
  additionalCosts: any[]
  overhead: number
  profit: number
  tax: number
  exclusions: string
  photos: PhotoItem[]
  totals: any
  contractorInfo: {
    name: string
    address: string
    phone: string
    email: string
    hourlyRate: string
  }
  lastModified: number
  syncStatus: "synced" | "pending" | "conflict"
  mode?: "residential" | "commercial" // Add this line
}

export interface PhotoItem {
  id: string
  url: string
  description: string
  file?: File
}

// IndexedDB setup
const DB_NAME = "e-deck-estimator-db"
const DB_VERSION = 1
const ESTIMATES_STORE = "estimates"
const SYNC_QUEUE_STORE = "syncQueue"

// Initialize the database
export async function initDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = (event) => {
      console.error("IndexedDB error:", event)
      reject("Error opening database")
    }

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      resolve(db)
    }

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result

      // Create estimates store
      if (!db.objectStoreNames.contains(ESTIMATES_STORE)) {
        const estimatesStore = db.createObjectStore(ESTIMATES_STORE, { keyPath: "id" })
        estimatesStore.createIndex("lastModified", "lastModified", { unique: false })
        estimatesStore.createIndex("syncStatus", "syncStatus", { unique: false })
      }

      // Create sync queue store
      if (!db.objectStoreNames.contains(SYNC_QUEUE_STORE)) {
        const syncQueueStore = db.createObjectStore(SYNC_QUEUE_STORE, { keyPath: "id" })
        syncQueueStore.createIndex("timestamp", "timestamp", { unique: false })
      }
    }
  })
}

// Save an estimate to IndexedDB
export async function saveEstimate(estimate: EstimateData): Promise<string> {
  const db = await initDatabase()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([ESTIMATES_STORE], "readwrite")
    const store = transaction.objectStore(ESTIMATES_STORE)

    // Ensure the estimate has an ID and lastModified timestamp
    if (!estimate.id) {
      estimate.id = uuidv4()
    }

    estimate.lastModified = Date.now()
    estimate.syncStatus = navigator.onLine ? "synced" : "pending"

    const request = store.put(estimate)

    request.onsuccess = () => {
      // If online, try to sync immediately
      if (navigator.onLine) {
        syncEstimate(estimate.id).catch(console.error)
      } else {
        // Otherwise, add to sync queue
        addToSyncQueue(estimate.id).catch(console.error)
      }
      resolve(estimate.id)
    }

    request.onerror = (event) => {
      console.error("Error saving estimate:", event)
      reject("Failed to save estimate")
    }
  })
}

// Get an estimate from IndexedDB
export async function getEstimate(id: string): Promise<EstimateData | null> {
  const db = await initDatabase()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([ESTIMATES_STORE], "readonly")
    const store = transaction.objectStore(ESTIMATES_STORE)
    const request = store.get(id)

    request.onsuccess = () => {
      resolve(request.result || null)
    }

    request.onerror = (event) => {
      console.error("Error getting estimate:", event)
      reject("Failed to get estimate")
    }
  })
}

// Get all estimates from IndexedDB
export async function getAllEstimates(): Promise<EstimateData[]> {
  const db = await initDatabase()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([ESTIMATES_STORE], "readonly")
    const store = transaction.objectStore(ESTIMATES_STORE)
    const request = store.getAll()

    request.onsuccess = () => {
      resolve(request.result || [])
    }

    request.onerror = (event) => {
      console.error("Error getting all estimates:", event)
      reject("Failed to get estimates")
    }
  })
}

// Delete an estimate from IndexedDB
export async function deleteEstimate(id: string): Promise<void> {
  const db = await initDatabase()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([ESTIMATES_STORE], "readwrite")
    const store = transaction.objectStore(ESTIMATES_STORE)
    const request = store.delete(id)

    request.onsuccess = () => {
      // If online, try to sync the deletion
      if (navigator.onLine) {
        syncDeletion(id).catch(console.error)
      } else {
        // Otherwise, add to sync queue
        addToSyncQueue(id, "delete").catch(console.error)
      }
      resolve()
    }

    request.onerror = (event) => {
      console.error("Error deleting estimate:", event)
      reject("Failed to delete estimate")
    }
  })
}

// Add an item to the sync queue
async function addToSyncQueue(estimateId: string, action: "update" | "delete" = "update"): Promise<void> {
  const db = await initDatabase()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([SYNC_QUEUE_STORE], "readwrite")
    const store = transaction.objectStore(SYNC_QUEUE_STORE)

    const syncItem = {
      id: uuidv4(),
      estimateId,
      action,
      timestamp: Date.now(),
      retryCount: 0,
    }

    const request = store.add(syncItem)

    request.onsuccess = () => {
      resolve()
    }

    request.onerror = (event) => {
      console.error("Error adding to sync queue:", event)
      reject("Failed to add to sync queue")
    }
  })
}

// Sync a specific estimate with the server
async function syncEstimate(id: string): Promise<void> {
  try {
    const estimate = await getEstimate(id)
    if (!estimate) return

    // Prepare photos for upload (convert data URLs to files)
    const formData = new FormData()
    formData.append("estimate", JSON.stringify(estimate))

    estimate.photos.forEach((photo, index) => {
      if (photo.file) {
        formData.append(`photo_${index}`, photo.file)
      }
    })

    // Send to server
    const response = await fetch("/api/estimates", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`)
    }

    // Update sync status
    const db = await initDatabase()
    const transaction = db.transaction([ESTIMATES_STORE], "readwrite")
    const store = transaction.objectStore(ESTIMATES_STORE)

    estimate.syncStatus = "synced"
    await store.put(estimate)
  } catch (error) {
    console.error("Sync error:", error)
    // Mark as conflict if server returned a conflict status
    if (error instanceof Error && error.message.includes("409")) {
      const estimate = await getEstimate(id)
      if (estimate) {
        estimate.syncStatus = "conflict"
        const db = await initDatabase()
        const transaction = db.transaction([ESTIMATES_STORE], "readwrite")
        const store = transaction.objectStore(ESTIMATES_STORE)
        await store.put(estimate)
      }
    }
  }
}

// Sync a deletion with the server
async function syncDeletion(id: string): Promise<void> {
  try {
    const response = await fetch(`/api/estimates/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`)
    }
  } catch (error) {
    console.error("Sync deletion error:", error)
    // If deletion fails, add to sync queue to try again later
    await addToSyncQueue(id, "delete")
  }
}

// Process the sync queue
export async function processSyncQueue(): Promise<void> {
  if (!navigator.onLine) return

  const db = await initDatabase()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([SYNC_QUEUE_STORE], "readwrite")
    const store = transaction.objectStore(SYNC_QUEUE_STORE)
    const index = store.index("timestamp")
    const request = index.openCursor()

    request.onsuccess = async (event) => {
      const cursor = (event.target as IDBRequest).result

      if (cursor) {
        const syncItem = cursor.value

        try {
          if (syncItem.action === "update") {
            await syncEstimate(syncItem.estimateId)
          } else if (syncItem.action === "delete") {
            await syncDeletion(syncItem.estimateId)
          }

          // Remove from queue if successful
          cursor.delete()
        } catch (error) {
          console.error("Error processing sync item:", error)

          // Increment retry count
          syncItem.retryCount += 1

          // If too many retries, mark as conflict
          if (syncItem.retryCount > 5) {
            if (syncItem.action === "update") {
              const estimate = await getEstimate(syncItem.estimateId)
              if (estimate) {
                estimate.syncStatus = "conflict"
                const estimateStore = transaction.objectStore(ESTIMATES_STORE)
                await estimateStore.put(estimate)
              }
            }
            cursor.delete()
          } else {
            cursor.update(syncItem)
          }
        }

        cursor.continue()
      } else {
        resolve()
      }
    }

    request.onerror = (event) => {
      console.error("Error processing sync queue:", event)
      reject("Failed to process sync queue")
    }
  })
}

// Listen for online/offline events
export function setupConnectivityListeners(): void {
  window.addEventListener("online", () => {
    console.log("App is online. Starting sync...")
    processSyncQueue().catch(console.error)
  })

  window.addEventListener("offline", () => {
    console.log("App is offline. Changes will be synced when connection is restored.")
  })
}
