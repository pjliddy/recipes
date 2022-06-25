import { useParams } from 'react-router-dom';
import { useQuery, gql, ApolloError } from '@apollo/client';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Loading from 'components/Loading';
import RecipeGrid from 'components/RecipeList/RecipeGrid';

import { TagCollection } from 'schema';

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

  const recipes =
    data?.tagCollection?.items?.[0]?.linkedFrom?.recipeCollection?.items;

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

const listpageQuery = gql`
  query ($tag: String!) {
    tagCollection(where: { slug: $tag }, limit: 1) {
      items {
        linkedFrom {
          recipeCollection(limit: 12) {
            total
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
      }
    }
  }
`;

export default ListPage;
