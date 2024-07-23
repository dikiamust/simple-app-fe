import * as React from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import ListAltIcon from '@mui/icons-material/ListAlt';
import HomeIcon from '@mui/icons-material/Home';
import ContactsIcon from '@mui/icons-material/Contacts';
import Image, { StaticImageData } from 'next/image';

import { Container } from '@mui/system';

import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from '@mui/material';
import { useState } from 'react';
import { LinkOffTwoTone } from '@mui/icons-material';

import LogoPrimary from '@/svg/Logo-1.svg';

const NavLink = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: '#4F5361',
  fontWeight: 'bold',
  cursor: 'pointer',
  '&:hover': {
    color: '#fff',
  },
}));

const NavbarLinksBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const CustomMenuIcon = styled(MenuIcon)(({ theme }) => ({
  cursor: 'pointer',
  display: 'none',
  marginRight: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    display: 'block',
  },
}));

const NavbarContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  // backgroundColor: '#ACACAC',
  padding: theme.spacing(5),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
}));

const LeftContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '2.5rem',
}));

const RightContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
}));

const NavbarLogo = styled('img')(({ theme }) => ({
  cursor: 'pointer',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

export const Header = () => {
  const router = useRouter();

  const [mobileMenu, setMobileMenu] = useState({
    left: false,
  });

  const toggleDrawer = (anchor: any, open: any) => (event: any) => {
    if (
      event.type === 'keydown' &&
      (event.type === 'Tab' || event.type === 'Shift')
    ) {
      return;
    }

    setMobileMenu({ ...mobileMenu, [anchor]: open });
  };

  const list = (anchor: any) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Home', 'Features', 'Services', 'Listed', 'Contact'].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index === 0 && <HomeIcon />}
                  {index === 1 && <FeaturedPlayListIcon />}
                  {index === 2 && <MiscellaneousServicesIcon />}
                  {index === 3 && <ListAltIcon />}
                  {index === 4 && <ContactsIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </Box>
  );

  return (
    <NavbarContainer>
      <LeftContainer>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CustomMenuIcon onClick={toggleDrawer('left', true)} />
          <Drawer
            anchor="left"
            open={mobileMenu['left']}
            onClose={toggleDrawer('left', false)}
          >
            {list('left')}
          </Drawer>
          <Image src={LogoPrimary} alt="logo" />
        </Box>

        <NavbarLinksBox>
          <NavLink variant="body2" onClick={() => router.push('/')}>
            Home
          </NavLink>
          <NavLink variant="body2">Features</NavLink>
          <NavLink variant="body2">Services</NavLink>
          <NavLink variant="body2">Listed</NavLink>
          <NavLink variant="body2">Contact</NavLink>
        </NavbarLinksBox>
      </LeftContainer>

      <RightContainer>
        <NavLink variant="body2" onClick={() => router.push('/signup')}>
          Sign Up
        </NavLink>
        <Button
          variant="primary"
          sx={{ height: '38px', borderRadius: '10px' }}
          onClick={() => router.push('/signin')}
        >
          Sign In
        </Button>
      </RightContainer>
    </NavbarContainer>
  );
};

export default Header;
