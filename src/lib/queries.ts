import { gql } from '@apollo/client';

const tags = `
  tagsCollection(limit: 10) {
    items {
      ... on Tag {
      title
      slug
      }
    }
  }
`;

const instructions = `
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
`;

const ingredients = `
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
`;

const image = `
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
`;

const recipe = `
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
  ${image}
  ${ingredients}
  equipment
  ${instructions}  
  notes
  ${tags}
`;

export const homeQuery = () => {
  return `
    {
      recipeCollection {
        items {
          ${recipe}
        }
      }
    }
  `;
};

type ListQueryProps = {
  tag: string;
};

export const listQuery = ({ tag }: ListQueryProps) => {
  return `
    {
      tagCollection(where: { slug: "${tag}" }, limit: 1) {
        items {
          linkedFrom {
            recipeCollection(limit: 12) {
              total
              items {
                ${recipe}
              }
            }
          }
        }
      }
    }
  `;
};

type RecipeQueryProps = {
  slug: string;
};

export const recipeQuery = ({ slug }: RecipeQueryProps) => {
  return `
    {
      recipeCollection(where: {slug: "${slug}"}, limit: 1) {
        items {
          ${recipe}
        }
      }
    }
  `;
};

/*
  Default fields for:
    * Tag
    * Taxonomy
*/

const TAG_DEFAULT = gql`
  fragment TagDefault on Tag {
    __typename
    sys {
      id
    }
    title
    slug
  }
`;

const TAXONOMY_DEFAULT = gql`
  fragment TaxonomyDefault on Taxonomy {
    __typename
    sys {
      id
    }
    title
    slug
  }
`;

/*
  Fields for Tag with linkedFrom Recipes
*/

const TAG_WITH_LINKS = gql`
  ${TAG_DEFAULT}

  fragment TagWithLinks on Tag {
    ... on Tag {
      ...TagDefault
      linkedFrom {
        recipeCollection(limit: 1) {
          total
        }
      }
    }
  }
`;

/*
  Fragment with Fields for Taxonomy with no children
*/

const TAXONOMY_ROOT = gql`
  ${TAG_DEFAULT}
  ${TAXONOMY_DEFAULT}

  fragment TaxonomyRoot on Taxonomy {
    ... on Taxonomy {
      ...TaxonomyDefault
      tag {
        ...TagDefault
      }
    }
  }
`;

/*
  Fragment with Fields for Taxonomy with children
*/

const TAXONOMY_WITH_CHILDREN = gql`
  ${TAG_WITH_LINKS}
  ${TAXONOMY_DEFAULT}
  ${TAXONOMY_ROOT}

  fragment TaxonomyWithChildren on Taxonomy {
    ... on Taxonomy {
      ...TaxonomyDefault
      tag {
        ...TagWithLinks
      }
      childrenCollection {
        total
        items {
          ...TagWithLinks
          ...TaxonomyRoot
        }
      }
    }
  }
`;

/*
  Query for Taxonomy with Category & Subcategory levels
*/

export const taxonomyQuery = gql`
  ${TAG_DEFAULT}
  ${TAG_WITH_LINKS}
  ${TAXONOMY_DEFAULT}
  ${TAXONOMY_WITH_CHILDREN}

  query ($slug: String!) {
    taxonomyCollection(where: { slug: $slug }, limit: 1) {
      items {
        ...TaxonomyDefault
        tag {
          ...TagDefault
        }
        childrenCollection(limit: 24) {
          total
          items {
            ...TagWithLinks
            ...TaxonomyWithChildren
          }
        }
      }
    }
  }
`;
