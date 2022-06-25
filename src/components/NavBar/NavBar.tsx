import { useState } from 'react';

import { useQuery, gql, ApolloError } from '@apollo/client';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import Loading from 'components/Loading';
import LogoButton from 'components/NavBar/LogoButton';
import MenuButton from 'components/NavBar/MenuButton';
import NavMenu from 'components/NavBar/NavMenu/NavMenu';

import { TaxonomyCollection } from 'schema';

type QueryProps = {
  loading: boolean;
  error?: ApolloError | undefined;
  data?: {
    taxonomyCollection: TaxonomyCollection;
  };
};

const NavBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { loading, error, data }: QueryProps = useQuery(taxonomyQuery);

  if (loading) return <Loading />;
  if (error) console.error(error);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  console.log({ data });

  const navData = data?.taxonomyCollection?.items?.[0];

  return (
    <AppBar component="nav">
      <Toolbar>
        <LogoButton />
        <MenuButton onClick={handleDrawerToggle} />
      </Toolbar>
      <NavMenu
        nav={navData}
        onClick={handleDrawerToggle}
        isOpen={isDrawerOpen}
      />
    </AppBar>
  );
};

const taxonomyQuery = gql`
  {
    taxonomyCollection(where: { slug: "categories" }, limit: 1) {
      items {
        __typename
        sys {
          id
        }
        title
        slug
        tag {
          sys {
            id
          }
          title
          slug
        }
        childrenCollection(limit: 24) {
          total
          items {
            ... on Tag {
              __typename
              sys {
                id
              }
              title
              slug
              linkedFrom {
                recipeCollection(limit: 1) {
                  total
                }
              }
            }
            ... on Taxonomy {
              __typename
              sys {
                id
              }
              title
              slug
              tag {
                sys {
                  id
                }
                title
                slug
                linkedFrom {
                  recipeCollection(limit: 1) {
                    total
                  }
                }
              }
              childrenCollection {
                total
                items {
                  ... on Tag {
                    __typename
                    sys {
                      id
                    }
                    title
                    slug
                    linkedFrom {
                      recipeCollection(limit: 1) {
                        total
                      }
                    }
                  }
                  ... on Taxonomy {
                    __typename
                    sys {
                      id
                    }
                    title
                    slug
                    tag {
                      sys {
                        id
                      }
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
  }
`;

export default NavBar;
