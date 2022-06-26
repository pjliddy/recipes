import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Loading from 'components/Loading';
import RecipeGrid from 'components/RecipeList/RecipeGrid';

import { getContent } from 'lib/content';
import { listpageQuery } from 'lib/queries';
import { Recipe } from 'schema';

const styles = {
  title: {
    textTransform: 'capitalize',
  },
};

const ListPage = () => {
  const { tag } = useParams() ?? {};

  if (!tag) return null;

  const [recipes, setRecipes] = useState<Recipe[]>();

  useEffect(() => {
    const variables = { tag };
    getContent({ query: listpageQuery, variables }).then(
      ({ tagCollection }) => {
        const recipeList =
          tagCollection?.items?.[0]?.linkedFrom?.recipeCollection?.items;

        const sorted = [...(recipeList as Recipe[])].sort((a, b) =>
          (a?.title as string) > (b?.title as string) ? 1 : -1
        );

        setRecipes(sorted);
      }
    );
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
