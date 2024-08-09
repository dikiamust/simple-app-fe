import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import EditIcon from '@mui/icons-material/Edit';
import { signOut, useSession } from 'next-auth/react';
import axios from 'axios';
import BASE_URL from 'utils/baseUrl';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import UserStatistic from './UserStatistic';
import UserList from './UserList';

const drawerWidth = 240;

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [loggedInUser, setLoggedInUser] = useState({
    name: 'test',
    email: 'email',
  });

  const [openUpdateProfileButton, setOpenUpdateProfileButton] = useState(false);
  const [newUsername, setNewUsername] = useState('');

  const [password, setPassword] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [openResetPasswordButton, setOpenResetPasswordButton] = useState(false);

  useEffect(() => {
    const { token } = router.query;

    if (token) {
      localStorage.setItem('authToken', token as string);

      router.replace('/dashboard', undefined, { shallow: true });
    }
  }, [router]);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${BASE_URL}auth/my-profile`, {
          headers: {
            'Content-Type': 'application/json',
            'Api-Version': 'v1',
            Authorization: `Bearer ${token}`,
          },
        });
        setLoggedInUser(response.data.data);
      } catch (error) {
        console.error('Error fetching logged-in user:', error);
      }
    };

    fetchLoggedInUser();
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem('authToken');
    try {
      await axios.put(
        `${BASE_URL}auth/logout`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Api-Version': 'v1',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem('authToken');
      signOut({ callbackUrl: '/' });
      await router.push('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleItemClick = (text: string) => {
    if (text === 'Logout') {
      handleLogout();
    }
  };

  const handleUpdateProfile = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.put(
        `${BASE_URL}auth/update-profile`,
        { name: newUsername },
        {
          headers: {
            'Content-Type': 'application/json',
            'Api-Version': 'v1',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoggedInUser({ ...loggedInUser, name: response?.data?.data?.name });
      setOpenUpdateProfileButton(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleResetPassword = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.put(
        `${BASE_URL}auth/reset-password`,
        {
          oldPassword: password.oldPassword,
          newPassword: password.newPassword,
          confirmNewPassword: password.confirmNewPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Api-Version': 'v1',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOpenResetPasswordButton(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Simple-App Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <List sx={{ flexGrow: 1 }}>
            <ListItem disablePadding>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <AccountCircleIcon sx={{ fontSize: 40 }} />
                <ListItemText
                  primary={loggedInUser.name}
                  secondary={loggedInUser.email}
                  sx={{ textAlign: 'center' }}
                />
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => setOpenUpdateProfileButton(true)}
                  sx={{ mt: 2 }}
                >
                  Update Profile
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => setOpenResetPasswordButton(true)}
                  sx={{ mt: 2 }}
                >
                  Reset Password
                </Button>
              </Box>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleItemClick('Logout')}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Typography variant="h6" paragraph>
          User Statistics
        </Typography>
        <Grid container spacing={3}>
          <UserStatistic />
          <UserList />
        </Grid>
      </Box>
      <Dialog
        open={openUpdateProfileButton}
        onClose={() => setOpenUpdateProfileButton(false)}
      >
        <DialogTitle>Update Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update your profile, please enter your new username here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="New Username"
            fullWidth
            variant="standard"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUpdateProfileButton(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpdateProfile}>Update</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openResetPasswordButton}
        onClose={() => setOpenResetPasswordButton(false)}
      >
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To reset your password, please enter your old password and new
            password here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Old Password"
            type="password"
            fullWidth
            variant="standard"
            name="oldPassword"
            value={password.oldPassword}
            onChange={handleChangePassword}
          />
          <TextField
            margin="dense"
            label="New Password"
            type="password"
            fullWidth
            variant="standard"
            name="newPassword"
            value={password.newPassword}
            onChange={handleChangePassword}
          />
          <TextField
            margin="dense"
            label="Confirm New Password"
            type="password"
            fullWidth
            variant="standard"
            name="confirmNewPassword"
            value={password.confirmNewPassword}
            onChange={handleChangePassword}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenResetPasswordButton(false)}>
            Cancel
          </Button>
          <Button onClick={handleResetPassword}>Reset Password</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
