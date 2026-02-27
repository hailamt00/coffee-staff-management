import axios from '@/shared/api/axios'
import type { ActivityLog } from '@/shared/types/api'

export const activityLogApi = {
    getAll: async (): Promise<ActivityLog[]> => {
        const { data } = await axios.get('/activitylogs')
        return data
    },
}
