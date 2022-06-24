import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';

import CategoryListItemButton from './CategoryListItemButton';
import SubcategoryMenu from './SubcategoryMenu';

import { Maybe, Taxonomy } from '../../schema';

const styles = {
  category: {
    pl: 0,
  },
};

type CategoryMenuProps = {
  node: Maybe<Taxonomy>;
  onClick: VoidFunction;
};

const CategoryMenu = ({ node, onClick }: CategoryMenuProps) => {
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
          itemStyle={styles.category}
          onClick={onClick}
          slug={slug}
          title={title}
        />
      ) : (
        <ListItem sx={styles.category}>
          <CategoryListItemButton slug={slug} title={title} onClick={onClick} />
        </ListItem>
      )}
    </Box>
  );
};

export default CategoryMenu;
