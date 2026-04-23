import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getThemeByMode } from './app/theme';
import { ThemeProvider as AppThemeProvider, useThemeMode } from './context/ThemeContext';
import AppShell from './app/layouts/AppShell';
import DashboardPage from './pages/dashboard';
import RegistryPage from './pages/register';
import ProfilePage from './pages/profile';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5, retry: 2, refetchOnWindowFocus: false },
  },
});

function ThemedApp() {
  const { darkMode } = useThemeMode();
  const theme = getThemeByMode(darkMode ? 'dark' : 'light');

  return (
    <ThemeProvider theme={theme}> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppShell />}>
            <Route index element={<DashboardPage />} />
            <Route path="registry" element={<RegistryPage />} />
            <Route path="profile/:id" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>
        <ThemedApp />
      </AppThemeProvider>
    </QueryClientProvider>
  );
}

export default App;