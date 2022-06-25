import { gql } from '@apollo/client';

// export const homeQuery = () => {
//   return `
//     {
//       recipeCollection {
//         items {
//           ${recipe}
//         }
//       }
//     }
//   `;
// };

// type ListQueryProps = {
//   tag: string;
// };

// export const listQuery = ({ tag }: ListQueryProps) => {
//   return `
//     {
//       tagCollection(where: { slug: "${tag}" }, limit: 1) {
//         items {
//           linkedFrom {
//             recipeCollection(limit: 12) {
//               total
//               items {
//                 ${recipe}
//               }
//             }
//           }
//         }
//       }
//     }
//   `;
// };

/*
  Fragments wiht default fields for:
    * Tag
    * Taxonomy
*/

const TAG_DEFAULT = gql`
  fragment TagDefault on Tag {
    sys {
      id
    }
    __typename
    title
    slug
  }
`;

const TAXONOMY_DEFAULT = gql`
  fragment TaxonomyDefault on Taxonomy {
    sys {
      id
    }
    __typename
    title
    slug
  }
`;

/*
  Fragment with fields for Tag with linkedFrom Recipes
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

/*
  Fragments with default fields for Recipe-specific sections:
    * Ingredients
    * Instructions
    * Image
    * Recipe
*/

const INGREDIENTS_DEFAULT = gql`
  fragment IngredientsDefault on IngredientSection {
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
`;

const INSTRUCTIONS_DEFAULT = gql`
  fragment InstructionsDefault on InstructionSection {
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
`;

const IMAGE_DEFAULT = gql`
  fragment ImageDefault on Asset {
    sys {
      id
    }
    __typename
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

const RECIPE_DEFAULT = gql`
  ${IMAGE_DEFAULT}

  fragment RecipeDefault on Recipe {
    sys {
      id
    }
    __typename
    title
    slug
    description {
      json
    }
    abstract
    image {
      ...ImageDefault
    }
  }
`;

/*
  Query for Recipe based on slug
*/

export const recipeQuery = gql`
  ${INGREDIENTS_DEFAULT}
  ${INSTRUCTIONS_DEFAULT}
  ${RECIPE_DEFAULT}
  ${TAG_DEFAULT}

  query ($slug: String!) {
    recipeCollection(where: { slug: $slug }, limit: 1) {
      items {
        ...RecipeDefault
        ingredientsCollection(limit: 10) {
          items {
            ...IngredientsDefault
          }
        }
        equipment
        instructionsCollection(limit: 10) {
          items {
            ...InstructionsDefault
          }
        }
        notes
        tagsCollection(limit: 10) {
          items {
            ...TagDefault
          }
        }
      }
    }
  }
`;
