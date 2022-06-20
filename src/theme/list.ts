import { ThemeOptions } from '@mui/material/styles';

// TODO: differentiate between nav list and recipe lists
// recipe lists introduce .25rem margin left, not wanted in nav

const listTheme: ThemeOptions = {
  components: {
    MuiList: {
      styleOverrides: {
        root: {
          '&.recipeList': {
            marginLeft: '.25rem',
          },
          '& .MuiListItem-root': {
            '& .MuiListItemIcon-root': {
              alignItems: 'center',
              marginRight: '.5rem',
              height: '1.5rem',
              width: '1.5rem',
              minWidth: 0,
              '& .MuiSvgIcon-root': {
                height: '1.5rem',
                width: '1.5rem',
              },
            },
            '& .MuiListItemAvatar-root': {
              alignItems: 'center',
              display: 'flex',
              marginRight: '.5rem',
              minWidth: 0,
              '& .MuiAvatar-root': {
                backgroundColor: '#004802',
                fontSize: '.8rem',
                fontWeight: '600',
                height: '1.5rem',
                letterSpacing: '.5px',
                paddingTop: `${1 / 16}rem`,
                width: '1.5rem',
              },
            },
          },
        },
      },
    },
  },
};

export default listTheme;
