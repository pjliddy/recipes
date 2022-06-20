import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import TagButtons from './TagButtons';

import { RecipeTagsCollection, Tag } from '../schema';

type TagsProps = {
  collection?: RecipeTagsCollection;
};

const Tags = ({ collection }: TagsProps) => {
  if (!collection) return null;

  const { items } = collection ?? {};
  const tags = items as Array<Tag>;

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Tags
      </Typography>
      <TagButtons tags={tags} />
    </Box>
  );
};

export default Tags;
