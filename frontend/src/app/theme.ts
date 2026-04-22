import { createTheme, responsiveFontSizes } from '@mui/material/styles';


const getTheme = (mode: 'light' | 'dark') => {
  
  const glassBorder = mode === 'dark'
    ? 'rgba(59, 130, 246, 0.3)'  
    : 'rgba(25, 118, 210, 0.2)';

  const themeOptions = createTheme({
    palette: {
      mode,
      primary: {
        main: '#3b82f6', 
        light: mode === 'dark' ? '#60a5fa' : '#64b5f6',
        dark: mode === 'dark' ? '#1d4ed8' : '#1565c0',
      },
      secondary: { main: '#f50057' },
      background: {
        default: mode === 'dark' ? '#050a14' : '#f4f6f8',
        paper: mode === 'dark' ? '#0f172a' : '#ffffff',
      },
      text: {
        primary: mode === 'dark' ? '#f1f5f9' : '#0f172a',
        secondary: mode === 'dark' ? '#94a3b8' : '#475569',
      },
      success: { main: mode === 'dark' ? '#22c55e' : '#2e7d32' },
      warning: { main: mode === 'dark' ? '#f59e0b' : '#ed6c02' },
      error: { main: mode === 'dark' ? '#ef4444' : '#d32f2f' },
      divider: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.12)',
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontWeight: 700 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 600 },
    },
    shape: { borderRadius: 12 },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: mode === 'dark' 
              ? '0 4px 20px rgba(0, 0, 0, 0.5)' 
              : '0 2px 8px rgba(0, 0, 0, 0.08)',
            borderRadius: 12,
            border: mode === 'dark' 
              ? `1px solid ${glassBorder}` 
              : '1px solid #e9ecef',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            bgcolor: mode === 'dark' ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.9)',
            '&:hover fieldset': { borderColor: mode === 'dark' ? '#60a5fa' : '#1976d2' },
            '&.Mui-focused fieldset': { borderColor: '#3b82f6', borderWidth: 2 },
          },
        },
      },
      MuiButton: {
        styleOverrides: { 
          root: { 
            textTransform: 'none', 
            fontWeight: 500,
            '&.MuiOutlinedButton-root': {
              bgcolor: mode === 'dark' ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.9)',
              '&:hover': { 
                bgcolor: mode === 'dark' ? 'rgba(30, 41, 59, 0.8)' : '#ffffff',
                borderColor: mode === 'dark' ? '#60a5fa' : '#1565c0',
              },
            },
          }, 
        },
      },
      MuiTextField: { defaultProps: { size: 'small' } },
    },
  });

  return responsiveFontSizes(themeOptions);
};

export const getThemeByMode = (mode: 'light' | 'dark') => getTheme(mode);