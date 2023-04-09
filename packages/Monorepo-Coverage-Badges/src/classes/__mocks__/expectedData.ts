import { join } from "node:path";

import { COVERAGE_REPLACEMENTS } from "../../util/constants.js";
import { Coverage } from "../../util/coverage.js";
import { directoryName } from "../../util/directoryName.js";
import { BadgeLocation } from "../BadgeGenerator.js";

const expectedParseCoverageData: Record<string, Coverage> = {},
	coverageSummaryPath = `${join(directoryName, "src", "classes", "__mocks__", "coverage", "coverage-summary.json")}`;
expectedParseCoverageData[coverageSummaryPath] = {
	total: {
		lines: { total: 739, covered: 417, skipped: 0, pct: 56.42 },
		statements: { total: 739, covered: 417, skipped: 0, pct: 56.42 },
		functions: { total: 42, covered: 19, skipped: 0, pct: 45.23 },
		branches: { total: 18, covered: 13, skipped: 0, pct: 72.22 },
	},
};
expectedParseCoverageData[coverageSummaryPath][`${join(directoryName, "src", "index.ts")}`] = {
	lines: { total: 7, covered: 7, skipped: 0, pct: 100 },
	functions: { total: 1, covered: 1, skipped: 0, pct: 100 },
	statements: { total: 7, covered: 7, skipped: 0, pct: 100 },
	branches: { total: 1, covered: 1, skipped: 0, pct: 100 },
};
expectedParseCoverageData[coverageSummaryPath][`${join(directoryName, "src", "classes", "Badge.ts")}`] = {
	lines: { total: 55, covered: 16, skipped: 0, pct: 29.09 },
	functions: { total: 8, covered: 0, skipped: 0, pct: 0 },
	statements: { total: 55, covered: 16, skipped: 0, pct: 29.09 },
	branches: { total: 0, covered: 0, skipped: 0, pct: 100 },
};
expectedParseCoverageData[coverageSummaryPath][`${join(directoryName, "src", "classes", "BadgeGenerator.ts")}`] = {
	lines: { total: 269, covered: 62, skipped: 0, pct: 23.04 },
	functions: { total: 13, covered: 3, skipped: 0, pct: 23.07 },
	statements: { total: 269, covered: 62, skipped: 0, pct: 23.04 },
	branches: { total: 4, covered: 3, skipped: 0, pct: 75 },
};
expectedParseCoverageData[coverageSummaryPath][`${join(directoryName, "src", "classes", "ConfigHandler.ts")}`] = {
	lines: { total: 77, covered: 37, skipped: 0, pct: 48.05 },
	functions: { total: 4, covered: 2, skipped: 0, pct: 50 },
	statements: { total: 77, covered: 37, skipped: 0, pct: 48.05 },
	branches: { total: 2, covered: 2, skipped: 0, pct: 100 },
};
expectedParseCoverageData[coverageSummaryPath][`${join(directoryName, "src", "util", "configs.ts")}`] = {
	lines: { total: 168, covered: 168, skipped: 0, pct: 100 },
	functions: { total: 3, covered: 3, skipped: 0, pct: 100 },
	statements: { total: 168, covered: 168, skipped: 0, pct: 100 },
	branches: { total: 1, covered: 1, skipped: 0, pct: 100 },
};
expectedParseCoverageData[coverageSummaryPath][`${join(directoryName, "src", "util", "constants.ts")}`] = {
	lines: { total: 56, covered: 56, skipped: 0, pct: 100 },
	functions: { total: 5, covered: 5, skipped: 0, pct: 100 },
	statements: { total: 56, covered: 56, skipped: 0, pct: 100 },
	branches: { total: 4, covered: 4, skipped: 0, pct: 100 },
};
expectedParseCoverageData[coverageSummaryPath][`${join(directoryName, "src", "util", "coverage.ts")}`] = {
	lines: { total: 42, covered: 42, skipped: 0, pct: 100 },
	functions: { total: 3, covered: 3, skipped: 0, pct: 100 },
	statements: { total: 42, covered: 42, skipped: 0, pct: 100 },
	branches: { total: 0, covered: 0, skipped: 0, pct: 100 },
};
expectedParseCoverageData[coverageSummaryPath][`${join(directoryName, "src", "util", "getNewConfig.ts")}`] = {
	lines: { total: 43, covered: 13, skipped: 0, pct: 30.23 },
	functions: { total: 3, covered: 0, skipped: 0, pct: 0 },
	statements: { total: 43, covered: 13, skipped: 0, pct: 30.23 },
	branches: { total: 0, covered: 0, skipped: 0, pct: 100 },
};
expectedParseCoverageData[coverageSummaryPath][`${join(directoryName, "src", "classes", "__mocks__", "expectedData.ts")}`] = {
	lines: { total: 22, covered: 16, skipped: 0, pct: 72.72 },
	functions: { total: 2, covered: 2, skipped: 0, pct: 100 },
	statements: { total: 22, covered: 16, skipped: 0, pct: 72.72 },
	branches: { total: 6, covered: 2, skipped: 0, pct: 33.33 },
};

