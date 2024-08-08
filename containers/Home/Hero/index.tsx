import { Box, styled, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';

const Section = styled(Box)(({ theme }) => ({
  backgroundColor: '#FFFCF9',
  minHeight: '58vh',
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

const Title2 = styled(Typography)(({ theme }) => ({
  fontSize: '23px',
  color: '#687690',
  fontWeight: '500',
  mt: 10,
  mb: 4,
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
            <Title2>Welcome to Simple-App Dashboard</Title2>
          </TextWrapper>
        </CustomBox>
      </Container>
    </Section>
  );
};

export default Hero;
