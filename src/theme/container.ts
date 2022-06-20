import { ThemeOptions } from '@mui/material/styles';
import { createBreakpoints } from '@mui/system';

const breakpoints = createBreakpoints({});

const containerTheme: ThemeOptions = {
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          '&.main': {
            marginTop: '5rem',
            paddingBottom: '3rem',
            [breakpoints.up('md')]: {
              marginTop: '6rem',
            },
          },
        },
      },
    },
  },
};

export default containerTheme;
