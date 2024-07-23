import { PropsWithChildren, ReactElement, useMemo } from 'react';
// material
import { CssBaseline } from '@mui/material';
import {
  Breakpoint,
  createTheme,
  CSSObject,
  StyledEngineProvider,
  ThemeOptions,
  ThemeProvider,
} from '@mui/material/styles';
//
import GlobalStyles from './globalStyles';
import ComponentsOverrides from './overrides';
import breakpoints from './breakpoints';
import palette from './palette';
import typography from './typography';

declare module '@mui/material/styles' {
  interface Palette {
    special: typeof palette.special;
    neutral: typeof palette.neutral;
  }

  interface PaletteOptions {
    special?: typeof palette.special;
    neutral?: typeof palette.neutral;
  }
}

export type ResponsiveStyle = { [key in Breakpoint]?: CSSObject };

export function responsiveStyle(styles: ResponsiveStyle) {
  const bp = breakpoints.values;

  if (bp === undefined) return {};

  const bpKeys = Object.keys(bp) as Breakpoint[];
  const initalStyles: CSSObject = {};
  const cssStyles: CSSObject = bpKeys.reduce(
    (obj, key) => ({ ...obj, [`@media (min-width:${bp[key]})`]: styles[key] }),
    initalStyles
  );

  return cssStyles;
}

// ------------------------------------------------------------------------------------

export default function ThemeConfig({
  children,
}: PropsWithChildren): ReactElement {
  const themeOptions = useMemo<ThemeOptions>(
    () => ({
      breakpoints,
      palette,
      typography,
    }),
    []
  );

  const theme = createTheme(themeOptions);
  theme.components = ComponentsOverrides(theme);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
