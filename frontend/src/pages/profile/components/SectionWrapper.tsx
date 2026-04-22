import { Box, Typography, Paper, useTheme } from '@mui/material';
import type { ReactNode } from 'react';

export interface SectionWrapperProps {
  id: string;
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  sectionRef?: (el: HTMLDivElement | null) => void;
  withDivider?: boolean;
  readOnly?: boolean;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  id,
  title,
  icon,
  children,
  sectionRef,
  withDivider = true,
  readOnly = false,
}) => {
  const theme = useTheme();

  return (
    <Box
      ref={sectionRef}
      id={id}
      sx={{
        mb: 4,
        pb: withDivider ? 3 : 0,
        borderBottom: withDivider ? '1px solid' : 'none',
        borderColor: 'divider',
        scrollMarginTop: 100,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5, flexWrap: 'wrap' }}>
        {icon && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              borderRadius: '8px',
              bgcolor: `${theme.palette.primary.main}14`,
              color: 'primary.main',
            }}
          >
            {icon}
          </Box>
        )}
        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
            fontSize: { xs: '1.1rem', md: '1.25rem' },
          }}
        >
          {title}
        </Typography>
      </Box>

      <Paper
        variant="outlined"
        elevation={0}
        sx={{
          p: { xs: 2, sm: 2.5, md: 3 },
          borderRadius: 3,
          bgcolor: 'background.paper',
          borderColor: readOnly ? 'divider' : 'grey.300',
          transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          ...(!readOnly && {
            '&:hover': {
              borderColor: 'primary.main',
              boxShadow: theme.shadows[2],
            },
          }),
        }}
      >
        {children}
      </Paper>
    </Box>
  );
};