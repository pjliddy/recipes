import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';

import colors from 'theme/colors';

import LogoIcon from 'assets/LogoIcon';

const styles = {
  logo: {
    color: colors.common.white,
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
      startIcon={<LogoIcon />}
      sx={styles.logo}
      to="/"
    >
      Recipes
    </Button>
  );
};

export default LogoButton;
