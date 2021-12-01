//styles/theme.ts

import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    common: {
      black: '#000000',
      white: '#ffffff',
    },
    primary: {
      light: '#686868',
      main: '#2b2b2b',
      dark: '#1B1B1B',
    },
    secondary: {
      main: '#fff',
    },
  },
  typography: {
    fontFamily: 'Roboto',
  },
});

export default theme;
