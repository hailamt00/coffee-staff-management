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

    getWeeklySchedule: async (fromDate: string, toDate: string): Promise<Schedule[]> => {
        const { data } = await axios.get('/schedules/weekly', { params: { fromDate, toDate } })
        return data
    },

    // === REQUESTS ===
    getRequests: async (date: string): Promise<ScheduleRequest[]> => {
        const { data } = await axios.get('/schedules/requests', { params: { date } })
        return data
    },

    getWeeklyRequests: async (fromDate: string, toDate: string): Promise<ScheduleRequest[]> => {
        const { data } = await axios.get('/schedules/requests/weekly', { params: { fromDate, toDate } })
        return data
    },

    getMyRequests: async (employeeId: number): Promise<ScheduleRequest[]> => {
        const { data } = await axios.get(`/schedules/my-requests/${employeeId}`)
        return data
    },

    createRequest: async (payload: CreateShiftRequest) => {
        await axios.post('/schedules/request', payload)
    },

    updateRequest: async (id: number, payload: any) => {
        await axios.put(`/schedules/request/${id}`, payload)
    },

    deleteRequest: async (id: number) => {
        await axios.delete(`/schedules/request/${id}`)
    },

    addSchedule: async (payload: any) => {
        await axios.post('/schedules/add', payload)
    },

    approveRequest: async (payload: ApproveShiftRequest) => {
        await axios.post('/schedules/approve', payload)
    },

    updateSchedule: async (id: number, payload: any) => {
        await axios.put(`/schedules/${id}`, payload)
    },

    deleteSchedule: async (id: number) => {
        await axios.delete(`/schedules/${id}`)
    },
}
