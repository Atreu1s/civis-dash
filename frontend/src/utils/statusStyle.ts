import type { CitizenStatus } from '../entities/citizen/types';

export type StatusIconName = 'check' | 'pending' | 'block' | 'archive' | undefined;

export const STATUS_CONFIG: Record<
  CitizenStatus,
  {
    label: string;
    color: 'success' | 'warning' | 'error' | 'default';
    variant: 'filled' | 'outlined' | 'soft';
    icon?: StatusIconName;
  }
> = {
  'активен': {
    label: 'Активен',
    color: 'success',
    variant: 'soft', 
    icon: 'check',
  },
  'на проверке': {
    label: 'На проверке',
    color: 'warning',
    variant: 'outlined',
    icon: 'pending',
  },
  'заблокирован': {
    label: 'Заблокирован',
    color: 'error',
    variant: 'filled',
    icon: 'block',
  },
  'в архиве': {
    label: 'В архиве',
    color: 'default',
    variant: 'outlined',
    icon: 'archive',
  },
};

export const getStatusConfig = (status: CitizenStatus) => STATUS_CONFIG[status];