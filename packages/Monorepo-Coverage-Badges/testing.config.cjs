/**
 * Configuration file for monorepo-coverage-badges (Monorepo Coverage Badges)
 */

/** @type {import('monorepo-coverage-badges').Config} */
module.exports = {
	silent: false,
	coverageFiles: "**/coverage-summary.json",
	mdFiles: {
		"**/*README.md": {
			coverage: {
				label: "coverage",
				style: "flat",
				color: {
					"<70": "critical",
					"<80": "important",
					">=90": "success",
					uncovered: "informational",
				},
				uncoveredText: "unknown",
				logo: "vitest",
			},
			statements: {
				label: "statements",
				style: "flat",
				color: {
					"<70": "critical",
					"<80": "important",
					">=90": "success",
					uncovered: "informational",
				},
				uncoveredText: "unknown",
				logo: "vitest",
			},
			branches: {
				label: "branches",
				style: "flat",
				color: {
					"<70": "critical",
					"<80": "important",
					">=90": "success",
					uncovered: "informational",
				},
				uncoveredText: "unknown",
				logo: "vitest",
			},
			functions: {
				label: "functions",
				style: "flat",
				color: {
					"<70": "critical",
					"<80": "important",
					">=90": "success",
					uncovered: "informational",
				},
				uncoveredText: "unknown",
				logo: "vitest",
			},
			lines: {
				label: "lines",
				style: "flat",
				color: {
					"<70": "critical",
					"<80": "important",
					">=90": "success",
					uncovered: "informational",
				},
				uncoveredText: "unknown",
				logo: "vitest",
			},
		},
	},
};
