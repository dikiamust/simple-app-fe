import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from 'utils/baseUrl';

interface User {
  id: number;
  createdAt: string;
  name: string;
  email: string;
  loginCount: number;
  logoutAt?: string;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
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
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
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
      </Grid>
    </>
  );
};

export default UserList;
