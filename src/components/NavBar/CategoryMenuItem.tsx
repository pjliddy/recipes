import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import SubcategoryMenu from './SubcategoryMenu';

import { Maybe, Taxonomy } from '../../schema';

const styles = {
  category: {
    pl: 0,
  },
};

type CategoryMenuItemProps = {
  node: Maybe<Taxonomy>;
  onClick: VoidFunction;
};

const CategoryMenuItem = ({ node, onClick }: CategoryMenuItemProps) => {
  const { childrenCollection, slug, title } = node ?? {};
  // const { id } = sys ?? {};

  // const { linkedFrom: tagLinks } = tag ?? {};
  // const { linkedFrom } = node ?? {};
  // const nodeLinks = linkedFrom as Maybe<TagLinkingCollections>;

  // const recipeCollection =
  //   tagLinks?.recipeCollection || nodeLinks?.recipeCollection;

  // const numRecipes = recipeCollection?.total;

  // console.log(title, type);
  // console.log({ title }, { id });
  return (
    <Box>
      {childrenCollection ? (
        <SubcategoryMenu
          childrenCollection={childrenCollection}
          onClick={onClick}
          slug={slug}
          title={title}
        />
      ) : (
        <ListItem sx={styles.category}>
          <ListItemButton
            component={Link}
            to={`/category/${slug}`}
            onClick={onClick}
          >
            <ListItemText primary={`${title}`} />
          </ListItemButton>
        </ListItem>
      )}
    </Box>
  );
};

export default CategoryMenuItem;
