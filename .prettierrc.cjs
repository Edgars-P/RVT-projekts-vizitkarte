console.log("File is loaded!")
module.exports = {
	overrides: [
		{
			files: "*.astro",
			options: {
				parser: "astro",
			},
		},
	],

	trailingComma: "es5",
	useTabs: true,
	tabWidth: 2,
	semi: false,
	singleQuote: false,
	quoteProps: "as-needed",
	bracketSpacing: false,
	bracketSameLine: false,
	arrowParens: "avoid",
	endOfLine: "lf",
}
