import { useState } from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import {
  Maybe,
  TaxonomyChildrenCollection,
  TaxonomyChildrenItem,
} from '../../schema';

const styles = {
  category: {
    pl: 0,
  },
};

type SubcategoryMenuProps = {
  childrenCollection: TaxonomyChildrenCollection;
  onClick: VoidFunction;
  slug: Maybe<string> | undefined;
  title: Maybe<string> | undefined;
};

const SubcategoryMenu = ({
  childrenCollection,
  onClick,
  slug,
  title,
}: SubcategoryMenuProps) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <ListItem
        sx={styles.category}
        secondaryAction={
          <IconButton edge="end" aria-label="expand" onClick={handleClick}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        }
      >
        <ListItemButton
          component={Link}
          to={`/category/${slug}`}
          onClick={onClick}
        >
          <ListItemText primary={`${title}`} />
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto">
        <List component="div" disablePadding>
          {childrenCollection?.items.map(
            (child: Maybe<TaxonomyChildrenItem>) => {
              return (
                <ListItem key={child?.slug}>
                  <ListItemButton
                    component={Link}
                    to={`/category/${child?.slug}`}
                    onClick={onClick}
                  >
                    <ListItemText primary={`${child?.title}`} />
                  </ListItemButton>
                </ListItem>
              );
            }
          )}
        </List>
      </Collapse>
    </Box>
  );
};

export default SubcategoryMenu;
