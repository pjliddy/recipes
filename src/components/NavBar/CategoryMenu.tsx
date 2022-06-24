import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';

import CategoryListItemButton from './CategoryListItemButton';
import SubcategoryMenu from './SubcategoryMenu';

import { Maybe, TagLinkingCollections, Taxonomy } from '../../schema';

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
  const { childrenCollection, slug, tag, title } = node ?? {};

  const { linkedFrom: tagLinks } = tag ?? {};
  const { linkedFrom } = node ?? {};
  const nodeLinks = linkedFrom as Maybe<TagLinkingCollections>;

  const recipeCollection =
    tagLinks?.recipeCollection || nodeLinks?.recipeCollection;

  const numRecipes = recipeCollection?.total;
  return (
    <Box>
      {childrenCollection ? (
        <SubcategoryMenu
          taxonomy={node}
          itemStyle={styles.category}
          onClick={onClick}
        />
      ) : (
        <ListItem sx={styles.category}>
          <CategoryListItemButton
            slug={slug}
            title={title}
            onClick={onClick}
            total={numRecipes}
          />
        </ListItem>
      )}
    </Box>
  );
};

export default CategoryMenu;
