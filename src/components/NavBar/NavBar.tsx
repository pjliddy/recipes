import { useState } from 'react';

import AppBar from '@mui/material/AppBar';
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
    <AppBar component="nav">
      <Toolbar>
        <LogoButton />
        <MenuButton onClick={handleDrawerToggle} />
      </Toolbar>
      <NavDrawer nav={nav} onClick={handleDrawerToggle} isOpen={isDrawerOpen} />
    </AppBar>
  );
};

export default NavBar;
