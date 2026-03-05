import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000,  // 10 minutes - don't refetch if recently fetched
      gcTime: 30 * 60 * 1000,     // 30 minutes - keep data in memory after unmount
      retry: 1,
      refetchOnWindowFocus: false, // don't refetch when tab regains focus
      refetchOnReconnect: false,   // don't refetch on network reconnect
    },
    mutations: {
      retry: 0, // fail fast on mutations
    },
  },
})
