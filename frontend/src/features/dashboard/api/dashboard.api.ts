import axiosInstance from '@/shared/api/axios';
import type { DashboardStats } from '@/shared/types/api';

export const dashboardApi = {
    getStats: async (): Promise<DashboardStats> => {
        const response = await axiosInstance.get<DashboardStats>('/dashboard/stats');
        return response.data;
    },
};
