/**
 * Configuration file for monorepo-coverage-badges (Monorepo Coverage Badges)
 */

/** @type {import('monorepo-coverage-badges').Config} */
module.exports = {
	silent: false,
	coverageFiles: "coverage/coverage-summary.json",
	mdFiles: {
		"**/*.md": {
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
