import { ButtonProps, Theme, ThemeOptions } from '@mui/material';
import { pxToRem } from '../typography';
import { responsiveStyle } from '..';

declare module '@mui/material/Button' {
	interface ButtonPropsVariantOverrides {
		primary: true;
		secondary: true;
		ghost: true;
	}
}
export default function Button(theme: Theme): ThemeOptions['components'] {
	return {
		MuiButton: {
			defaultProps: {
				disableRipple: true,
			},
			styleOverrides: {
				root: {
					minWidth: '128px',
					minHeight: '42px',
					borderRadius: 0,
					fontFamily: 'Bahnschrift',
					textTransform: 'none',
				},
			},
			variants: [
				{
					props: { variant: 'primary' } as ButtonProps,
					style: {
						backgroundColor: theme.palette.primary.main,
						color: theme.palette.neutral.white,
						'&:hover': {
							borderRadius: '0px',
							backgroundColor: '#699361',
						},
						'&:active': {
							borderRadius: '0px',
							backgroundColor: '#345E2C',
						},
						'&[disabled]': {
							borderRadius: '0px',
							color: theme.palette.neutral.white,
							backgroundColor: theme.palette.neutral.lightgray,
						},
					},
				},
				{
					props: { color: 'secondary', variant: 'primary' } as ButtonProps,
					style: {
						backgroundColor: theme.palette.secondary.main,
						color: theme.palette.neutral.white,
						'&:hover': {
							backgroundColor: theme.palette.secondary.light,
						},
						'&:active': {
							backgroundColor: theme.palette.secondary.dark,
						},
						'&[disabled]': {
							backgroundColor: theme.palette.neutral.lightgray,
						},
					},
				},
				{
					props: { variant: 'secondary' } as ButtonProps,
					style: {
						border: `1px solid ${theme.palette.primary.main}`,
						backgroundColor: theme.palette.neutral.white,
						color: theme.palette.primary.main,
						'&:hover': {
							border: '1px solid #699361',
							borderRadius: '0px',
							backgroundColor: theme.palette.neutral.white,
							color: '#699361',
						},
						'&:active': {
							border: '1px solid #345E2C',
							backgroundColor: theme.palette.neutral.white,
							color: '#345E2C',
							borderRadius: '0px',
						},
						'&[disabled]': {
							border: `1px solid ${theme.palette.neutral.lightgray}`,
							backgroundColor: theme.palette.neutral.white,
							color: theme.palette.neutral.lightgray,
						},
					},
				},
				{
					props: { variant: 'secondary', color: 'secondary' } as ButtonProps,
					style: {
						border: `1px solid ${theme.palette.secondary.main}`,
						backgroundColor: theme.palette.neutral.white,
						color: theme.palette.secondary.main,
						'&:hover': {
							border: `1px solid ${theme.palette.secondary.light}`,
							backgroundColor: theme.palette.neutral.white,
							color: theme.palette.secondary.light,
						},
						'&:active': {
							border: `1px solid ${theme.palette.secondary.dark}`,
							backgroundColor: theme.palette.neutral.white,
							color: theme.palette.secondary.dark,
						},
						'&[disabled]': {
							border: `1px solid ${theme.palette.neutral.lightgray}`,
							backgroundColor: theme.palette.neutral.white,
							color: theme.palette.neutral.lightgray,
						},
					},
				},
				{
					props: { variant: 'ghost' } as ButtonProps,
					style: {
						border: `none`,
						backgroundColor: theme.palette.neutral.white,
						color: theme.palette.primary.main,
						'&:hover': {
							color: theme.palette.primary.light,
							backgroundColor: theme.palette.neutral.white,
						},
						'&:active': {
							backgroundColor: theme.palette.neutral.white,
							color: theme.palette.primary.dark,
						},
						'&[disabled]': {
							backgroundColor: theme.palette.neutral.white,
							color: theme.palette.neutral.lightgray,
						},
					},
				},
				{
					props: { variant: 'ghost', color: 'secondary' } as ButtonProps,
					style: {
						border: `none`,
						backgroundColor: theme.palette.neutral.white,
						color: theme.palette.secondary.main,
						'&:hover': {
							color: theme.palette.secondary.light,
							backgroundColor: theme.palette.neutral.white,
						},
						'&:active': {
							backgroundColor: theme.palette.neutral.white,
							color: theme.palette.secondary.dark,
						},
						'&[disabled]': {
							backgroundColor: theme.palette.neutral.white,
							color: theme.palette.neutral.lightgray,
						},
					},
				},
				{
					props: {
						size: 'large',
					} as ButtonProps,
					style: {
						[theme.breakpoints.up('sm')]: {
							padding: pxToRem(16),
							minWidth: pxToRem(152),
							height: pxToRem(56),
							fontWeight: 400,
							fontSize: pxToRem(20),
							lineHeight: pxToRem(24),
						},
						[theme.breakpoints.down('sm')]: {
							padding: pxToRem(16),
							minWidth: pxToRem(140),
							height: pxToRem(48),
							fontWeight: 400,
							fontSize: pxToRem(14),
							lineHeight: pxToRem(22),
						},
					},
				},
				{
					props: { size: 'medium' } as ButtonProps,
					style: {
						[theme.breakpoints.up('sm')]: {
							padding: '12px',
							height: '46px',
							fontWeight: 400,
							fontSize: '18px',
							lineHeight: '22px',
						},
						[theme.breakpoints.down('sm')]: {
							padding: '12px',
							height: '46px',
							fontWeight: 400,
							fontSize: '14px',
							lineHeight: '22px',
						},
					},
				},
				{
					props: { size: 'small' } as ButtonProps,
					style: {
						padding: '8px',
						width: '108px',
						height: '38px',
						fontWeight: 400,
						fontSize: '16px',
						lineHeight: '22px',
					},
				},
				{
					props: { fullWidth: true } as ButtonProps,
					style: {
						width: '100%',
					},
				},
			],
		},
	};
}
