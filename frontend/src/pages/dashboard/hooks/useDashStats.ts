import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { DashboardStats } from '../../../entities/citizen/types';

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const { data } = await axios.get<DashboardStats>('/api/dashboard/stats');
      return data;
    },
    staleTime: 1000 * 60 * 2, 
    retry: 1,                 
  });
}