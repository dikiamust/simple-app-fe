import React from 'react';
import { Box, styled } from '@mui/material';

// components
import Footer from 'components/Footer';
import Header from 'components/Header';
import SignupFormFormik from 'components/Signup';

const Section = styled(Box)(({ theme }) => ({
  backgroundColor: '#48773E',
  marginTop: '-20px',
  paddingTop: '20px',
  [theme.breakpoints.down('md')]: {
    marginTop: '-5px',
    paddingTop: '5px',
  },
}));

const Signup = () => {
  return (
    <>
      <Header />
      <Section>
        <SignupFormFormik />
      </Section>
      <Footer />
    </>
  );
};

export default Signup;
