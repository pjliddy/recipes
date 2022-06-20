import { useState, useEffect } from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import theme from './theme';

import NavBar from './components/Navbar';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import RecipePage from './pages/RecipePage';
import Loading from './components/Loading';

import { Maybe, Taxonomy } from './schema';
import { getTaxonomy } from './lib/content';

const taxonomy = 'Categories';

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
        <NavBar nav={nav} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="category/:tag" element={<ListPage />} />
          <Route path="tag/:tag" element={<ListPage />} />
          <Route path="/recipe/" element={<Navigate to="/" />} />
          <Route path="/recipe/:slug" element={<RecipePage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
