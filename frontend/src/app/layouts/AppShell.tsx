import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar, Box, CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, useTheme
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
} from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
// ✅ Импортируем хук из контекста
import { useThemeMode } from '../../context/ThemeContext';

const DRAWER_WIDTH = 260;
const navItems = [
  { label: 'Статистика', path: '/', icon: <DashboardIcon /> },
  { label: 'Граждане', path: '/registry', icon: <PeopleIcon /> },
  { label: 'Профиль', path: '/profile/demo', icon: <PersonIcon /> },
];

export default function AppShell() {
  const theme = useTheme(); // MUI theme для брейкпоинтов
  // ✅ Получаем darkMode и toggleDarkMode из контекста (НЕ создаём свой useState!)
  const { darkMode, toggleDarkMode } = useThemeMode();
  
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawerPaperSx = {
    boxSizing: 'border-box',
    width: DRAWER_WIDTH,
    bgcolor: { xs: 'rgba(25, 118, 210, 1)', md: 'rgba(25, 118, 210, 0.2)' },
    borderRight: '1px solid',
    borderColor: 'rgba(25, 118, 210, 0.5)',
  };

  const menuContent = (
    <List disablePadding sx={{ mt: 1 }}>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
        return (
          <ListItem key={item.path} disablePadding sx={{ mb: 0.5, px: 0 }}>
            <ListItemButton
              selected={isActive}
              onClick={() => {
                navigate(item.path);
                if (isMobile) setMobileOpen(false);
              }}
              sx={{
                color: { xs: '#ffffff', md: darkMode ? '#e2e8f0' : '#172b4d' },
                borderRadius: isActive ? 0 : 2,
                py: 1.5,
                '&.Mui-selected': {
                  bgcolor: { xs: 'rgba(255, 255, 255, 0.4)', md: 'primary.main' },
                  color: '#ffffff',
                  borderRadius: 0,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  '& .MuiListItemIcon-root': { color: '#ffffff' },
                  '&:hover': { bgcolor: { xs: 'rgba(255, 255, 255, 0.6)', md: 'primary.dark' } }
                },
                '&:hover:not(.Mui-selected)': {
                  bgcolor: 'rgba(25, 118, 210, 0.08)'
                }
              }}
            >
              <ListItemIcon sx={{ color: { xs: '#ffffff', md: darkMode ? '#e2e8f0' : '#172b4d' }, minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.label} 
                slotProps={{ primary: { sx: { fontWeight: isActive ? 700 : 500, color: 'inherit' } } }} 
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1, boxShadow: 1, bgcolor: 'primary.main' }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { md: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ color: 'white', flexGrow: 1 }}>
            Civis Dash
          </Typography>
          
          {/* ✅ Кнопка использует toggleDarkMode из контекста */}
          <IconButton 
            color="inherit" 
            onClick={toggleDarkMode}
            sx={{ ml: 1 }}
            aria-label="Переключить тему"
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': drawerPaperSx,
        }}
      >
        <Toolbar />
        {menuContent}
      </Drawer>
      
      <Drawer
        variant="persistent"
        open={true}
        sx={{
          display: { xs: 'none', md: 'block' },
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': drawerPaperSx,
        }}
      >
        <Toolbar />
        {menuContent}
      </Drawer>
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          minHeight: '100vh',
          bgcolor: 'background.default',
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}