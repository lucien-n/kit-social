import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const vercelDark: CustomThemeConfig = {
	name: 'vercel-dark',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base':
			"Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
		'--theme-font-family-heading': 'system-ui',
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '4px',
		'--theme-rounded-container': '4px',
		'--theme-border-base': '1px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '0 0 0',
		'--on-secondary': '255 255 255',
		'--on-tertiary': '0 0 0',
		'--on-success': '255 255 255',
		'--on-warning': '0 0 0',
		'--on-error': '255 255 255',
		'--on-surface': '255 255 255',
		// =~= Theme Colors  =~=
		// primary | #ffffff
		'--color-primary-50': '255 255 255', // #ffffff
		'--color-primary-100': '255 255 255', // #ffffff
		'--color-primary-200': '255 255 255', // #ffffff
		'--color-primary-300': '255 255 255', // #ffffff
		'--color-primary-400': '255 255 255', // #ffffff
		'--color-primary-500': '255 255 255', // #ffffff
		'--color-primary-600': '230 230 230', // #e6e6e6
		'--color-primary-700': '191 191 191', // #bfbfbf
		'--color-primary-800': '153 153 153', // #999999
		'--color-primary-900': '125 125 125', // #7d7d7d
		// secondary | #4c2889
		'--color-secondary-50': '228 223 237', // #e4dfed
		'--color-secondary-100': '219 212 231', // #dbd4e7
		'--color-secondary-200': '210 201 226', // #d2c9e2
		'--color-secondary-300': '183 169 208', // #b7a9d0
		'--color-secondary-400': '130 105 172', // #8269ac
		'--color-secondary-500': '76 40 137', // #4c2889
		'--color-secondary-600': '68 36 123', // #44247b
		'--color-secondary-700': '57 30 103', // #391e67
		'--color-secondary-800': '46 24 82', // #2e1852
		'--color-secondary-900': '37 20 67', // #251443
		// tertiary | #29bc9b
		'--color-tertiary-50': '223 245 240', // #dff5f0
		'--color-tertiary-100': '212 242 235', // #d4f2eb
		'--color-tertiary-200': '202 238 230', // #caeee6
		'--color-tertiary-300': '169 228 215', // #a9e4d7
		'--color-tertiary-400': '105 208 185', // #69d0b9
		'--color-tertiary-500': '41 188 155', // #29bc9b
		'--color-tertiary-600': '37 169 140', // #25a98c
		'--color-tertiary-700': '31 141 116', // #1f8d74
		'--color-tertiary-800': '25 113 93', // #19715d
		'--color-tertiary-900': '20 92 76', // #145c4c
		// success | #0761d1
		'--color-success-50': '218 231 248', // #dae7f8
		'--color-success-100': '205 223 246', // #cddff6
		'--color-success-200': '193 216 244', // #c1d8f4
		'--color-success-300': '156 192 237', // #9cc0ed
		'--color-success-400': '81 144 223', // #5190df
		'--color-success-500': '7 97 209', // #0761d1
		'--color-success-600': '6 87 188', // #0657bc
		'--color-success-700': '5 73 157', // #05499d
		'--color-success-800': '4 58 125', // #043a7d
		'--color-success-900': '3 48 102', // #033066
		// warning | #f5a623
		'--color-warning-50': '254 242 222', // #fef2de
		'--color-warning-100': '253 237 211', // #fdedd3
		'--color-warning-200': '253 233 200', // #fde9c8
		'--color-warning-300': '251 219 167', // #fbdba7
		'--color-warning-400': '248 193 101', // #f8c165
		'--color-warning-500': '245 166 35', // #f5a623
		'--color-warning-600': '221 149 32', // #dd9520
		'--color-warning-700': '184 125 26', // #b87d1a
		'--color-warning-800': '147 100 21', // #936415
		'--color-warning-900': '120 81 17', // #785111
		// error | #e60000
		'--color-error-50': '251 217 217', // #fbd9d9
		'--color-error-100': '250 204 204', // #facccc
		'--color-error-200': '249 191 191', // #f9bfbf
		'--color-error-300': '245 153 153', // #f59999
		'--color-error-400': '238 77 77', // #ee4d4d
		'--color-error-500': '230 0 0', // #e60000
		'--color-error-600': '207 0 0', // #cf0000
		'--color-error-700': '173 0 0', // #ad0000
		'--color-error-800': '138 0 0', // #8a0000
		'--color-error-900': '113 0 0', // #710000
		// surface | #1A1A1A
		'--color-surface-50': '232 232 232', // #E8E8E8
		'--color-surface-100': '209 209 209', // #D1D1D1
		'--color-surface-200': '163 163 163', // #A3A3A3
		'--color-surface-300': '117 117 117', // #757575
		'--color-surface-400': '71 71 71', // #474747
		'--color-surface-500': '26 26 26', // #1A1A1A
		'--color-surface-600': '20 20 20', // #141414
		'--color-surface-700': '15 15 15', // #0F0F0F
		'--color-surface-800': '10 10 10', // #0A0A0A
		'--color-surface-900': '0 0 0' // #000000
	}
};