export const EXPECTED_PARSE_COVERAGE_DATA = expectedParseCoverageData;

const expectedBadgesPerFile: Record<string, Record<keyof typeof COVERAGE_REPLACEMENTS, BadgeLocation[]>> = {};
expectedBadgesPerFile[join("src", "classes", "__mocks__", "test_README.md")] = {
	coverage: [
		{
			fullLine: "line 13 https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$coverage-url$&style=flat",
			replacement: "https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$coverage-url$&style=flat",
		},
		{
			fullLine: "line 23 https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$coverage-url$&style=flat $lines$",
			replacement: "https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$coverage-url$&style=flat",
		},
		{ fullLine: "line 3 $coverage$", replacement: "$coverage$" },
	],
	statements: [
		{
			fullLine: "line 21 https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$statements-url$&style=flat",
			replacement: "https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$statements-url$&style=flat",
		},
		{ fullLine: "line 11 $statements$", replacement: "$statements$" },
	],
	branches: [
		{
			fullLine: "line 19 https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$branches-url$&style=flat",
			replacement: "https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$branches-url$&style=flat",
		},
		{ fullLine: "line 9 $branches$", replacement: "$branches$" },
	],
	functions: [
		{
			fullLine: "line 17 https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$functions-url$&style=flat",
			replacement: "https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$functions-url$&style=flat",
		},
		{ fullLine: "line 7 $functions$", replacement: "$functions$" },
	],
	lines: [
		{
			fullLine: "line 15 https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$lines-url$&style=flat",
			replacement: "https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$lines-url$&style=flat",
		},
		{ fullLine: "line 5 $lines$", replacement: "$lines$" },
		{ fullLine: "line 23 https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$coverage-url$&style=flat $lines$", replacement: "$lines$" },
	],
};

export const EXPECTED_BADGES_PER_FILE = expectedBadgesPerFile;

const expectedBadgesPerFileWithNewBadges: Record<string, [BadgeLocation, string][]> = {};

expectedBadgesPerFileWithNewBadges[join("src", "classes", "__mocks__", "test_README.md")] = [
	[
		{
			fullLine: "line 13 https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$coverage-url$&style=flat",
			replacement: "https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$coverage-url$&style=flat",
		},
		"https://img.shields.io/badge/coverage-unknown-informational.svg?placeholder=$coverage-url$&style=flat",
	],
	[
		{
			fullLine: "line 23 https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$coverage-url$&style=flat $lines$",
			replacement: "https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$coverage-url$&style=flat",
		},
		"https://img.shields.io/badge/coverage-unknown-informational.svg?placeholder=$coverage-url$&style=flat",
	],
	[
		{ fullLine: "line 3 $coverage$", replacement: "$coverage$" },
		"https://img.shields.io/badge/coverage-unknown-informational.svg?placeholder=$coverage-url$&style=flat",
	],
	[
		{
			fullLine: "line 21 https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$statements-url$&style=flat",
			replacement: "https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$statements-url$&style=flat",
		},
		"https://img.shields.io/badge/statements-unknown-informational.svg?placeholder=$statements-url$&style=flat",
	],
	[
		{ fullLine: "line 11 $statements$", replacement: "$statements$" },
		"https://img.shields.io/badge/statements-unknown-informational.svg?placeholder=$statements-url$&style=flat",
	],
	[
		{
			fullLine: "line 19 https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$branches-url$&style=flat",
			replacement: "https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$branches-url$&style=flat",
		},
		"https://img.shields.io/badge/branches-unknown-informational.svg?placeholder=$branches-url$&style=flat",
	],
	[
		{ fullLine: "line 9 $branches$", replacement: "$branches$" },
		"https://img.shields.io/badge/branches-unknown-informational.svg?placeholder=$branches-url$&style=flat",
	],
	[
		{
			fullLine: "line 17 https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$functions-url$&style=flat",
			replacement: "https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$functions-url$&style=flat",
		},
		"https://img.shields.io/badge/functions-unknown-informational.svg?placeholder=$functions-url$&style=flat",
	],
	[
		{ fullLine: "line 7 $functions$", replacement: "$functions$" },
		"https://img.shields.io/badge/functions-unknown-informational.svg?placeholder=$functions-url$&style=flat",
	],
	[
		{
			fullLine: "line 15 https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$lines-url$&style=flat",
			replacement: "https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$lines-url$&style=flat",
		},
		"https://img.shields.io/badge/lines-unknown-informational.svg?placeholder=$lines-url$&style=flat",
	],
	[{ fullLine: "line 5 $lines$", replacement: "$lines$" }, "https://img.shields.io/badge/lines-unknown-informational.svg?placeholder=$lines-url$&style=flat"],
	[
		{ fullLine: "line 23 https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$coverage-url$&style=flat $lines$", replacement: "$lines$" },
		"https://img.shields.io/badge/lines-unknown-informational.svg?placeholder=$lines-url$&style=flat",
	],
];

