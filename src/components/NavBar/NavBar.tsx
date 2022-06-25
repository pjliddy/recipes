import { useState } from 'react';

import { useQuery, ApolloError } from '@apollo/client';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import Loading from 'components/Loading';
import LogoButton from 'components/NavBar/LogoButton';
import MenuButton from 'components/NavBar/MenuButton';
import NavMenu from 'components/NavBar/NavMenu/NavMenu';

import { TaxonomyCollection } from 'schema';

import { taxonomyQuery } from 'lib/queries';

const TAXONOMY = 'categories';

type QueryProps = {
  loading: boolean;
  error?: ApolloError | undefined;
  data?: {
    taxonomyCollection: TaxonomyCollection;
  };
};

const NavBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { loading, error, data }: QueryProps = useQuery(taxonomyQuery, {
    variables: { slug: TAXONOMY },
  });

  if (loading) return <Loading />;
  if (error) console.error(error);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const navData = data?.taxonomyCollection?.items?.[0];

  return (
    <AppBar component="nav">
      <Toolbar>
        <LogoButton />
        <MenuButton onClick={handleDrawerToggle} />
      </Toolbar>
      <NavMenu
        nav={navData}
        onClick={handleDrawerToggle}
        isOpen={isDrawerOpen}
      />
    </AppBar>
  );
};

export default NavBar;
