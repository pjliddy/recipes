import { DocumentNode } from 'graphql/language/ast';
import { print } from 'graphql';
const { REACT_APP_CDA_TOKEN, REACT_APP_SPACE_ID } = process.env;
const gqlEndpoint = `https://graphql.contentful.com/content/v1/spaces/${REACT_APP_SPACE_ID}/`;

type VariablesType = {
  slug?: string;
  tag?: string;
};

type GetContentProps = {
  query: DocumentNode;
  variables?: VariablesType;
};

// NOTE: query is Document node, needs to be run as gql function & pass as string
export const getContent = async ({ query, variables }: GetContentProps) => {
  try {
    const response = await window.fetch(gqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${REACT_APP_CDA_TOKEN}`,
      },
      // send the GraphQL query
      body: JSON.stringify({
        query: print(query),
        variables,
      }),
    });

    const { data } = await response.json();

    return data;
  } catch (e) {
    console.error(e);
  }
};
