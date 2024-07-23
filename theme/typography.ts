export function pxToRem(value: number) {
  return `${value / 16}rem`;
}

const FONT_PRIMARY = 'Bahnschrift';

const typography = {
  fontFamily: `${FONT_PRIMARY}, serif`,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
};

export default typography;
