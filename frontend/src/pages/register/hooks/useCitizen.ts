import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Citizen, PaginatedResponse } from '../../../entities/citizen/types';

export interface CitizensQueryParams {
  page: number;
  limit: number;
  search?: string;
  region?: string;
  status?: string;
}

export const useCitizens = ({ page, limit, search, region, status }: CitizensQueryParams) => {
  return useQuery({
    queryKey: ['citizens', { page, limit, search, region, status }],
    queryFn: async () => {
      const { data } = await axios.get<PaginatedResponse<Citizen>>('/api/citizens', {
        params: { page, limit, search, region, status },
      });
      return data;
    },
    staleTime: 1000 * 30, 
    retry: 1,
  });
};