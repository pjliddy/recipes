import { useState } from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';

import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import MenuIcon from '@mui/icons-material/Menu';

import NavDrawer from './NavDrawer';

import { Maybe, Taxonomy } from '../../schema';

const styles = {
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

      <NavDrawer
        nav={nav}
        onClick={handleDrawerToggle}
        onClose={handleDrawerToggle}
        isOpen={isOpen}
      />
    </Box>
  );
};

export default NavBar;
