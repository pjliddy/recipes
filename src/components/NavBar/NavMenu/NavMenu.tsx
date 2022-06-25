import { Link } from 'react-router-dom';

import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import CategoryMenu from 'components/NavBar/NavMenu/CategoryMenu';

import { Maybe, Tag, Taxonomy } from 'schema';

const styles = {
  drawer: {
    display: 'block',
    '& .MuiDrawer-paper': {
      boxSizing: 'border-box',
      width: 240,
    },
  },
};

type NavMenuType = {
  isOpen: boolean;
  nav: Maybe<Taxonomy>[];
  onClick: VoidFunction;
};

const NavMenu = ({ isOpen, nav, onClick }: NavMenuType) => {
  return (
    <Drawer
      anchor="right"
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      onClose={onClick}
      open={isOpen}
      sx={styles.drawer}
      variant="temporary"
    >
      <List component="nav">
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

          return numRecipes ? (
            <CategoryMenu key={node?.sys?.id} node={node} onClick={onClick} />
          ) : null;
        })}
      </List>
    </Drawer>
  );
};

export default NavMenu;
