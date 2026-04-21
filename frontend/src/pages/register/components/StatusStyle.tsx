// src/pages/register/components/StatusStyle.tsx
import { Chip } from '@mui/material';
import type { ComponentPropsWithoutRef } from 'react';
import { getStatusConfig } from '../../../utils/statusStyle';
import type { CitizenStatus } from '../../../entities/citizen/types';

interface StatusChipProps extends Omit<ComponentPropsWithoutRef<typeof Chip>, 'color' | 'variant'> {
  status: CitizenStatus;
  size?: 'small' | 'medium';
}

export function StatusChip({ status, size = 'small', ...props }: StatusChipProps) {
  const config = getStatusConfig(status);

  const sx = {
    color: 'white',
    fontWeight: 500,
    ...(config.color === 'default' && { color: 'text.primary' }),
  };

  return (
    <Chip
      label={config.label}
      color={config.color}
      variant="filled" 
      size={size}
      sx={sx}
      {...props}
    />
  );
}