import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch } from 'react-redux';
import { signOutUser } from '../pages/SignIn/authSlice';

export default function Navbar() {

    const dispatch = useDispatch()

    const handleLogout = () => {
      console.log('handle log out')
      dispatch(signOutUser())
    }
    
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#59D6D3'}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Student Records
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Log Out</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}