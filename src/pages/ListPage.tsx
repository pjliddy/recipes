import { useParams } from 'react-router-dom';
import { useQuery, ApolloError } from '@apollo/client';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Loading from 'components/Loading';
import RecipeGrid from 'components/RecipeList/RecipeGrid';

import { TagCollection, Recipe } from 'schema';

import { listpageQuery } from 'lib/queries';

const styles = {
  title: {
    textTransform: 'capitalize',
  },
};

type QueryProps = {
  loading: boolean;
  error?: ApolloError | undefined;
  data?: {
    tagCollection: TagCollection;
  };
};

const ListPage = () => {
  const { tag } = useParams() ?? {};

  if (!tag) return null;

  const { loading, error, data }: QueryProps = useQuery(listpageQuery, {
    variables: { tag },
  });

  if (loading) return <Loading />;
  if (error) console.error(error);

  const recipeItems =
    data?.tagCollection?.items?.[0]?.linkedFrom?.recipeCollection?.items;

  const recipes = [...(recipeItems as Recipe[])].sort((a, b) =>
    (a?.title as string) > (b?.title as string) ? 1 : -1
  );

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
