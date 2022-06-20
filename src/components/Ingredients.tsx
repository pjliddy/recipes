import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

import { RecipeIngredientsCollection, IngredientSection } from '../schema';

type IngredientsProps = {
  collection?: RecipeIngredientsCollection;
};

const Ingredients = ({ collection }: IngredientsProps) => {
  if (!collection) return null;

  const { items } = collection ?? {};
  const groups = items as Array<IngredientSection>;

  return (
    <Stack direction="column" spacing={1}>
      <Typography variant="h2" gutterBottom>
        Ingredients
      </Typography>
      {groups &&
        groups.map((group: IngredientSection) => {
          const { label, ingredientList } = group ?? {};
          const ingredients = ingredientList as Array<string>;

          return (
            <Stack key={label} direction="column" spacing={0}>
              {label !== 'Ingredients' && (
                <Typography variant="h3">{label}</Typography>
              )}
              <List className="recipeList">
                {ingredients.map((ingredient: string) => (
                  <ListItem key={ingredient} disableGutters>
                    <ListItemIcon>
                      <RestaurantMenuIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary={ingredient} />
                  </ListItem>
                ))}
              </List>
            </Stack>
          );
        })}
    </Stack>
  );
};

export default Ingredients;
