import Grid from '@mui/material/Grid';

import Loading from '../Loading';
import RecipeCard from './RecipeCard';

import { Recipe } from '../../schema';

type RecipeGridProps = {
  recipes: Recipe[];
};

const styles = {
  grid: {
    display: 'flex',
  },
};

const RecipeGrid = ({ recipes }: RecipeGridProps) => {
  if (!recipes) return <Loading />;

  return (
    <Grid container spacing={2}>
      {recipes &&
        recipes.map((recipe: Recipe) => (
          <Grid item md={4} sm={6} xs={12} key={recipe.slug} sx={styles.grid}>
            <RecipeCard recipe={recipe} />
          </Grid>
        ))}
    </Grid>
  );
};

export default RecipeGrid;
