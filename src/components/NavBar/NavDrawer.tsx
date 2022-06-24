import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import CategoryMenu from './CategoryMenu';

import { Maybe, Tag, Taxonomy } from '../../schema';

const styles = {
  drawer: {
    display: 'block',
    '& .MuiDrawer-paper': {
      boxSizing: 'border-box',
      width: 240,
    },
  },
};

type NavDrawerType = {
  isOpen: boolean;
  nav: Maybe<Taxonomy>[];
  onClick: VoidFunction;
};

const NavDrawer = ({ isOpen, nav, onClick }: NavDrawerType) => {
  // console.log({ nav });
  return (
    <Box component="nav">
      <Drawer
        anchor="right"
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        onClose={onClick}
        open={isOpen}
        sx={styles.drawer}
        variant="persistent"
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/" onClick={onClick}>
              <ListItemText primary="All Recipes" />
            </ListItemButton>
          </ListItem>

          <Divider />

          {nav?.map((node: Maybe<Taxonomy>) => {
            const categoryTag = (node?.tag || node) as Tag;
            const { linkedFrom } = categoryTag ?? {};
            const { recipeCollection } = linkedFrom ?? {};
            const { total: numRecipes } = recipeCollection ?? {};

            // console.log({ type }, { recipeCollection }, { numRecipes });

            return numRecipes ? (
              <CategoryMenu key={node?.sys?.id} node={node} onClick={onClick} />
            ) : null;
          })}
        </List>
      </Drawer>
    </Box>
  );
};

export default NavDrawer;
