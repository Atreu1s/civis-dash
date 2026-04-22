import type { CitizenStatus } from '../entities/citizen/types';

export const STATUS_CONFIG: Record<
  CitizenStatus,
  { label: string; color: string; bg: string }
> = {
  'активен': { 
    label: 'Активен', 
    color: '#1e88e5',          
    bg: 'rgba(30, 136, 229, 0.12)',   
  },
  'на проверке': { 
    label: 'На проверке', 
    color: '#9e6900',          
    bg: 'rgba(255, 229, 127, 0.18)', 
  },
  'заблокирован': { 
    label: 'Заблокирован', 
    color: '#d32f2f',          
    bg: 'rgba(244, 67, 54, 0.12)',   
  },
  'в архиве': { 
    label: 'В архиве', 
    color: '#616161',          
    bg: 'rgba(117, 117, 117, 0.12)',   
  },
};

export const getStatusConfig = (status: CitizenStatus) => STATUS_CONFIG[status];