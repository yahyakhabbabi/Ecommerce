import React, { useContext } from 'react';
import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import DarkMode from './DarkMode/DarkMode';
import { useNavigate,Link } from 'react-router-dom';
import { useBearStore } from './appStore';
import AuthContext from '../context/AuthContext'; 
import { Avatar,  Tooltip } from '@mui/material';

const AppBar = styled(MuiAppBar, {
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: 'var(--body_background)',
  color: 'var(--body_color)',
}));

const toggleFullScreen = () => {
  if (document.documentElement.requestFullscreen) {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }
};

export default function Navbar() {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const navigate = useNavigate();
  const updateOpen = useBearStore((state) => state.updateOpen);
  const dopen = useBearStore((state) => state.dopen);


  const handleLogout = () => {
    authContext.logoutUser();
    navigate('/');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" elevation={0}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => updateOpen(!dopen)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Logo
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <DarkMode />
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              edge="center"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={toggleFullScreen}
              color="inherit"
            >
              <FullscreenIcon />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
             <Link to="/profile"> <IconButton  sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={user.userImage} />
              </IconButton></Link>
            </Tooltip>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              edge="center"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleLogout}
              color="inherit"
            >
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
