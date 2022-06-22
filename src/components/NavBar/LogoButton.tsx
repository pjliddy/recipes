import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';

const styles = {
  logo: {
    color: '#fff',
    display: 'flex',
    marginRight: 'auto',
    textTransform: 'capitalize',
  },
};

const LogoButton = () => {
  return (
    <Button
      color="primary"
      component={Link}
      size="large"
      startIcon={<CollectionsBookmarkIcon />}
      sx={styles.logo}
      to="/"
    >
      Recipes
    </Button>
  );
};

export default LogoButton;
