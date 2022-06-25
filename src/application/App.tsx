import { lazy, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import AppRoutes from './AppRoutes';
import Loading from 'components/Loading';
import ScrollToTop from 'components/ScrollToTop';

import theme from 'theme';

// import { Maybe, Taxonomy } from 'schema';
// import { getTaxonomy } from 'lib/content';

// lazy load view components and assign webpack chunk names
const NavBar = lazy(
  () => import(/* webpackChunkName: 'navbar' */ 'components/NavBar/NavBar')
);

const { REACT_APP_CDA_TOKEN, REACT_APP_SPACE_ID } = process.env;
// const taxonomy = 'categories';
const renderFallback = () => <Loading />;

const client = new ApolloClient({
  uri: `https://graphql.contentful.com/content/v1/spaces/${REACT_APP_SPACE_ID}/`,
  cache: new InMemoryCache(),
  ssrMode: true,
  headers: {
    authorization: `Bearer ${REACT_APP_CDA_TOKEN}`,
  },
});

const App = () => {
  // const [nav, setNav] = useState<Maybe<Taxonomy> | undefined>();

  // useEffect(() => {
  //   getTaxonomy({ taxonomy }).then((categories: Taxonomy) =>
  //     setNav(categories)
  //   );
  // }, []);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Suspense fallback={renderFallback()}>
            <ScrollToTop />
            <NavBar />
            <AppRoutes />
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
