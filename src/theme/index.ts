import { deepmerge } from '@mui/utils';
import { createTheme } from '@mui/material/styles';

import baseTheme from './theme';
import cardTheme from './card';
import containerTheme from './container';
import listTheme from './list';
import typeTheme from './type';

let build = createTheme(deepmerge(baseTheme, typeTheme));
build = createTheme(deepmerge(build, cardTheme));
build = createTheme(deepmerge(build, containerTheme));
build = createTheme(deepmerge(build, listTheme));

// const theme = responsiveFontSizes(build);

export default build;
