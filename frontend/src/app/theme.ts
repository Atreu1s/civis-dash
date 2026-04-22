import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const getTheme = (mode: 'light' | 'dark') => {
  const themeOptions = createTheme({
    palette: {
      mode,
      primary: {
        main: '#1976d2',
        light: mode === 'dark' ? '#4791db' : '#64b5f6',
        dark: mode === 'dark' ? '#115293' : '#1565c0',
      },
      secondary: { main: '#f50057' },
      background: {
        default: mode === 'dark' ? '#050a14' : '#f4f6f8',
        paper: mode === 'dark' ? '#112240' : '#ffffff',
      },
      text: {
        primary: mode === 'dark' ? '#e2e8f0' : '#172b4d',
        secondary: mode === 'dark' ? '#94a3b8' : '#6b778d',
      },
      success: { main: '#2e7d32' },
      warning: { main: '#ed6c02' },
      error: { main: '#d32f2f' },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontWeight: 700 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 600 },
    },
    shape: { borderRadius: 12 },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: mode === 'dark' 
              ? '0px 2px 8px rgba(0,0,0,0.3)' 
              : '0px 2px 8px rgba(0,0,0,0.08)',
            borderRadius: 12,
            border: mode === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e9ecef',
          },
        },
      },
      MuiButton: {
        styleOverrides: { root: { textTransform: 'none', fontWeight: 500 } },
      },
      MuiTextField: { defaultProps: { size: 'small' } },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: mode === 'dark' ? 'none' : undefined },
        },
      },
    },
  });
  return responsiveFontSizes(themeOptions);
};

export const getThemeByMode = (mode: 'light' | 'dark') => getTheme(mode);