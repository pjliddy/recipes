import { lazy } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

const HomePage = lazy(
  () => import(/* webpackChunkName: 'homepage' */ 'pages/HomePage')
);

const ListPage = lazy(
  () => import(/* webpackChunkName: 'listpage' */ 'pages/ListPage')
);

const RecipePage = lazy(
  () => import(/* webpackChunkName: 'recipepage' */ 'pages/RecipePage')
);
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="category/:tag" element={<ListPage />} />
      <Route path="tag/:tag" element={<ListPage />} />
      <Route path="/recipe/" element={<Navigate to="/" />} />
      <Route path="/recipe/:slug" element={<RecipePage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
