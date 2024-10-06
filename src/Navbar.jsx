import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import CollectionsIcon from '@mui/icons-material/Collections';

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

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
        <AppBar position="static" sx={{ width: '90%', background: 'white', color: 'black', boxShadow: 'none' }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Link to='/' style={{ textDecoration: 'none' }}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'black' }}>
                Eezy Living
              </Typography>
            </Link>
            <Link to='/gallery' style={{ textDecoration: 'none' }}>
              <CollectionsIcon sx={{  color: 'black' }}/>
            </Link>
            <IconButton color="inherit" onClick={handleAccountClick}>
              <AccountCircleIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Account Modal */}
      {accountOpen && (
  <Slide direction="up" in={accountOpen} mountOnEnter unmountOnExit>
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1300, 
      }}
    >
      <div
        style={{
          backgroundColor: 'black',
          color: 'white',
          borderRadius: '10px',
          border: '2px solid purple',
          width: '80%',
          maxWidth: '500px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
          zIndex: 1400, 
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px',
            backgroundColor: 'black',
            color: 'white',
            borderBottom: '2px solid purple',
          }}
        >
          <h2 style={{ margin: 0 }}>Account Options</h2>
          <IconButton
            aria-label="close"
            onClick={handleAccountClose}
            style={{ color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
        </div>

        <div style={{ padding: '16px' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {/* Link to Sign up */}
            <li style={{ marginBottom: '8px' }}>
                  <Link to='/signup' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <button
                      style={{
                        backgroundColor: 'black',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        width: '100%',
                        textAlign: 'left',
                        fontSize: '16px',
                        transition: 'background-color 0.3s',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'purple'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'black'}
                    >
                      Sign up
                    </button>
                  </Link>
                </li>

                {/* Link to Sign in */}
                <li style={{ marginBottom: '8px' }}>
                  <Link to='/login' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <button
                      style={{
                        backgroundColor: 'black',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        width: '100%',
                        textAlign: 'left',
                        fontSize: '16px',
                        transition: 'background-color 0.3s',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'purple'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'black'}
                    >
                      Sign in
                    </button>
                  </Link>
                </li>

                {/* Link to Profile */}
                <li style={{ marginBottom: '8px' }}>
                  <Link to='/profile' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <button
                      style={{
                        backgroundColor: 'black',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        width: '100%',
                        textAlign: 'left',
                        fontSize: '16px',
                        transition: 'background-color 0.3s',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'purple'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'black'}
                    >
                      Profile
                    </button>
                  </Link>
                  </li>
          </ul>
        </div>
      </div>
    </div>
  </Slide>
)}

    </div>
  );
}



