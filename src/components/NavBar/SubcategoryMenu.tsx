import { useState } from 'react';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import CategoryListItemButton from './CategoryListItemButton';

import { SxProps, Theme } from '@mui/material';

import { Maybe, Tag, Taxonomy, TaxonomyChildrenItem } from '../../schema';

type SubcategoryMenuProps = {
  taxonomy: Maybe<Taxonomy>;
  itemStyle: SxProps<Theme> | undefined;
  onClick: VoidFunction;
};

const SubcategoryMenu = ({
  taxonomy,
  itemStyle,
  onClick,
}: SubcategoryMenuProps) => {
  const [open, setOpen] = useState(false);

  const { childrenCollection, slug, title, tag } = taxonomy ?? {};
  const { linkedFrom } = tag ?? {};
  const { recipeCollection } = linkedFrom ?? {};
  const { total } = recipeCollection ?? {};

  const toggleDropdown = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <ListItem
        sx={itemStyle}
        secondaryAction={
          <IconButton edge="end" aria-label="expand" onClick={toggleDropdown}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        }
      >
        <CategoryListItemButton
          slug={slug}
          title={title}
          onClick={onClick}
          total={total}
        />
      </ListItem>
      <Collapse in={open} timeout="auto">
        <List component="div" disablePadding>
          {childrenCollection?.items.map(
            (child: Maybe<TaxonomyChildrenItem>) => {
              const { slug, title, sys } = child ?? {};
              const { id } = sys ?? {};
              const categoryTag = child as Tag;
              const { linkedFrom } = categoryTag ?? {};
              const { recipeCollection } = linkedFrom ?? {};
              const { total } = recipeCollection ?? {};

              return total ? (
                <ListItem key={id}>
                  <CategoryListItemButton
                    slug={slug}
                    title={title}
                    onClick={onClick}
                    total={total}
                  />
                </ListItem>
              ) : null;
            }
          )}
        </List>
      </Collapse>
    </Box>
  );
};

export default SubcategoryMenu;
