import { Link } from 'react-router-dom';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { Maybe } from '../../schema';

type CategoryListItemButtonProps = {
  onClick: VoidFunction;
  slug: Maybe<string> | undefined;
  title: Maybe<string> | undefined;
  total?: number;
};

const CategoryListItemButton = ({
  onClick,
  slug,
  title,
  total,
}: CategoryListItemButtonProps) => {
  return (
    <ListItemButton component={Link} onClick={onClick} to={`/category/${slug}`}>
      <ListItemText primary={`${title} (${total})`} />
    </ListItemButton>
  );
};

export default CategoryListItemButton;
