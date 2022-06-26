import { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createClient, Provider } from 'urql';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import AppRoutes from './AppRoutes';
import Loading from 'components/Loading';
import ScrollToTop from 'components/ScrollToTop';

import theme from 'theme';
import { getContent } from 'lib/content';
import { taxonomyQuery } from 'lib/queries';

import { Maybe, Taxonomy, TaxonomyCollection } from 'schema';

// lazy load view components and assign webpack chunk names
const NavBar = lazy(
  () => import(/* webpackChunkName: 'navbar' */ 'components/NavBar/NavBar')
);

const renderFallback = () => <Loading />;

const { REACT_APP_CDA_TOKEN, REACT_APP_SPACE_ID } = process.env;

const client = createClient({
  url: `https://graphql.contentful.com/content/v1/spaces/${REACT_APP_SPACE_ID}/`,
  fetchOptions: {
    headers: { authorization: `Bearer ${REACT_APP_CDA_TOKEN}` },
  },
  requestPolicy: 'cache-and-network',
});

const TAXONOMY = 'categories';

const App = () => {
  const [nav, setNav] = useState<Maybe<Taxonomy>>();
  const variables = { slug: TAXONOMY };

  useEffect(() => {
    getContent({ query: taxonomyQuery, variables }).then(
      ({ taxonomyCollection }: { taxonomyCollection: TaxonomyCollection }) => {
        setNav(taxonomyCollection?.items?.[0]);
      }
    );
  }, []);

  if (!nav) return <Loading />;

  return (
    <Provider value={client}>
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
    </Provider>
  );
};

export default App;
