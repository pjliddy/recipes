import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
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

const RecipePage = () => {
  const [recipe, setRecipe] = useState<Recipe | undefined>();
  const { slug } = useParams() ?? {};

  if (!slug) return null;

  useEffect(() => {
    getRecipe({ slug }).then((recipe) => setRecipe(recipe));
  }, [slug]);

  if (!recipe) return <Loading />;

  const {
    title,
    description,
    equipment,
    ingredientsCollection,
    instructionsCollection,
    notes,
    tagsCollection,
  } = recipe ?? {};

  const { json: descriptionDoc } = description ?? {};

  return (
    <Container className="main" component="main">
      <Stack direction="column" spacing={3}>
        <Stack direction="column">
          <Typography variant="h1" gutterBottom>
            {title}
          </Typography>
          {descriptionDoc && (
            <Box>{documentToReactComponents(descriptionDoc)}</Box>
          )}
        </Stack>

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
