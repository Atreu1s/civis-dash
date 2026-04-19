// src/app/layouts/AppShell.tsx
import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar, Box, CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, useMediaQuery, useTheme
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';

const navItems = [
  { label: 'Dashboard', path: '/', icon: <DashboardIcon /> },
  { label: 'Картотека', path: '/registry', icon: <PeopleIcon /> },
  { label: 'Профиль', path: '/profile/demo', icon: <PersonIcon /> },
];

export default function AppShell() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawerContent = (
    <Box sx={{ width: 260, height: '100%', pt: 2 }}>
      <Typography variant="h5" sx={{ px: 3, mb: 4, fontWeight: 700, color: 'primary.main' }}>
        Civis Dash
      </Typography>
      <List disablePadding>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ mb: 0.5, px: 1 }}>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                if (isMobile) handleDrawerToggle();
              }}
              sx={{
                borderRadius: 2,
                '&.Mui-selected': { bgcolor: 'primary.lighter', color: 'primary.main' },
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} slotProps={{ primary: { sx: { fontWeight: 500 } } }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1, bgcolor: 'background.paper', boxShadow: 1 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'text.primary' }}>
            Панель управления
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: 260,
          flexShrink: 0,
          '& .MuiDrawer-paper': { 
            width: 260, 
            boxSizing: 'border-box', 
            borderRight: '1px solid', 
            borderColor: 'divider' 
          },
        }}
      >
        <Toolbar /> 
        {drawerContent}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          pt: 8, 
          bgcolor: 'background.default',
          minHeight: '100vh',
        }}
      >
        <Outlet /> 
      </Box>
    </Box>
  );
}