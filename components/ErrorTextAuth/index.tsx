import { styled } from '@mui/system';

export const ErrorTextAuth = styled('span')(({ theme }) => ({
  fontFamily: 'Bahnschrift',
  fontStyle: 'normal',
  fontWeight: 300,
  fontSize: '15px',
  lineHeight: '22px',
  color: '#D82828',
  marginLeft: '9px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
  },
}));
