import { useQuery, gql, ApolloError } from '@apollo/client';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Loading from 'components/Loading';
import RecipeGrid from 'components/RecipeList/RecipeGrid';

import { RecipeCollection } from 'schema';

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

const homepageQuery = gql`
  {
    recipeCollection {
      items {
        sys {
          id
        }
        title
        slug
        slug
        description {
          json
        }
        abstract
        image {
          title
          description
          contentType
          fileName
          size
          url
          height
          width
        }
        ingredientsCollection(limit: 10) {
          items {
            ... on IngredientSection {
              sys {
                id
              }
              title
              slug
              label
              ingredientList
            }
          }
        }
        equipment
        instructionsCollection(limit: 10) {
          items {
            ... on InstructionSection {
              sys {
                id
              }
              title
              slug
              label
              instructionList
            }
          }
        }
        notes
        tagsCollection(limit: 10) {
          items {
            ... on Tag {
              title
              slug
            }
          }
        }
      }
    }
  }
`;

export default HomePage;
