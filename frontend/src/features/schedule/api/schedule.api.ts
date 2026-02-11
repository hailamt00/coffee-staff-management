import axios from '@/shared/api/axios'
import type {
    Schedule,
    ScheduleRequest,
    CreateShiftRequest,
    ApproveShiftRequest,
} from '@/shared/types/api'

export const scheduleApi = {
    // === OFFICIAL SCHEDULE ===
    getSchedule: async (date: string): Promise<Schedule[]> => {
        const { data } = await axios.get('/schedules', { params: { date } })
        return data
    },

    // === REQUESTS ===
    getRequests: async (date: string): Promise<ScheduleRequest[]> => {
        const { data } = await axios.get('/schedules/requests', { params: { date } })
        return data
    },

    getMyRequests: async (employeeId: number): Promise<ScheduleRequest[]> => {
        const { data } = await axios.get(`/schedules/my-requests/${employeeId}`)
        return data
    },

    createRequest: async (payload: CreateShiftRequest) => {
        await axios.post('/schedules/request', payload)
    },

    approveRequest: async (payload: ApproveShiftRequest) => {
        await axios.post('/schedules/approve', payload)
    },
}