export const EXPECTED_BADGES_PER_FILE_WITH_NEW_BADGES = expectedBadgesPerFileWithNewBadges;

const expectedBadgesPerFileWithNewBadges2: Record<string, [BadgeLocation, string][]> = {};
expectedBadgesPerFileWithNewBadges2[join("src", "classes", "__mocks__", "test_README.md")] = [
	[
		{
			fullLine: "line 13 https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$coverage-url$&style=flat",
			replacement: "https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$coverage-url$&style=flat",
		},
		"https://img.shields.io/badge/coverage-69.69%25-critical.svg?placeholder=$coverage-url$&style=flat",
	],
	[
		{
			fullLine: "line 23 https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$coverage-url$&style=flat $lines$",
			replacement: "https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$coverage-url$&style=flat",
		},
		"https://img.shields.io/badge/coverage-69.69%25-critical.svg?placeholder=$coverage-url$&style=flat",
	],
	[
		{
			fullLine: "line 3 $coverage$",
			replacement: "$coverage$",
		},
		"https://img.shields.io/badge/coverage-69.69%25-critical.svg?placeholder=$coverage-url$&style=flat",
	],
	[
		{
			fullLine: "line 21 https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$statements-url$&style=flat",
			replacement: "https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$statements-url$&style=flat",
		},
		"https://img.shields.io/badge/statements-72.72%25-critical.svg?placeholder=$statements-url$&style=flat",
	],
	[
		{
			fullLine: "line 11 $statements$",
			replacement: "$statements$",
		},
		"https://img.shields.io/badge/statements-72.72%25-critical.svg?placeholder=$statements-url$&style=flat",
	],
	[
		{
			fullLine: "line 19 https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$branches-url$&style=flat",
			replacement: "https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$branches-url$&style=flat",
		},
		"https://img.shields.io/badge/branches-33.33%25-critical.svg?placeholder=$branches-url$&style=flat",
	],
	[
		{
			fullLine: "line 9 $branches$",
			replacement: "$branches$",
		},
		"https://img.shields.io/badge/branches-33.33%25-critical.svg?placeholder=$branches-url$&style=flat",
	],
	[
		{
			fullLine: "line 17 https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$functions-url$&style=flat",
			replacement: "https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$functions-url$&style=flat",
		},
		"https://img.shields.io/badge/functions-100%25-success.svg?placeholder=$functions-url$&style=flat",
	],
	[
		{
			fullLine: "line 7 $functions$",
			replacement: "$functions$",
		},
		"https://img.shields.io/badge/functions-100%25-success.svg?placeholder=$functions-url$&style=flat",
	],
	[
		{
			fullLine: "line 15 https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$lines-url$&style=flat",
			replacement: "https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$lines-url$&style=flat",
		},
		"https://img.shields.io/badge/lines-72.72%25-critical.svg?placeholder=$lines-url$&style=flat",
	],
	[
		{
			fullLine: "line 5 $lines$",
			replacement: "$lines$",
		},
		"https://img.shields.io/badge/lines-72.72%25-critical.svg?placeholder=$lines-url$&style=flat",
	],
	[
		{
			fullLine: "line 23 https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$coverage-url$&style=flat $lines$",
			replacement: "$lines$",
		},
		"https://img.shields.io/badge/lines-72.72%25-critical.svg?placeholder=$lines-url$&style=flat",
	],
];

export const EXPECTED_BADGES_PER_FILE_WITH_NEW_BADGES2 = expectedBadgesPerFileWithNewBadges2,
	CUSTOM_CONFIG = {
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
	},
	BADGES_CONFIG = {
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
	},
	DEFAULT_STYLING_FILE = `"style": "flat",
				"color": {
					"<80": "critical",
					"<90": "important",
					">=90": "success",
					"uncovered": "informational"
				},
				"uncoveredText": "unknown"`,
	DEFAULT_CONFIG_FILE = `/**
 * Configuration file for monorepo-coverage-badges (Monorepo Coverage Badges)
 */

/** @type {import('monorepo-coverage-badges').Config} */
module.exports = {
	"silent": false,
	"coverageFiles": "**/coverage-summary.json",
	"mdFiles": {
		"**/*.md": {
			"coverage": {
				"label": "coverage",
				${DEFAULT_STYLING_FILE}
			},
			"statements": {
				"label": "statements",
				${DEFAULT_STYLING_FILE}
			},
			"branches": {
				"label": "branches",
				${DEFAULT_STYLING_FILE}
			},
			"functions": {
				"label": "functions",
				${DEFAULT_STYLING_FILE}
			},
			"lines": {
				"label": "lines",
				${DEFAULT_STYLING_FILE}
			}
		}
	}
};`;
