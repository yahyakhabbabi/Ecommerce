import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import {useNavigate} from 'react-router-dom';
import { useBearStore } from './appStore';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CategoryIcon from '@mui/icons-material/Category';
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

import "../styles/main.css"
const drawerWidth = 240;


const openedMixin = (theme) => ({
  width: drawerWidth,
  background: 'var(--body_background)',
  color: 'var(--body_color)',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  background: 'var(--body_background)',
  color: 'var(--body_color)',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const CustomListItem = ({ icon, primaryText, path, open, navigate }) => {
  return (
    <List>
      <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate(path)}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
              color: 'var(--body_color)',
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText primary={primaryText} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
    </List>
  );
};
export default function MiniDrawer() {
  const theme = useTheme();
  const open = useBearStore((state)=>state.dopen);
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box height={30}/>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader> 
      <CustomListItem
        icon={<DashboardIcon />}
        primaryText="dashboard"
        path="/dashboard"
        open={open}
        navigate={navigate}
      />
      <CustomListItem
        icon={<AdminPanelSettingsIcon />}
        primaryText="users"
        path="/v1/users/"
        open={open}
        navigate={navigate}
      />
      <CustomListItem
        icon={<PeopleOutlineIcon />}
        primaryText="Customers"
        path="/v1/customers/"
        open={open}
        navigate={navigate}
      />
         <CustomListItem
        icon={<CategoryIcon />}
        primaryText="Categorie"
        path="/v1/categorie/"
        open={open}
        navigate={navigate}
      />
         <CustomListItem
        icon={<SubdirectoryArrowRightIcon />}
        primaryText="Subcategorie"
        path="/v1/Subcategorie/"
        open={open}
        navigate={navigate}
      />
      <CustomListItem
        icon={<ShoppingCartIcon />}
        primaryText="product"
        path="/v1/products/"
        open={open}
        navigate={navigate}
      />
      <CustomListItem
        icon={<LocalMallIcon />}
        primaryText="order"
        path="/v1/orders/"
        open={open}
        navigate={navigate}
      />
      <CustomListItem
        icon={<QrCodeScannerIcon />}
        primaryText="QRCODE"
        path="/payements"
        open={open}
        navigate={navigate}
      />
      </Drawer>
    </Box>
  );
}