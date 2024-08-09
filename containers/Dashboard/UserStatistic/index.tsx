import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from 'utils/baseUrl';

const UserStatistic = () => {
  const [userStatistics, setUserStatistics] = useState({
    totalUsers: 0,
    activeSessionsToday: 0,
    averageActiveSessionsLast7Days: 0,
  });

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

    fetchUserStatistics();
  }, []);

  return (
    <>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardHeader title="Total Users" />
          <CardContent>
            <Typography variant="h4">{userStatistics.totalUsers}</Typography>
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
    </>
  );
};

export default UserStatistic;
