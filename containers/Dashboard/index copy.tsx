import * as React from 'react';
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
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const drawerWidth = 240;

interface User {
  id: number;
  createdAt: string;
  name: string;
  email: string;
  loginCount: number;
  logoutAt?: string;
}

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userStatistics, setUserStatistics] = useState({
    totalUsers: 0,
    activeSessionsToday: 0,
    averageActiveSessionsLast7Days: 0,
  });
  const [users, setUsers] = useState<User[]>([]);
  const [loggedInUser, setLoggedInUser] = useState({
    name: 'test',
    email: 'email',
  });
  const [loading, setLoading] = useState(true);
  const [openUpdateProfileButton, setOpenUpdateProfileButton] = useState(false);
  const [newUsername, setNewUsername] = useState('');

  const [password, setPassword] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [openResetPasswordButton, setOpenResetPasswordButton] = useState(false);

  useEffect(() => {
    const fetchUserStatistics = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${BASE_URL}user/statistic`, {
          headers: {
            'Content-Type': 'application/json',
            'Api-Version': 'v1',
            Authorization: `Bearer ${token}`,
          },
        });
        setUserStatistics(response.data.data);
      } catch (error) {
        console.error('Error fetching user statistics:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${BASE_URL}user`, {
          headers: {
            'Content-Type': 'application/json',
            'Api-Version': 'v1',
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

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

    fetchUserStatistics();
    fetchUsers();
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
      setLoggedInUser({ ...loggedInUser, name: response.data.data.name });
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
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardHeader title="Total Users" />
                <CardContent>
                  <Typography variant="h4">
                    {userStatistics.totalUsers}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardHeader title="Active Sessions Today" />
                <CardContent>
                  <Typography variant="h4">
                    {userStatistics.activeSessionsToday}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardHeader title="Average Active Sessions (Last 7 Days)" />
                <CardContent>
                  <Typography variant="h4">
                    {userStatistics.averageActiveSessionsLast7Days}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Sign Up Timestamp</TableCell>
                      <TableCell>Number of Logins</TableCell>
                      <TableCell>Logout Timestamp</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.createdAt}</TableCell>
                        <TableCell>{user.loginCount}</TableCell>
                        <TableCell>{user.logoutAt}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        )}
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
