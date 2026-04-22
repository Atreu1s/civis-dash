import { Chip } from '@mui/material';
import type { ComponentPropsWithoutRef } from 'react';
import { getStatusConfig } from '../../../utils/statusStyle';
import type { CitizenStatus } from '../../../entities/citizen/types';

interface StatusChipProps extends Omit<ComponentPropsWithoutRef<typeof Chip>, 'color' | 'variant'> {
  status: CitizenStatus;
  size?: 'small' | 'medium';
}

export function StatusChip({ status }: StatusChipProps) {
  const config = getStatusConfig(status);

  return (
    <Chip
      label={config.label}
      variant="filled"
      sx={{
        bgcolor: config.bg,
        color: config.color,
        fontWeight: 600,
        fontSize: '0.75rem',
        minWidth: '110px',
        height: '28px',           
        borderRadius: '6px',      
        border: '1px solid',
        borderColor: `${config.color}30`, 
        transition: 'all 0.2s ease-in-out',
        '&:hover': { 
          bgcolor: `${config.bg}cc`, 
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
        }
      }}
    />
  );
}