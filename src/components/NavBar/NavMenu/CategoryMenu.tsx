import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';

import CategoryListItemButton from 'components/NavBar/NavMenu/CategoryListItemButton';
import SubcategoryMenu from 'components/NavBar/NavMenu/SubcategoryMenu';

import {
  Maybe,
  Tag,
  TagLinkingCollections,
  TaxonomyChildrenItem,
} from 'schema';

const styles = {
  category: {
    pl: 0,
  },
};

type CategoryMenuProps = {
  category: Maybe<TaxonomyChildrenItem>;
  onClick: VoidFunction;
};

const CategoryMenu = ({ category, onClick }: CategoryMenuProps) => {
  const { slug, title } = category ?? {};

  const categoryTag =
    category && 'tag' in category ? category.tag : (category as Tag);

  const categoryChildrenCollection =
    category && 'childrenCollection' in category
      ? category.childrenCollection
      : undefined;

  const { linkedFrom: tagLinks } = categoryTag ?? {};
  const { linkedFrom } = category ?? {};
  const categoryLinks = linkedFrom as Maybe<TagLinkingCollections>;

  const recipeCollection =
    tagLinks?.recipeCollection || categoryLinks?.recipeCollection;

  const numRecipes = recipeCollection?.total;
  return (
    <Box>
      {categoryChildrenCollection ? (
        <SubcategoryMenu
          category={category}
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
