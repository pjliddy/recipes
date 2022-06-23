import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { Maybe, TagLinkingCollections, Taxonomy } from '../../schema';

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

          {nav.map((node) => {
            // TODO: need some kind of recursive parser (or just pass node into menu item to decide)
            const { slug, title, tag, __typename: type } = node ?? {};

            const { linkedFrom: tagLinks } = tag ?? {};
            const { linkedFrom } = node ?? {};

            const nodeLinks = linkedFrom as Maybe<TagLinkingCollections>;

            const numRecipes =
              tagLinks?.recipeCollection?.['total'] ||
              nodeLinks?.recipeCollection?.['total'];

            // const { recipeCollection } = tagLinks ?? {};
            // const { total: numRecipes } = recipeCollection ?? {};
            // const links = nodeLinks || tagLinks;
            // console.log({ title });
            // console.log({ slug });
            // console.log({ slug });
            // console.log({ tag });
            // console.log({ type });
            // console.log({ numRecipes });

            // const { recipeCollection } = links ?? {};

            console.log(title, type, tag, numRecipes);
            // console.log(links, recipeCollection);

            // console.log(tag?.linkedFrom?.recipeCollection?.total);
            // TODO: update content moded to use Tag as top level for taxonomy,
            // so that linkedFrom has values (i.e., Meat as Category is not linkedFrom any recipe)

            if (!numRecipes) return null;

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
