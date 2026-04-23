import {
  Box,
  Button,
  Typography,
  useTheme,
  alpha,
} from '@mui/material';
import { Save, DeleteOutlined } from '@mui/icons-material';
import { memo } from 'react';

export interface ProfileActionsProps {
  isValid: boolean;
  isSubmitting: boolean;
  onCancel: () => void;
  onSave?: () => void;
  onDelete?: () => void;
  showDelete?: boolean;
  saveLabel?: string;
}

export const ProfileActions: React.FC<ProfileActionsProps> = memo(
  ({
    isValid,
    isSubmitting,
    onCancel,
    onSave,
    onDelete,
    showDelete = false,
    saveLabel = 'Сохранить изменения',
  }) => {
    const theme = useTheme();

    return (
      <Box
        component="footer"
        sx={{
          position: 'sticky',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: theme.zIndex.appBar,
          pt: 2,
          pb: { xs: 1.5, md: 2 },
          px: { xs: 1.5, md: 4 },
          bgcolor: alpha(theme.palette.background.paper, 0.95),
          backdropFilter: 'blur(8px)',
          borderTop: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          flexDirection: { xs: 'column-reverse', sm: 'row' },
          gap: { xs: 1.5, sm: 2 },
          justifyContent: { xs: 'flex-end', sm: 'space-between' },
          alignItems: { xs: 'stretch', sm: 'center' },
        }}
      >
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {showDelete && onDelete && (
            <Button startIcon={<DeleteOutlined />} onClick={onDelete} variant="outlined" color="error" size="small" sx={{ borderRadius: 2, width: { xs: '100%', sm: 'auto' } }}>
              Удалить профиль
            </Button>
          )}
          <Typography variant="caption" color="text.secondary" sx={{ width: { xs: '100%', sm: 'auto' }, textAlign: { xs: 'center', sm: 'left' } }}>
            * Обязательные поля
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, width: { xs: '100%', sm: 'auto' }, flexDirection: { xs: 'column', sm: 'row' } }}>
          <Button onClick={onCancel} variant="outlined" color="inherit" disabled={isSubmitting} sx={{ borderRadius: 2, width: '100%' }}>
            Отмена
          </Button>
          <Button
            type="submit"
            startIcon={<Save />}
            onClick={onSave}
            variant="contained"
            color="primary"
            disabled={!isValid || isSubmitting}
            sx={{
              borderRadius: 2,
              width: '100%',
              fontWeight: 600,
              boxShadow: 'none',
              '&:hover': { boxShadow: theme.shadows[4] },
            }}
          >
            {isSubmitting ? 'Сохранение...' : saveLabel}
          </Button>
        </Box>
      </Box>
    );
  }
);

ProfileActions.displayName = 'ProfileActions';