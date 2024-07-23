import Bahnschrift from '@/fonts/Bahnschrift-font.ttf';

export default function CssBaseline() {
	return {
		MuiCssBaseline: {
			styleOverrides: `
        @font-face {
          font-family: 'Bahnschrift';
          src: url('${Bahnschrift}') format('truetype');
          font-weight: 100 900;
        }
      `,
		},
	};
}
