import { deepmerge } from '@mui/utils';
import { createTheme } from '@mui/material/styles';

import baseTheme from 'theme/theme';
import cardTheme from 'theme/card';
import containerTheme from 'theme/container';
import listTheme from 'theme/list';
import typeTheme from 'theme/type';

let build = createTheme(deepmerge(baseTheme, typeTheme));
build = createTheme(deepmerge(build, cardTheme));
build = createTheme(deepmerge(build, containerTheme));
build = createTheme(deepmerge(build, listTheme));

// const theme = responsiveFontSizes(build);

export default build;
