/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				dark: {
					0: "#000000",
					1: "#101010",
					2: "#202020",
					3: "#303030",
				},
				light: {
					0: "#888888",
					1: "#cccccc",
					2: "#ffffff",
				},
			},
		},
	},
	plugins: [],
};
