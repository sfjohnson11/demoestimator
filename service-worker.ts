// This is a service worker file that will handle caching and offline functionality

// Cache name with version for easy updates
const CACHE_NAME = "e-deck-estimator-v1"

// Assets to cache on install
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/globals.css",
  // Add paths to all your critical JS and CSS files
]

// Install event - cache static assets
self.addEventListener("install", (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching static assets")
      return cache.addAll(STATIC_ASSETS)
    }),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event: any) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName.startsWith("e-deck-estimator-") && cacheName !== CACHE_NAME
          })
          .map((cacheName) => {
            return caches.delete(cacheName)
          }),
      )
    }),
  )
})

// Fetch event - serve from cache or network
self.addEventListener("fetch", (event: any) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return
  }

  // For API requests, use network first, then cache
  if (event.request.url.includes("/api/")) {
    event.respondWith(networkFirstStrategy(event.request))
    return
  }

  // For static assets, use cache first, then network
  event.respondWith(cacheFirstStrategy(event.request))
})

// Cache-first strategy for static assets
async function cacheFirstStrategy(request: Request) {
  const cachedResponse = await caches.match(request)
  if (cachedResponse) {
    return cachedResponse
  }

  try {
    const networkResponse = await fetch(request)
    // Cache the new response for future use
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    // If both cache and network fail, return a fallback
    return new Response("Network error happened", {
      status: 408,
      headers: { "Content-Type": "text/plain" },
    })
  }
}

// Network-first strategy for API requests
async function networkFirstStrategy(request: Request) {
  try {
    const networkResponse = await fetch(request)
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    // If network fails, try the cache
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }

    // If both network and cache fail, return a fallback
    return new Response(JSON.stringify({ error: "You are offline" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    })
  }
}
