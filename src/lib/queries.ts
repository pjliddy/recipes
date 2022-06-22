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

const taxonomyGrandChildren = `
  childrenCollection(limit: 12) {
    items {
      ... on Tag {
        linkedFrom {
          recipeCollection(limit: 12) {
            total
            items {
              title
              slug
            }
          }
        }
        sys {
          id
        }
        title
        slug
      }
      ... on Taxonomy {
        sys {
          id
        }
        title
        slug
      }
    }
  }
`;

const taxonomyChildren = `
  childrenCollection(limit: 12) {
    items {
      ... on Tag {
        linkedFrom {
          recipeCollection(limit: 12) {
            total
            items {
              title
              slug
            }
          }
        }
        sys {
          id
        }
        title
        slug
      }
      ... on Taxonomy {
        sys {
          id
        }
        title
        slug
        ${taxonomyGrandChildren}
      }
    }
  }
`;

type TaxonomyQueryProps = {
  taxonomy: string;
};

export const taxonomyQuery = ({ taxonomy }: TaxonomyQueryProps) => {
  return `
    {
      taxonomyCollection(where: { title: "${taxonomy}" }, limit: 1) {
        items {
          sys {
            id
          }
          title
          slug
          ${taxonomyChildren}
        }
      }    
    }
  `;
};
