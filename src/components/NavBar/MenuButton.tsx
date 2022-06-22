import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const styles = {
  menuIcon: { ml: 'auto' },
};

type MenuButtonProps = {
  onClick: VoidFunction;
};

const MenuButton = ({ onClick }: MenuButtonProps) => {
  return (
    <IconButton
      aria-label="open drawer"
      color="inherit"
      edge="start"
      onClick={onClick}
      sx={styles.menuIcon}
    >
      <MenuIcon />
    </IconButton>
  );
};

export default MenuButton;
