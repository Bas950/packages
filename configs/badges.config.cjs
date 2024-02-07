
/** @type {import('monorepo-coverage-badges').Config} */
module.exports = {
	silent: false,
	coverageFiles: "**/coverage/coverage-summary.json",
	mdFiles: {
		"**/README.md": {
			coverage: {
				logo: "vitest",
			},
			statements: {
				logo: "vitest",
			},
			branches: {
				logo: "vitest",
			},
			functions: {
				logo: "vitest",
			},
			lines: {
				logo: "vitest",
			},
		},
	},
};
