import { deepmerge } from '@mui/utils';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

import baseTheme from './theme';
import cardTheme from './card';
import containerTheme from './container';
import listTheme from './list';

let build = createTheme(deepmerge(baseTheme, cardTheme));
build = createTheme(deepmerge(build, containerTheme));
build = createTheme(deepmerge(build, listTheme));

const theme = responsiveFontSizes(build);

export default theme;
