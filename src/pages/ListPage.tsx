import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Loading from 'components/Loading';
import RecipeGrid from 'components/RecipeList/RecipeGrid';

import { Recipe } from 'schema';
import { getRecipes } from 'lib/content';

const styles = {
  title: {
    textTransform: 'capitalize',
  },
};

const ListPage = () => {
  const [recipes, setRecipes] = useState<Array<Recipe>>();
  const { tag } = useParams() ?? {};

  if (!tag) return null;

  useEffect(() => {
    getRecipes({ tag }).then((list) => setRecipes(list));
  }, [tag]);

  if (!recipes) return <Loading />;

  return (
    <Container className="main" component="main">
      <Typography variant="h1" gutterBottom sx={styles.title}>
        {tag}
      </Typography>

      <RecipeGrid recipes={recipes} />
      {/* <pre>{JSON.stringify(recipes, null, 2)}</pre> */}
    </Container>
  );
};

export default ListPage;
