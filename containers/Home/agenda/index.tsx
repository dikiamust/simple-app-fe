import React from 'react';
import { Container } from '@mui/system';

// material
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

// axios
import axios from 'axios';

// base URL
import BASE_URL from 'utils/baseUrl';

const Section = styled(Box)(({ theme }) => ({
  padding: '0 80px',
  position: 'relative',
  backgroundColor: '#FFFFFF',
  [theme.breakpoints.down('sm')]: {
    padding: '0 24px',
    backgroundSize: '138px 144px',
  },
  [theme.breakpoints.down(321)]: {
    padding: '0 15px',
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '29px',
  lineHeight: '33px',
  color: '#01110C',
  textAlign: 'center',
  margin: '50px 0',
  [theme.breakpoints.down('sm')]: {
    fontSize: '20px',
    lineHeight: '24px',
  },
}));

const Agenda = () => {
  return (
    <>
      <Section>
        <Container>
          <Title>View All Events</Title>
        </Container>
      </Section>
    </>
  );
};

export default Agenda;
