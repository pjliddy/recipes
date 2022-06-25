import fontFaceOverrides from 'theme/fontface';

const baseFontSize = 16;
const fontWeightRegular = 400;
const fontWeightBold = 500;
const fontFamily = 'Inter';

const typeTheme = {
  components: {
    MuiCssBaseline: {
      styleOverrides: fontFaceOverrides,
    },

    MuiTypography: {
      defaultProps: {
        variantMapping: {
          subtitle1: 'p',
          subtitle2: 'p',
        },
      },
    },
  },
  typography: {
    fontFamily,
    fontWeightBold,
    fontWeightRegular,
    fontSize: baseFontSize,
    htmlFontSize: 18,
    h1: {
      fontFamily,
      fontWeight: fontWeightBold,
      lineHeight: 1.25,
      fontSize: '2.2rem',
    },
    h2: {
      fontFamily,
      fontWeight: fontWeightBold,
      lineHeight: 1.25,
      fontSize: '1.8rem',
    },
    h3: {
      fontFamily,
      fontWeight: fontWeightBold,
      lineHeight: 1.125,
      fontSize: '1.4rem',
    },
    h4: {
      fontFamily,
      fontWeight: fontWeightBold,
      fontSize: '1.2rem',
      lineHeight: 1.25,
    },
    h5: {
      fontFamily,
      fontWeight: fontWeightBold,
      lineHeight: 1.25,
      fontSize: '1.1rem',
    },
    h6: {
      fontFamily,
      fontSize: '1rem',
      fontWeight: fontWeightBold,
      lineHeight: 1.25,
    },
    button: {
      fontFamily,
      fontSize: '1rem',
      fontWeight: fontWeightBold,
      lineHeight: 1.25,
    },
    //     body1: {
    //       fontSize: `${20 / baseFontSize}rem`,
    //       fontWeight: fontWeightNormal,
    //       letterSpacing: '.15px',
    //       lineHeight: 32 / 20,
    //     },
    //     body2: {
    //       fontSize: `${16 / baseFontSize}rem`,
    //       fontWeight: fontWeightNormal,
    //       letterSpacing: '.15px',
    //       lineHeight: 24 / 16,
    //     },
    //     button: {
    //       fontSize: `${16 / baseFontSize}rem`,
    //       fontWeight: fontWeightBold,
    //       letterSpacing: '.15px',
    //       lineHeight: 20 / 16,
    //       textTransform: 'none',
    //     },
    //     caption: {
    //       fontSize: `${14 / baseFontSize}rem`,
    //       fontWeight: fontWeightNormal,
    //       letterSpacing: '.15px',
    //       lineHeight: 20 / 14,
    //     },
    //     h1: {
    //       fontSize: `${48 / baseFontSize}rem`,
    //       fontWeight: fontWeightBold,
    //       letterSpacing: '-0.4px',
    //       lineHeight: 64 / 48,
    //     },
    //     h2: {
    //       fontSize: `${40 / baseFontSize}rem`,
    //       fontWeight: fontWeightBold,
    //       letterSpacing: 0,
    //       lineHeight: 56 / 40,
    //     },
    //     h3: {
    //       fontWeight: fontWeightBold,
    //       fontSize: `${32 / baseFontSize}rem`,
    //       letterSpacing: 0,
    //       lineHeight: 48 / 32,
    //     },
    //     h4: {
    //       fontWeight: fontWeightBold,
    //       fontSize: `${26 / baseFontSize}rem`,
    //       letterSpacing: '.15px',
    //       lineHeight: 40 / 26,
    //     },
    //     h5: {
    //       fontWeight: fontWeightBold,
    //       fontSize: `${20 / baseFontSize}rem`,
    //       letterSpacing: '.15px',
    //       lineHeight: 32 / 20,
    //     },
    //     h6: {
    //       fontWeight: fontWeightBold,
    //       fontSize: `${16 / baseFontSize}rem`,
    //       letterSpacing: '.15px',
    //       lineHeight: 24 / 16,
    //     },
    //     overline: {
    //       color: colors.textAccent,
    //       fontWeight: fontWeightNormal,
    //       fontSize: `${14 / baseFontSize}rem`,
    //       letterSpacing: '.15px',
    //       lineHeight: 20 / 14,
    //       textTransform: 'none',
    //     },
    //     subtitle1: {
    //       color: colors.textAccent,
    //       fontWeight: fontWeightBold,
    //       fontSize: `${20 / baseFontSize}rem`,
    //       letterSpacing: '.15px',
    //       lineHeight: 32 / 20,
    //       textTransform: 'none',
    //     },
  },
};

export default typeTheme;
