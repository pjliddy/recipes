import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { Maybe, Taxonomy } from '../../schema';

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

const NavDrawer = ({ isOpen, nav, onClick }: NavDrawerType) => (
  <Box component="nav">
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
      <Box onClick={onClick}>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/">
              <ListItemText primary="All Recipes" />
            </ListItemButton>
          </ListItem>

          <Divider />

          {nav.map((item) => {
            const { linkedFrom, slug, title } = item ?? {};

            console.log({ item, linkedFrom });

            // TODO: update content moded to use Tag as top level for taxonomy,
            // so that linkedFrom has values (i.e., Meat as Category is not linkedFrom any recipe)

            return (
              <ListItem key={slug} disablePadding>
                <ListItemButton component={Link} to={`/category/${slug}`}>
                  <ListItemText primary={title} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
      {/* {drawer} */}
    </Drawer>
  </Box>
);

export default NavDrawer;
