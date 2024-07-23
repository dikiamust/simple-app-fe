import { Box, styled, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';

import SignupFormFormik from 'components/Signup';

const Section = styled(Box)(({ theme }) => ({
  backgroundColor: '#FFFCF9',
  minHeight: '80vh',
  marginTop: '-20px',
  paddingTop: '20px',
  [theme.breakpoints.down('md')]: {
    marginTop: '-5px',
    paddingTop: '5px',
  },
}));

const CustomBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(5),
  marginTop: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '64px',
  color: '#000336',
  fontWeight: 'bold',
  margin: theme.spacing(4, 0, 4, 0),
  [theme.breakpoints.down('sm')]: {
    fontSize: '40px',
  },
}));

const Title2 = styled(Typography)(({ theme }) => ({
  fontSize: '23px',
  color: '#687690',
  fontWeight: '500',
  mt: 10,
  mb: 4,
}));

const Title3 = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  color: '#5A6473',
  my: 4,
}));

const SignupFormContainer = styled(Box)(({ theme }) => ({
  flex: '1.25',
}));

const TextWrapper = styled(Box)(({ theme }) => ({
  flex: '1',
}));

const Hero = () => {
  return (
    <Section>
      <Container>
        <CustomBox>
          <TextWrapper>
            <Title2>Welcome to Green Peace</Title2>
            <Title variant="h1">Explore and Join Our Events.</Title>
            <Title3>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem,
              ipsa.
            </Title3>
          </TextWrapper>

          {/* <SignupFormContainer>
            <SignupFormFormik />
          </SignupFormContainer> */}
        </CustomBox>
      </Container>
    </Section>
  );
};

export default Hero;
