/**
 * Configuration file for monorepo-coverage-badges (Monorepo Coverage Badges)
 */

/** @type {import('./bin/index.js').Config} */
module.exports = {
	silent: false,
	coverageFiles: "coverage/coverage-summary.json",
	mdFiles: {
		"README.md": {
			coverage: {
				label: "coverage",
				style: "flat",
				color: {
					"<80": "critical",
					"<90": "important",
					">=90": "success",
					uncovered: "informational",
				},
				uncoveredText: "unknown",
			},
			statements: {
				label: "statements",
				style: "flat",
				color: {
					"<80": "critical",
					"<90": "important",
					">=90": "success",
					uncovered: "informational",
				},
				uncoveredText: "unknown",
			},
			branches: {
				label: "branches",
				style: "flat",
				color: {
					"<80": "critical",
					"<90": "important",
					">=90": "success",
					uncovered: "informational",
				},
				uncoveredText: "unknown",
			},
			functions: {
				label: "functions",
				style: "flat",
				color: {
					"<80": "critical",
					"<90": "important",
					">=90": "success",
					uncovered: "informational",
				},
				uncoveredText: "unknown",
			},
			lines: {
				label: "lines",
				style: "flat",
				color: {
					"<80": "critical",
					"<90": "important",
					">=90": "success",
					uncovered: "informational",
				},
				uncoveredText: "unknown",
			},
		},
	},
};
