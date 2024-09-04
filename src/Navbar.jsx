// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// // import Button from '@mui/material/Button';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// // import IconButton from '@mui/material/IconButton';
// // import MenuIcon from '@mui/icons-material/Menu';

// export default function ButtonAppBar() {
//   return (
//     <div style={{display:'flex', justifyContent:'center'}}>
//     <Box sx={{ flexGrow: 1, display:'flex', justifyContent:'center' }}>
//       <AppBar position="static" sx={{width:'90%', background:'white', color:'black'}}>
//         <Toolbar>
         
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             Eezy Living
//           </Typography>
//           <AccountCircleIcon/>
//         </Toolbar>
//       </AppBar>
//     </Box>
//     </div>
//   );
// }


import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

export default function ButtonAppBar() {
  const [accountOpen, setAccountOpen] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);

  const handleAccountClick = () => {
    setAccountOpen(true);
  };

  const handleAccountClose = () => {
    setAccountOpen(false);
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
        <AppBar position="static" sx={{ width: '90%', background: 'white', color: 'black' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Eezy Living
            </Typography>
            <IconButton color="inherit" onClick={handleAccountClick}>
              <AccountCircleIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Account Modal */}
      <Dialog open={accountOpen} onClose={handleAccountClose}>
        <DialogTitle>
          Account Options
          <IconButton
            aria-label="close"
            onClick={handleAccountClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <List>
            <Link to='/signup'>
            <ListItem button>
              <ListItemText primary="Sign up" />
            </ListItem>
            </Link>
            <Link to='/login'>
            <ListItem button>
              <ListItemText primary="Sign in" />
            </ListItem>
            </Link>
            <Link>
            <ListItem button>
              <ListItemText primary="Profile" />
            </ListItem>
            </Link>
            <ListItem>
              <ListItemText primary="Dark Mode" />
              <Switch checked={darkMode} onChange={handleDarkModeToggle} />
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>
    </div>
  );
}
