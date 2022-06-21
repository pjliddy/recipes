import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Loading from '../components/Loading';
import RecipeGrid from '../components/RecipeList/RecipeGrid';

import { Recipe } from '../schema';
import { getHomeRecipes } from '../lib/content';

const HomePage = () => {
  const [recipes, setRecipes] = useState<Array<Recipe> | undefined>();

  useEffect(() => {
    getHomeRecipes().then((list) => setRecipes(list));
  }, []);

  if (!recipes) return <Loading />;

  return (
    <Container className="main" component="main">
      <Typography variant="h1">All My Recipes</Typography>
      <Typography variant="subtitle1" component="h2" gutterBottom>
        {recipes.length} Total
      </Typography>

      <RecipeGrid recipes={recipes} />
      {/* <pre>{JSON.stringify(recipes, null, 2)}</pre> */}
    </Container>
  );
};

export default HomePage;
