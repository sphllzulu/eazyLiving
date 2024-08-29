import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

export default function ButtonAppBar() {
  return (
    <div style={{display:'flex', justifyContent:'center'}}>
    <Box sx={{ flexGrow: 1, display:'flex', justifyContent:'center' }}>
      <AppBar position="static" sx={{width:'90%', background:'black'}}>
        <Toolbar>
         
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Eezy Living
          </Typography>
          <AccountCircleIcon/>
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  );
}
