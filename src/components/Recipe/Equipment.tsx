import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import KitchenTwoToneIcon from '@mui/icons-material/KitchenTwoTone';

import { Maybe, Scalars } from 'schema';

type EquipmentProps = {
  equipment?: Maybe<Array<Maybe<Scalars['String']>>>;
};

const Equipment = ({ equipment }: EquipmentProps) => {
  if (!equipment) return null;

  return (
    <Stack direction="column">
      <Typography variant="h2">Equipment</Typography>
      <List className="recipeList">
        {equipment &&
          equipment.map((item) => (
            <ListItem key={item} disableGutters>
              <ListItemIcon>
                <KitchenTwoToneIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
      </List>
    </Stack>
  );
};

export default Equipment;
