import { useQuery, ApolloError } from '@apollo/client';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Loading from 'components/Loading';
import RecipeGrid from 'components/RecipeList/RecipeGrid';

import { RecipeCollection } from 'schema';

import { homepageQuery } from 'lib/queries';

type QueryProps = {
  loading: boolean;
  error?: ApolloError | undefined;
  data?: {
    recipeCollection: RecipeCollection;
  };
};

const HomePage = () => {
  const { loading, error, data }: QueryProps = useQuery(homepageQuery);

  if (loading) return <Loading />;
  if (error) console.error(error);

  const recipeList = data?.recipeCollection?.items;

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
