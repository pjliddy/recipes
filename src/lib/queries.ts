const tags = `
  items {
    ... on Tag {
    title
    slug
    }
  }
`;

const instructions = `
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
`;

const ingredients = `
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
  ingredientsCollection(limit: 10) {
    ${ingredients}
  }
  equipment
  instructionsCollection(limit: 10) {
    ${instructions}
  }
  notes
  tagsCollection(limit: 10) {
    ${tags}
  }
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
  items {
    ... on Tag {
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
`;

const taxonomyChildren = `
  items {
    ... on Tag {
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
      childrenCollection {
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
          childrenCollection {
            ${taxonomyChildren}
          }
        }
      }
    }
  `;
};
