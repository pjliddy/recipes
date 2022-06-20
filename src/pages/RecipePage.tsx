import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useMediaQuery from '@mui/material/useMediaQuery';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// TODO: componentize
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import Equipment from '../components/Equipment';
import Ingredients from '../components/Ingredients';
import Instructions from '../components/Instructions';
import Notes from '../components/Notes';
import Tags from '../components/Tags';

import Loading from '../components/Loading';

import { Recipe } from '../schema';
import { getRecipe } from '../lib/content';

import theme from '../theme';

const imgSizes = {
  height: {
    xs: 426,
    sm: 636,
    md: 426,
    lg: 426,
  },
  width: {
    xs: 568,
    sm: 848,
    md: 568,
    lg: 568,
  },
};

const RecipePage = () => {
  const [recipe, setRecipe] = useState<Recipe | undefined>();
  const { slug } = useParams() ?? {};

  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));
  const size = isMd ? 'md' : isSm ? 'sm' : 'xs';

  if (!slug) return null;

  useEffect(() => {
    getRecipe({ slug }).then((recipe) => setRecipe(recipe));
  }, [slug]);

  if (!recipe) return <Loading />;

  const {
    title,
    description,
    equipment,
    image,
    ingredientsCollection,
    instructionsCollection,
    notes,
    tagsCollection,
  } = recipe ?? {};

  const { json: descriptionDoc } = description ?? {};
  const { url, description: imgAlt } = image ?? {};
  const src = url as string;
  const alt = imgAlt as string;

  /*
    contentType: "image/jpeg"
    description: "Sole Meunière on a bed of chopped green lettuce and roma tomatoes with a white balsamic-lemon vinaigrette."
    fileName: "sole-meuniere.jpg"
    height: 3024
    size: 2758954
    title: "Sole Meunière"
    url: "https://images.ctfassets.net/fo9qwg6zarbt/7JzbZn07fY62akLYWhNqDg/df3f00e87d2ebab4f807caac8e2befcb/sole-meuniere.jpg"
    width: 4032
  */

  return (
    <Container className="main" component="main">
      <Grid container direction="row" spacing={2}>
        <Grid item md>
          {/* <Stack direction="column"> */}
          <Typography variant="h1" gutterBottom>
            {title}
          </Typography>
          {descriptionDoc && (
            <Box>{documentToReactComponents(descriptionDoc)}</Box>
          )}
          {/* </Stack> */}
        </Grid>
        {image && (
          <Grid item md>
            <img
              alt={alt}
              src={`${src}?w=${imgSizes.width[size]}&h=${imgSizes.height[size]}`}
              // src={`${src}`}
              style={{ maxWidth: '100%', height: 'auto' }}
              height={imgSizes.height[size]}
              width={imgSizes.width[size]}
            />
          </Grid>
        )}
      </Grid>
      <Stack direction="column" spacing={3}>
        {ingredientsCollection && (
          <Ingredients collection={ingredientsCollection} />
        )}

        {equipment && <Equipment equipment={equipment} />}

        {instructionsCollection && (
          <Instructions collection={instructionsCollection} />
        )}

        {notes && <Notes notes={notes} />}

        {tagsCollection && <Tags collection={tagsCollection} />}

        {/* <pre>{JSON.stringify(tags, null, 2)}</pre> */}
      </Stack>
    </Container>
  );
};

export default RecipePage;
