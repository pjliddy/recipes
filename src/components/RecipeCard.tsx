import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import TagButtons from './TagButtons';

import { Recipe, Tag } from '../schema';

const styles = {
  abstract: {
    mb: '2rem',
  },
  tags: {
    flexWrap: 'wrap',
    '& .MuiButtonBase-root': { ml: 0, mb: '.5rem', mr: '.5rem' },
  },
};

type RecipeCardProps = {
  recipe: Recipe;
};

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  if (!recipe) return null;

  const { title, abstract, tagsCollection, slug } = recipe ?? {};
  const { items } = tagsCollection ?? {};
  const tags = items as Array<Tag>;
  const { title: category } = tags[0];

  return (
    <Card variant="outlined">
      <CardActionArea component={Link} to={`/recipe/${slug}`}>
        <CardHeader title={title} subheader={category} />

        <CardContent>
          {abstract && (
            <Typography variant="body2" sx={styles.abstract}>
              {abstract}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <TagButtons tags={tags} />
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
