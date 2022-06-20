import { useState } from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';

import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import MenuIcon from '@mui/icons-material/Menu';

import { Maybe, Taxonomy } from '../schema';

const drawerWidth = 240;

const styles = {
  drawer: {
    display: 'block',
    '& .MuiDrawer-paper': {
      boxSizing: 'border-box',
      width: drawerWidth,
    },
  },
  logo: {
    color: '#fff',
    display: 'flex',
    marginRight: 'auto',
    textTransform: 'capitalize',
  },
  menuIcon: { ml: 'auto' },
};

type NavBarProps = {
  nav: Maybe<Taxonomy>[];
};

const NavBar = ({ nav }: NavBarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!nav) return null;

  const handleDrawerToggle = () => {
    setIsOpen(!isOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemText primary="All Recipes" />
          </ListItemButton>
        </ListItem>

        <Divider />

        {nav.map((item) => {
          const { slug, title } = item ?? {};

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
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <Button
            color="primary"
            component={Link}
            size="large"
            startIcon={<CollectionsBookmarkIcon />}
            sx={styles.logo}
            to="/"
          >
            Recipes
          </Button>

          <IconButton
            aria-label="open drawer"
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={styles.menuIcon}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box component="nav">
        <Drawer
          anchor="right"
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          onClose={handleDrawerToggle}
          open={isOpen}
          variant="temporary"
          sx={styles.drawer}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default NavBar;
