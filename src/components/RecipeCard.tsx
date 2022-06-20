import { Link } from 'react-router-dom';

import useMediaQuery from '@mui/material/useMediaQuery';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import TagButtons from './TagButtons';

import { Recipe, Tag } from '../schema';

import theme from '../theme';

const styles = {
  abstract: {
    mb: '2rem',
  },
  tags: {
    flexWrap: 'wrap',
    '& .MuiButtonBase-root': { ml: 0, mb: '.5rem', mr: '.5rem' },
  },
};

const imgSizes = {
  height: {
    xs: 258,
    sm: 426,
    md: 312,
    lg: 279,
  },
  width: {
    xs: 344,
    sm: 568,
    md: 416,
    lg: 372,
  },
};

type RecipeCardProps = {
  recipe: Recipe;
};

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  if (!recipe) return null;

  const { title, abstract, image, tagsCollection, slug } = recipe ?? {};
  const { items } = tagsCollection ?? {};
  const tags = items as Array<Tag>;
  const { title: category } = tags[0];
  const { url, description: imgAlt } = image ?? {};
  const src = url as string;
  const alt = imgAlt as string;

  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));
  const size = isLg ? 'lg' : isMd ? 'md' : isSm ? 'sm' : 'xs';

  return (
    <Card variant="outlined">
      <CardActionArea component={Link} to={`/recipe/${slug}`}>
        <CardHeader title={title} subheader={category} />
        {image && (
          <CardMedia
            component="img"
            image={`${src}?w=${imgSizes.width[size]}&h=${imgSizes.height[size]}`}
            width="372"
            height="279"
            alt={alt}
          />
        )}

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
