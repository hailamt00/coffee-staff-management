import { useQuery } from '@tanstack/react-query'
import { dashboardApi } from '../api/dashboard.api'

export function useDashboard() {
    const statsQuery = useQuery({
        queryKey: ['dashboard', 'stats'],
        queryFn: () => dashboardApi.getStats(),
        staleTime: 60000, // 1 minute stale time for dashboard stats as they are high-level
    })

    return {
        stats: statsQuery.data,
        loading: statsQuery.isLoading,
        isError: statsQuery.isError,
        refetch: statsQuery.refetch,
    }
}
