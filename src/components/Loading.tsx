import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const styles = {
  container: {
    height: '100vh',
  },
  loader: {
    alignItems: 'center',
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
  },
};
const Loading = () => (
  <Container sx={styles.container}>
    <Box sx={styles.loader}>
      <CircularProgress color="primary" />
    </Box>
  </Container>
);

export default Loading;
