import React from 'react';
import { useRouter } from 'next/router';

// material
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

// components
import Header4 from 'components/Header';

const Section = styled(Box)(({ theme }) => ({
  height: '100vh',
  widht: '100vw',
  backgroundColor: 'black',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left 67%',
  backgroundSize: '130vw 190vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  position: 'relative',
  padding: '0 80px 100px 80px',
  [theme.breakpoints.down('sm')]: {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center top',
    backgroundSize: 'auto 120vh',
    padding: '0',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
}));

const Heading2 = styled(Typography)(({ theme }) => ({
  position: 'relative',
  fontFamily: 'Bahnschrift',
  fontWeight: 400,
  fontSize: '48px',
  lineHeight: '58px',
  marginTop: '10px',
  color: '#FFFFFF',
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
    fontSize: '28px',
    lineHeight: '42px',
  },
}));

const Body2 = styled(Typography)(({ theme }) => ({
  fontFamily: 'Bahnschrift',
  fontWeight: 300,
  fontSize: '24px',
  lineHeight: '32px',
  color: '#FFFFFF',
  [theme.breakpoints.down('sm')]: {
    marginTop: '5px',
    textAlign: 'center',
    fontSize: '18px',
    lineHeight: '22px',
  },
}));

const NotFoundContainer = () => {
  const router = useRouter();
  return (
    <Box sx={{ position: 'relative' }}>
      <Header4 />
      <Section>
        <Box
          sx={{
            width: { md: '1024px', xs: '300px' },
            mt: { sm: '7%', xs: '11vh' },
          }}
        >
          <Heading2>Oops! This Page Isn't Available</Heading2>
          <Body2>
            It looks like you've taken a wrong turn. The page you're looking for
            can't be found. Let's get you back on track!{' '}
            <Box
              component="span"
              sx={{
                cursor: 'pointer',
                fontWeight: 400,
                textDecoration: 'underline',
                textDecorationThickness: '1px',
              }}
              onClick={() => router.push('/')}
            >
              back.
            </Box>
          </Body2>
        </Box>
      </Section>
    </Box>
  );
};

export default NotFoundContainer;
