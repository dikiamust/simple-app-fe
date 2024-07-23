import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/router';

// material
import { Box, styled, Typography, Divider } from '@mui/material';
import { Container } from '@mui/system';

// images
import LogoPrimary from '@/svg/Logo-1.svg';
import Instagram from '@/svg/IG-green.svg';
import Youtube from '@/svg/YT-green.svg';
import Twitter from '@/svg/Twitter-green.svg';

const ContainerFooter = styled(Box)(({ theme }) => ({
  backgroundColor: '#FFFFFF',
  display: 'flex',
  flexDirection: 'column',
  padding: '0',
  marginTop: '100px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '14px',
  },
}));

const TopContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#FFFFFF',
  display: 'flex',
  padding: '20px 80px',
  justifyContent: 'space-between',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '14px',
  },
}));

const Body5 = styled(Typography)(({ theme }) => ({
  fontFamily: 'Bahnschrift',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '20px',
  color: '#48773E',
  maxWidth: '200px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
  },
}));

const Body4 = styled(Typography)(({ theme }) => ({
  fontFamily: 'Bahnschrift',
  fontWeight: 400,
  fontSize: '18px',
  lineHeight: '22px',
  color: '#FFFFFF',
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  width: '145px',
  position: 'relative',
  cursor: 'pointer',
  [theme.breakpoints.down('sm')]: {
    width: '105px',
  },
}));

const BottomContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '13px 80px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  position: 'relative',
  backgroundColor: '#48773E',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

interface IconProps {
  src: StaticImageData | string;
  alt?: string;
  width?: string | '24px';
  height?: string | '24px';
}

const IconWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '25px',
  cursor: 'pointer',
  alignItems: 'center',
}));

const Icon = (props: IconProps) => {
  const { src, alt, width, height } = props;
  return (
    <Box sx={{ width: width, height: height }}>
      <Image alt={alt} src={src} objectFit="fill" quality={100} />
    </Box>
  );
};

const ContainerItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
}));

const Footer = () => {
  const router = useRouter();
  return (
    <Container>
      <ContainerFooter>
        <Divider />
        <TopContainer>
          <ImageContainer onClick={() => router.push('/')}>
            <Image
              alt="Logo Footer"
              src={LogoPrimary}
              objectFit="fill"
              quality={100}
            />
          </ImageContainer>

          <ContainerItem>
            <Body5>ABOUT</Body5>
            <Body5>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque,
              obcaecati.
            </Body5>
          </ContainerItem>

          <IconWrap>
            <Icon src={Youtube} alt="youtube" />
            <Icon src={Instagram} alt="instagram" />
            <Icon src={Twitter} alt="twitter" />
          </IconWrap>
        </TopContainer>

        <BottomContainer>
          <Body4>Copyright © 2024 dikiamust</Body4>
          <Body4>Privacy & Policy</Body4>
          <Body4>Terms & Conditions</Body4>
        </BottomContainer>
      </ContainerFooter>
    </Container>
  );
};

export default Footer;
