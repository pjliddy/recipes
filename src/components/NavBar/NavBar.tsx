import { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import LogoButton from './LogoButton';
import MenuButton from './MenuButton';
import NavDrawer from './NavDrawer';

import { Maybe, Taxonomy } from '../../schema';

type NavBarProps = {
  nav: Maybe<Taxonomy>[];
};

const NavBar = ({ nav }: NavBarProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  if (!nav) return null;

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <LogoButton />
          <MenuButton onClick={handleDrawerToggle} />
        </Toolbar>
      </AppBar>

      <NavDrawer nav={nav} onClick={handleDrawerToggle} isOpen={isDrawerOpen} />
    </Box>
  );
};

export default NavBar;
