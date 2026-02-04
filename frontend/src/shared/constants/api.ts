// API Configuration Constants
export const API_CONFIG = {
  // Development API (uses Vite proxy)
  DEV_BASE_URL: 'http://localhost:5136/api/v1',

  // Production API fallback
  PROD_BASE_URL: 'http://101.99.37.229:81/api/v1',

  // Environment variable key
  ENV_VAR_KEY: 'VITE_API_URL',

  // Timeout settings
  TIMEOUT: 60000,

  // Retry settings
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,

  // Module prefixes
  MODULE_PREFIX_BC: 'bc',
  MODULE_PREFIX_SYNC: 'sync',
} as const

// Type for API configuration
export type ApiConfig = typeof API_CONFIG

// Helper function to get API base URL
export const getApiBaseUrl = (): string => {
  const isDev = import.meta.env.DEV
  const prodUrl =
    import.meta.env[API_CONFIG.ENV_VAR_KEY] || API_CONFIG.PROD_BASE_URL

  return isDev ? API_CONFIG.DEV_BASE_URL : prodUrl
}

// Helper function to validate API URL
export const validateApiUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Helper function to get full API endpoint
export const getApiEndpoint = (endpoint: string): string => {
  const baseUrl = getApiBaseUrl()
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  return `${baseUrl}${cleanEndpoint}`
}
