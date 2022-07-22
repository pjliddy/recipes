import { ThemeOptions } from '@mui/material/styles';
import colors from 'theme/colors';

const cardTheme: ThemeOptions = {
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          '& .MuiCardActionArea-root': {
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
          },
          '& .MuiCardHeader': {
            '&-root': {
              backgroundColor: colors.primary.main,
              color: '#fff',
              display: 'flex',
              width: '100%',
            },
            '&-content': {
              display: 'flex',
              flexDirection: 'column-reverse',
            },
            '&-subheader': {
              color: colors.common.white,
            },
          },
          '& .MuiCardContent-root': {
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            justifyContent: 'space-between',
            width: '100%',
          },
          '& .MuiCardActions-root': {
            padding: '1rem',
            marginTop: 'auto',
          },
        },
      },
    },
  },
};

export default cardTheme;
