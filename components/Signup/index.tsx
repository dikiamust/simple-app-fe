import React, { useState } from 'react';
import Image from 'next/image';

import { NextPage } from 'next';
import BASE_URL from 'utils/baseUrl';

import ErrorIcon from '@/svg/error-icon.svg';
import { validationSchema } from './ validationSchema';
import { ErrorTextAuth } from 'components/ErrorTextAuth';

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
  showPassword: boolean;
}

const SignupFormFormik: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [valuesPass, setValues] = useState<State>({
    password: '',
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...valuesPass,
      showPassword: !valuesPass.showPassword,
    });
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${BASE_URL}auth/signup`,
          formik.values,
          {
            headers: {
              'Content-Type': 'application/json',
              'Api-Version': 'v1',
            },
          }
        );

        if (response.status === 201) {
          toast.success(`Signup successfully`);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      } catch (error) {
        toast.error(`Signup failed`);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <Wrapper>
        <Typography component="h1" variant="h5" sx={{ color: 'white' }}>
          Sign up
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
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.touched.name && formik.errors.name ? (
            <ContainerError>
              <ImageErrorWrapper>
                <Image
                  src={ErrorIcon}
                  alt="Error Icon"
                  objectFit="fill"
                  quality={100}
                />
              </ImageErrorWrapper>
              <ErrorTextAuth>{formik.errors.name}</ErrorTextAuth>
            </ContainerError>
          ) : null}

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

          <Button
            type="submit"
            fullWidth
            variant="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </Button>
        </Box>
      </Wrapper>
      <DummyBox />
      <Toaster richColors />
    </>
  );
};

export default SignupFormFormik;
