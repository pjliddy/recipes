import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';

import { Tag } from 'schema';

const style = {
  button: {
    borderRadius: '2rem',
    textTransform: 'capitalize',
    fontWeight: 300,
  },
  tags: {
    flexWrap: 'wrap',
    '& .MuiButtonBase-root': { ml: 0, mb: '.5rem', mr: '.5rem' },
  },
};

type TagButtonsProps = {
  tags: Array<Tag>;
};

const TagButtons = ({ tags }: TagButtonsProps) => {
  return (
    <Stack direction="row" sx={style.tags}>
      {tags &&
        tags.map((tag: Tag) => {
          const { slug, title } = tag ?? {};
          return (
            <Button
              color="primary"
              component={Link}
              key={slug}
              size="small"
              sx={style.button}
              to={`/tag/${slug}`}
              variant="outlined"
            >
              {title}
            </Button>
          );
        })}
    </Stack>
  );
};

export default TagButtons;
