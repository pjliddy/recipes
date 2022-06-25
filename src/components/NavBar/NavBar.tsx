import { useState } from 'react';
// import { Navigate } from 'react-router-dom';

// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   useQuery,
//   gql,
// } from '@apollo/client';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import LogoButton from 'components/NavBar/LogoButton';
import MenuButton from 'components/NavBar/MenuButton';
import NavMenu from 'components/NavBar/NavMenu/NavMenu';

import { Maybe, Taxonomy } from 'schema';

type NavBarProps = {
  nav: Maybe<Taxonomy>[] | undefined;
};

const NavBar = ({ nav }: NavBarProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // const query = taxonomyQuery;
  // const { loading, error, data } = useQuery(query);

  // console.log({ data });

  if (!nav) return null;

  // if (loading) return <Loading />;
  // if (error) return <Navigate to="/" />;

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <AppBar component="nav">
      <Toolbar>
        <LogoButton />
        <MenuButton onClick={handleDrawerToggle} />
      </Toolbar>
      <NavMenu nav={nav} onClick={handleDrawerToggle} isOpen={isDrawerOpen} />
    </AppBar>
  );
};

// const taxonomyQuery = gql`
//   {
//     taxonomyCollection(where: { slug: "${taxonomy}" }, limit: 1) {
//       items {
//         __typename
//         sys {
//           id
//         }
//         title
//         slug
//         tag {
//           sys {
//             id
//           }
//           title
//           slug
//         }
//         childrenCollection(limit: 24) {
//           total
//           items {
//             ... on Tag {
//               __typename
//               sys {
//                 id
//               }
//               title
//               slug
//               linkedFrom {
//                 recipeCollection(limit: 1) {
//                   total
//                 }
//               }
//             }
//             ... on Taxonomy {
//               __typename
//               sys {
//                 id
//               }
//               title
//               slug
//               tag {
//                 sys {
//                   id
//                 }
//                 title
//                 slug
//                 linkedFrom {
//                 recipeCollection(limit: 1) {
//                     total
//                   }
//                 }
//               }
//               childrenCollection {
//                 total
//                 items {
//                   ... on Tag {
//                     __typename
//                     sys {
//                       id
//                     }
//                     title
//                     slug
//                     linkedFrom {
//                       recipeCollection(limit: 1) {
//                         total
//                       }
//                     }
//                   }
//                   ... on Taxonomy {
//                     __typename
//                     sys {
//                       id
//                     }
//                     title
//                     slug
//                     tag {
//                       sys {
//                         id
//                       }
//                       title
//                       slug
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;

export default NavBar;
