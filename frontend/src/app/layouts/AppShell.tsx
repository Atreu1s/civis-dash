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
} from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';

const DRAWER_WIDTH = 260;
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
  const menuContent = (
    <List disablePadding sx={{ px: 1, mt: 1 }}>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
        return (
          <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={isActive}
              onClick={() => {
                navigate(item.path);
                if (isMobile) setMobileOpen(false);
              }}
              sx={{
                borderRadius: 2,
                '&.Mui-selected': { bgcolor: 'primary.light', color: 'primary.contrastText', '&:hover': { bgcolor: 'primary.main' } },
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              <ListItemIcon sx={{ color: isActive ? 'inherit' : 'text.secondary', minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} slotProps={{ primary: { sx: { fontWeight: isActive ? 600 : 500 } } }} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1, boxShadow: 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }} 
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ color: 'white' }}>
            Civis Dash
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          bgcolor: 'primary.main',
        }}
      >
        <Toolbar />
        <Typography variant="h6" sx={{ px: 3, mb: 1, fontWeight: 700, color: 'white' }}>Civis Dash</Typography>
        {menuContent}
      </Drawer>
      <Drawer
        variant="persistent"
        open={true}
        sx={{
          display: { xs: 'none', md: 'block' },
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box', borderRight: '1px solid', borderColor: 'divider' },
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