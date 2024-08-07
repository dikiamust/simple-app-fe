import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Box, Button, Typography, styled } from '@mui/material';
import { Toaster } from 'sonner';
import {
  Google as GoogleIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';
import { signIn, signOut, useSession } from 'next-auth/react';

// components
import Meta from 'components/Meta';

const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const SigninPage: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (status === 'authenticated') {
  //     router.push('/dashboard');
  //   }
  // }, [status, router]);

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
    router.push('/');
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Meta
        title="Simple-App"
        description="Simple-App"
        pathName="/"
        thumbnail=""
      />
      <Wrapper>
        <Typography component="h1" variant="h5" sx={{ color: 'white' }}>
          Sign up
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{ mt: 2 }}
        >
          Logout
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleSignIn}
          sx={{ mt: 2 }}
        >
          Sign in with Google
        </Button>
      </Wrapper>
      <Toaster richColors />
    </>
  );
};

export default SigninPage;
