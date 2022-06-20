import { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import Loading from './components/Loading';
import ScrollToTop from './components/ScrollToTop';

import theme from './theme';

import { Maybe, Taxonomy } from './schema';
import { getTaxonomy } from './lib/content';

// lazy load view components and assign webpack chunk names
const NavBar = lazy(
  () => import(/* webpackChunkName: 'navbar' */ './components/NavBar')
);

const HomePage = lazy(
  () => import(/* webpackChunkName: 'homepage' */ './pages/HomePage')
);

const ListPage = lazy(
  () => import(/* webpackChunkName: 'listpage' */ './pages/ListPage')
);

const RecipePage = lazy(
  () => import(/* webpackChunkName: 'recipepage' */ './pages/RecipePage')
);

const taxonomy = 'Categories';

const renderFallback = () => <Loading />;

const App = () => {
  const [nav, setNav] = useState<Array<Maybe<Taxonomy>> | undefined>();

  useEffect(() => {
    getTaxonomy({ taxonomy }).then((categories: Taxonomy[]) =>
      setNav(categories)
    );
  }, []);

  if (!nav) return <Loading />;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Suspense fallback={renderFallback()}>
          <ScrollToTop />
          <NavBar nav={nav} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="category/:tag" element={<ListPage />} />
            <Route path="tag/:tag" element={<ListPage />} />
            <Route path="/recipe/" element={<Navigate to="/" />} />
            <Route path="/recipe/:slug" element={<RecipePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
