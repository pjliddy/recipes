import { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import AppRoutes from './AppRoutes';
import Loading from 'components/Loading';
import ScrollToTop from 'components/ScrollToTop';

import { getContent } from 'lib/content';
import { taxonomyQuery } from 'lib/queries';
import { Maybe, Taxonomy, TaxonomyCollection } from 'schema';

import theme from 'theme';

// lazy load view components and assign webpack chunk names
const NavBar = lazy(
  () => import(/* webpackChunkName: 'navbar' */ 'components/NavBar/NavBar')
);

const renderFallback = () => <Loading />;

const TAXONOMY = 'categories';

const App = () => {
  const [nav, setNav] = useState<Maybe<Taxonomy>>();
  const variables = {
    slug: TAXONOMY,
  };

  useEffect(() => {
    getContent({ query: taxonomyQuery, variables }).then(
      ({ taxonomyCollection }: { taxonomyCollection: TaxonomyCollection }) => {
        setNav(taxonomyCollection?.items?.[0]);
      }
    );
  }, []);

  if (!nav) return <Loading />;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <NavBar nav={nav} />
        <ScrollToTop />
        <Suspense fallback={renderFallback()}>
          <AppRoutes />
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
