/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
	content: [ './src/**/*.{html,js,ts,jsx,tsx}' ],
	theme: {
		extend: {
			spacing: {
				'128': '32rem',
				'256': '64rem',
				'512': '128rem',
			},
		},
	},
	plugins: [],
};
