import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Loading from 'components/Loading';
import RecipeGrid from 'components/RecipeList/RecipeGrid';

import { getContent } from 'lib/content';
import { homepageQuery } from 'lib/queries';
import { RecipeCollection } from 'schema';

const HomePage = () => {
  const [recipeCollection, setRecipeCollection] = useState<RecipeCollection>();

  useEffect(() => {
    getContent({ query: homepageQuery }).then(({ recipeCollection }) => {
      setRecipeCollection(recipeCollection);
    });
  }, []);

  if (!recipeCollection) return <Loading />;

  const recipeList = recipeCollection?.items;

  return (
    <Container className="main" component="main">
      <Typography variant="h1">All My Recipes</Typography>
      <Typography variant="subtitle1" component="h2" gutterBottom>
        {recipeList && `${recipeList?.length} Total`}
      </Typography>

      <RecipeGrid recipes={recipeList} />
      {/* <pre>{JSON.stringify(recipes, null, 2)}</pre> */}
    </Container>
  );
};

export default HomePage;
