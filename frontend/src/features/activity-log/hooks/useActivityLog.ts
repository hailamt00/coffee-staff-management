import { useQuery } from '@tanstack/react-query'
import { activityLogApi } from '../api/activityLog.api'

export function useActivityLog() {
    const useActivityLogs = () => useQuery({
        queryKey: ['activityLogs'],
        queryFn: () => activityLogApi.getAll(),
    })

    return {
        useActivityLogs,
    }
}
