import {
  Box,
  Typography,
  Button,
  Chip,
} from '@mui/material';
import { ArrowBack, Verified, Warning } from '@mui/icons-material';
import { memo } from 'react';

export interface SectionItem {
  id: string;
  title: string;
  icon?: React.ReactElement;
}

export interface ProfileHeaderProps {
  fullName: string;
  status?: 'active' | 'archived' | 'pending';
  citizenId?: string;
  onBack: () => void;
  sections: SectionItem[];
  onNavigateToSection: (sectionId: string) => void;
}

interface StatusConfig {
  label: string;
  color: 'success' | 'default' | 'warning';
  icon?: React.ReactElement;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = memo(
  ({ fullName, status = 'active', onBack }) => {

    const statusConfig: Record<'active' | 'archived' | 'pending', StatusConfig> = {
      active: { label: 'Активен', color: 'success', icon: <Verified /> },
      archived: { label: 'Архив', color: 'default', icon: undefined },
      pending: { label: 'На проверке', color: 'warning', icon: <Warning /> },
    };
    const currentStatus = statusConfig[status];

    return (
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
          <Button startIcon={<ArrowBack />} onClick={onBack} variant="outlined" size="small" sx={{ borderRadius: 2 }}>
            Назад
          </Button>

          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', flexWrap: 'wrap' }}>
            <Chip
              icon={currentStatus.icon}
              label={currentStatus.label}
              color={currentStatus.color}
              size="small"
              variant="outlined"
            />
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <Box
              sx={{
                width: { xs: 48, sm: 56 },
                height: { xs: 48, sm: 56 },
                borderRadius: '50%',
                bgcolor: 'primary.light',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'primary.contrastText',
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
                fontWeight: 600,
              }}
            >
              {fullName.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()}
            </Box>
            <Box>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: 'text.primary', fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                {fullName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Личная карточка гражданина
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
);

ProfileHeader.displayName = 'ProfileHeader';