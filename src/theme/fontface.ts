// import InterBlackTtf from '../fonts/Inter-Black.ttf';
// import InterBoldTtf from '../fonts/Inter-Bold.ttf';
// import InterExtraBoldTtf from '../fonts/Inter-ExtraBold.ttf';
// import InterExtraLightTtf from '../fonts/Inter-ExtraLight.ttf';
// import InterLightTtf from '../fonts/Inter-Light.ttf';
import InterMediumTtf from '../fonts/Inter-Medium.ttf';
import InterRegularTtf from '../fonts/Inter-Regular.ttf';
// import InterSemiBoldTtf from '../fonts/Inter-SemiBold.ttf';
// import InterThinTtf from '../fonts/Inter-Thin.ttf';

const Inter = `
  font-display: swap;
  font-family: 'Inter';
  font-weight: 400;
  src: url(${InterRegularTtf}) format("truetype-variations")
`;

const InterItalic = `
  font-display: swap;
  font-family: 'Inter';
  font-style: italic;
  font-variation-settings: 'ital' 1;
  font-synthesis: none;   
  font-weight: 400;
  src: url(${InterRegularTtf}) format("truetype-variations")
`;

const InterBold = `
  font-display: swap;
  font-family: 'Inter';
  font-weight: 500;
  src: url(${InterMediumTtf}) format("truetype-variations")
`;

const InterBoldItalic = `
  font-display: swap;
  font-family: 'Inter';
  font-style: italic;
  font-style: italic;
  font-synthesis: none;   
  font-variation-settings: 'ital' 1;
  font-weight: 500;
  src: url(${InterMediumTtf}) format("truetype-variations")
`;

const fontFace = `
  @font-face {${Inter}}
  @font-face {${InterItalic}}
  @font-face {${InterBold}}
  @font-face {${InterBoldItalic}}
`;

export default fontFace;
