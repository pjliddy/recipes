import { Link } from 'react-router-dom';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { Maybe } from '../../schema';

type CategoryListItemButtonProps = {
  onClick: VoidFunction;
  slug: Maybe<string> | undefined;
  title: Maybe<string> | undefined;
};

const CategoryListItemButton = ({
  onClick,
  slug,
  title,
}: CategoryListItemButtonProps) => {
  return (
    <ListItemButton component={Link} to={`/category/${slug}`} onClick={onClick}>
      <ListItemText primary={`${title}`} />
    </ListItemButton>
  );
};

export default CategoryListItemButton;
