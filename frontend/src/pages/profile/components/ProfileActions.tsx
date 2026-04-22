import {
  Box,
  Button,
  Typography,
  useTheme,
  alpha,
} from '@mui/material';
import { Save, Cancel, DeleteOutlined } from '@mui/icons-material';
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
          pb: { xs: 2, md: 3 },
          px: { xs: 2, md: 4 },
          bgcolor: alpha(theme.palette.background.paper, 0.95),
          backdropFilter: 'blur(8px)',
          borderTop: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          {showDelete && onDelete && (
            <Button
              startIcon={<DeleteOutlined />}
              onClick={onDelete}
              variant="outlined"
              color="error"
              size="small"
              sx={{ borderRadius: 2 }}
            >
              Удалить профиль
            </Button>
          )}
          <Typography variant="caption" color="text.secondary">
            * Обязательные поля
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            startIcon={<Cancel />}
            onClick={onCancel}
            variant="outlined"
            color="inherit"
            disabled={isSubmitting}
            sx={{ borderRadius: 2, minWidth: 120 }}
          >
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
              minWidth: 180,
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