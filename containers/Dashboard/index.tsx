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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
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
  const [loading, setLoading] = useState(true);

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

    fetchUserStatistics();
    fetchUsers();
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
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Logout'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => handleItemClick(text)}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
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
          <>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardHeader title="Total Users" />
                  <CardContent>
                    <Typography variant="h5">
                      {userStatistics.totalUsers}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardHeader title="Active Sessions Today" />
                  <CardContent>
                    <Typography variant="h5">
                      {userStatistics.activeSessionsToday}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardHeader title="Average Active Sessions Last 7 Days" />
                  <CardContent>
                    <Typography variant="h5">
                      {userStatistics.averageActiveSessionsLast7Days}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Typography variant="h6" paragraph sx={{ mt: 4 }}>
              Users List
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Sign Up Timestamp</TableCell>
                    <TableCell>Number of Logins</TableCell>
                    <TableCell>Last Logout Timestamp</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user?.id}>
                      <TableCell>{user?.name}</TableCell>
                      <TableCell>{user?.email}</TableCell>
                      <TableCell>
                        {new Date(user?.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell>{user?.loginCount}</TableCell>
                      <TableCell>
                        {user.logoutAt
                          ? new Date(user?.logoutAt).toLocaleString()
                          : 'N/A'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
