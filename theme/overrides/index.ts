import { Theme, ThemeOptions } from '@mui/material';
import { merge } from 'lodash';

import CssBaseline from './CssBaseline';
import Typography from './Typography';
import Button from './Button';

export default function ComponentsOverrides(
  theme: Theme
): ThemeOptions['components'] {
  return merge(CssBaseline(), Typography(), Button(theme));
}
