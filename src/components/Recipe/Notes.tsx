import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Maybe, Scalars } from '../../schema';

type NotesProps = {
  notes?: Maybe<Array<Maybe<Scalars['String']>>>;
};

const Notes = ({ notes }: NotesProps) => {
  if (!notes) return null;

  // TODO: use MUI List to format notes
  return (
    <Box>
      <Typography variant="h2">Notes</Typography>
      {notes && (
        <ul>
          {notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      )}
    </Box>
  );
};

export default Notes;
