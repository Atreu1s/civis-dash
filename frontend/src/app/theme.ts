import { createTheme, responsiveFontSizes } from '@mui/material/styles';


const themeOptions = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#1976d2',
        light: '#4791db',
        dark: '#115293',
      },
      secondary: {
        main: '#f50057'
      },
      background: {
        default: '#f4f6f8', 
        paper: '#ffffff', 
      },
      text: {
        primary: '#172b4d',
        secondary: '#6b778d',
      },
      success: {
        main: '#2e7d32',
      },
      warning: {
        main: '#ed6c02',
      },
      error: {
        main: '#d32f2f', 
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontWeight: 700 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 600 },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
          borderRadius: 12,
          border: '1px solid #e9ecef',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', 
          fontWeight: 500,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small', 
      },
    },
  },
});

export const theme = responsiveFontSizes(themeOptions);