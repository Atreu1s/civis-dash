import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Citizen } from '../../../entities/citizen/types';

export const useCitizenById = (id: string | undefined) => {
  return useQuery({
    queryKey: ['citizen', id],
    queryFn: async () => {
      const { data } = await axios.get<Citizen>(`/api/citizens/${id}`);
      return data;
    },
    enabled: !!id,
    staleTime: 1000 * 60,
  });
};