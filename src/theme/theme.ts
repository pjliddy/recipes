import { ThemeOptions } from '@mui/material/styles';
import colors from 'theme/colors';
const baseTheme: ThemeOptions = {
  palette: {
    primary: {
      main: colors.primary.main,
    },
    secondary: {
      main: colors.secondary.main,
    },
    error: {
      main: colors.error.main,
    },
  },
  typography: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeightRegular: 400,
    fontWeightBold: 500,
    htmlFontSize: 18,
    h1: {
      fontFamily: '"Roboto"',
      fontWeight: 500,
      lineHeight: 1.25,
      fontSize: '2.2rem',
    },
    h2: {
      fontWeight: 500,
      lineHeight: 1.25,
      fontSize: '1.8rem',
    },
    h3: {
      fontWeight: 400,
      lineHeight: 1.125,
      fontSize: '1.4rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.2rem',
      lineHeight: 1.25,
    },
    h5: {
      fontWeight: 600,
      lineHeight: 1.25,
      fontSize: '1.1rem',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.25,
    },
  },
};

export default baseTheme;
