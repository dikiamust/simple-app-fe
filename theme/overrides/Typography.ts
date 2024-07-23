import { pxToRem } from '../typography';
import { responsiveStyle } from '..';
import { TypographyProps } from '@mui/material';

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h1: true;
    h2: true;
    h3: true;

    b1: true;
    b2: true;
    b3: true;
    b4: true;

    p1: true;
    p2: true;
    p3: true;
    p4: true;
  }
}

export default function Typography() {
  return {
    MuiTypography: {
      variants: [
        {
          props: { variant: 'h1' } as TypographyProps,
          style: responsiveStyle({
            xs: {
              fontSize: pxToRem(32),
              lineHeight: pxToRem(40),
            },
            sm: {
              fontSize: pxToRem(56),
              lineHeight: pxToRem(70),
            },
          }),
        },
        {
          props: { variant: 'h2' } as TypographyProps,
          style: responsiveStyle({
            xs: {
              fontSize: pxToRem(28),
              lineHeight: pxToRem(42),
            },
            sm: {
              fontSize: pxToRem(48),
              lineHeight: pxToRem(58),
            },
          }),
        },
        {
          props: { variant: 'h3' } as TypographyProps,
          style: {
            xs: {
              fontSize: pxToRem(18),
              lineHeight: pxToRem(22),
            },
            sm: {
              fontSize: pxToRem(36),
              lineHeight: pxToRem(44),
            },
          },
        },
        {
          props: { variant: 'b1' } as TypographyProps,
          style: responsiveStyle({
            xs: {
              fontSize: pxToRem(24),
              lineHeight: pxToRem(32),
            },
            sm: {
              fontSize: pxToRem(32),
              lineHeight: pxToRem(40),
            },
          }),
        },
        {
          props: { variant: 'b2' } as TypographyProps,
          style: responsiveStyle({
            xs: {
              fontSize: pxToRem(14),
              lineHeight: pxToRem(18),
            },
            sm: {
              fontSize: pxToRem(14),
              lineHeight: pxToRem(20),
            },
          }),
        },
        {
          props: { variant: 'b3' } as TypographyProps,
          style: {
            fontSize: pxToRem(12),
            lineHeight: pxToRem(16),
          },
        },
        {
          props: { variant: 'b4' } as TypographyProps,
          style: {
            fontSize: pxToRem(10),
            lineHeight: pxToRem(14),
          },
        },
        {
          props: { variant: 'p1' } as TypographyProps,
          style: {
            fontSize: pxToRem(16),
            lineHeight: pxToRem(24),
          },
        },
        {
          props: { variant: 'p2' } as TypographyProps,
          style: {
            fontSize: pxToRem(14),
            lineHeight: pxToRem(20),
          },
        },
        {
          props: { variant: 'p3' } as TypographyProps,
          style: {
            fontSize: pxToRem(12),
            lineHeight: pxToRem(16),
          },
        },
        {
          props: { variant: 'p4' } as TypographyProps,
          style: {
            fontSize: pxToRem(10),
            lineHeight: pxToRem(14),
          },
        },
      ],
    },
  };
}
