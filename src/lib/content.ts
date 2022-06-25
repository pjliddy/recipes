const { REACT_APP_CDA_TOKEN, REACT_APP_SPACE_ID } = process.env;
const gqlEndpoint = `https://graphql.contentful.com/content/v1/spaces/${REACT_APP_SPACE_ID}/`;

import { homeQuery, listQuery, recipeQuery } from 'lib/queries';

type GetContentProps = {
  query: string;
};

const getContent = async ({ query }: GetContentProps) => {
  try {
    const response = await window.fetch(gqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${REACT_APP_CDA_TOKEN}`,
      },
      // send the GraphQL query
      body: JSON.stringify({ query }),
    });

    const { data } = await response.json();

    return data;
  } catch (e) {
    console.error(e);
  }
};

type GetRecipeProps = {
  slug: string;
};

const getRecipe = async ({ slug }: GetRecipeProps) => {
  const query = recipeQuery({ slug });
  const { recipeCollection } = await getContent({ query });
  return recipeCollection.items[0];
};

type GetRecipesProps = {
  tag: string;
};

const getRecipes = async ({ tag }: GetRecipesProps) => {
  const query = listQuery({ tag });
  const { tagCollection } = await getContent({ query });
  return tagCollection.items[0].linkedFrom.recipeCollection.items;
};

const getHomeRecipes = async () => {
  const query = homeQuery();
  const { recipeCollection } = await getContent({ query });
  return recipeCollection.items;
};

export { getHomeRecipes, getRecipe, getRecipes };
