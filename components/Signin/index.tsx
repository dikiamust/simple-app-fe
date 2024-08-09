import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import BASE_URL from 'utils/baseUrl';
import ErrorIcon from '@/svg/error-icon.svg';
import { validationSchema } from './validationSchema';
import { ErrorTextAuth } from 'components/ErrorTextAuth';
import { Google as GoogleIcon } from '@mui/icons-material';
import { signIn, useSession } from 'next-auth/react';

import {
  Box,
  Button,
  styled,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import axios from 'axios';
import { useFormik } from 'formik';
import { Toaster, toast } from 'sonner';

const DummyBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '20vh',
}));

const ContainerError = styled(Box)(({ theme }) => ({
  display: 'flex',
  mt: '10px',
  alignItems: 'start',
}));

const ImageErrorWrapper = styled(Box)(({ theme }) => ({
  width: '16px',
  height: '16px',
  [theme.breakpoints.down('sm')]: {
    width: '13px',
    height: '13px',
  },
}));

const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

interface State {
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
}

const SigninFormFormik: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [loading, setLoading] = useState<boolean>(false);
  const [valuesPass, setValues] = useState<State>({
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...valuesPass,
      showPassword: !valuesPass.showPassword,
    });
  };

  const handleClickShowConfirmPassword = () => {
    setValues({
      ...valuesPass,
      showConfirmPassword: !valuesPass.showConfirmPassword,
    });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${BASE_URL}auth/signin`,
          formik.values,
          {
            headers: {
              'Content-Type': 'application/json',
              'Api-Version': 'v1',
            },
          }
        );

        if (response.status === 200 && response?.data?.data?.token) {
          toast.success(`Signin successfully`);
          localStorage.setItem('authToken', response?.data?.data?.token);
          setTimeout(async () => {
            await router.push('/dashboard');
          }, 1500);
          return;
        }
        toast.error(`Signin failed`);
      } catch (error) {
        toast.error(`Signin failed`);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/signin' });
  };

  useEffect(() => {
    if (session) {
      const token = session?.token;
      if (token) {
        localStorage.setItem('authToken', token);
        toast.success('Google Signin successfully');
        router.push('/dashboard');
      }
    }
  }, [session, router]);

  return (
    <>
      <Wrapper>
        <Typography component="h1" variant="h5" sx={{ color: 'white' }}>
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{
            mt: 3,
            zIndex: 2,
            maxWidth: '350px',
            backgroundColor: 'white',
            padding: '35px',
            borderRadius: '10px',
          }}
          onBlur={formik.handleBlur}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email ? (
            <ContainerError>
              <ImageErrorWrapper>
                <Image
                  src={ErrorIcon}
                  alt="Error Icon"
                  objectFit="fill"
                  quality={100}
                />
              </ImageErrorWrapper>
              <ErrorTextAuth>{formik.errors.email}</ErrorTextAuth>
            </ContainerError>
          ) : null}

          <TextField
            margin="normal"
            required
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            type={valuesPass.showPassword ? 'text' : 'password'}
            name="password"
            label="Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {valuesPass.showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {formik.touched.password && formik.errors.password ? (
            <ContainerError>
              <ImageErrorWrapper>
                <Image
                  src={ErrorIcon}
                  alt="Error Icon"
                  objectFit="fill"
                  quality={100}
                />
              </ImageErrorWrapper>
              <ErrorTextAuth>{formik.errors.password}</ErrorTextAuth>
            </ContainerError>
          ) : null}

          <TextField
            margin="normal"
            required
            fullWidth
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            type={valuesPass.showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            label="Confirm Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={handleClickShowConfirmPassword}
                  >
                    {valuesPass.showConfirmPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <ContainerError>
              <ImageErrorWrapper>
                <Image
                  src={ErrorIcon}
                  alt="Error Icon"
                  objectFit="fill"
                  quality={100}
                />
              </ImageErrorWrapper>
              <ErrorTextAuth>{formik.errors.confirmPassword}</ErrorTextAuth>
            </ContainerError>
          ) : null}

          <Button
            type="submit"
            fullWidth
            variant="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Loading...' : 'Sign In'}
          </Button>

          <Button
            variant="contained"
            fullWidth
            color="primary"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleSignIn}
          >
            Sign in with Google
          </Button>
        </Box>
      </Wrapper>
      <DummyBox />
      <Toaster richColors />
    </>
  );
};

export default SigninFormFormik;
