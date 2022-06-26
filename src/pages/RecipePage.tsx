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

import Equipment from 'components/Recipe/Equipment';
import Ingredients from 'components/Recipe/Ingredients';
import Instructions from 'components/Recipe/Instructions';
import Loading from 'components/Loading';
import Notes from 'components/Recipe/Notes';
import Tags from 'components/Recipe/Tags';

import { getContent } from 'lib/content';
import { recipeQuery } from 'lib/queries';
import { Recipe } from 'schema';

import theme from 'theme';

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
  const { slug } = useParams() ?? {};

  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));
  const size = isMd ? 'md' : isSm ? 'sm' : 'xs';

  if (!slug) return null;

  const [recipe, setRecipe] = useState<Recipe>();

  useEffect(() => {
    const variables = { slug };
    getContent({ query: recipeQuery, variables }).then((res) =>
      setRecipe(res?.recipeCollection?.items?.[0])
    );
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
          <Typography variant="h1" gutterBottom>
            {title}
          </Typography>
          {descriptionDoc && (
            <Box>{documentToReactComponents(descriptionDoc)}</Box>
          )}
        </Grid>
        {image && (
          <Grid item md>
            <img
              alt={alt}
              src={`${src}?w=${imgSizes.width[size]}&h=${imgSizes.height[size]}&fm=webp`}
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
