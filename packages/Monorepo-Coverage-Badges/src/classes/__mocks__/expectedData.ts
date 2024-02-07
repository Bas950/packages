/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { join } from "node:path";

import { COVERAGE_REPLACEMENTS } from "../../util/constants.js";
import { Coverage } from "../../util/coverage.js";
import { directoryName } from "../../util/directoryName.js";
import { BadgeLocation } from "../BadgeGenerator.js";

const expectedParseCoverageData: Record<string, Coverage> = {},
	coverageSummaryPath = join(directoryName, "src", "classes", "__mocks__", "coverage", "coverage-summary.json");
expectedParseCoverageData[coverageSummaryPath] = {
	total: {
		branches: { covered: 13, pct: 72.22, skipped: 0, total: 18 },
		functions: { covered: 19, pct: 45.23, skipped: 0, total: 42 },
		lines: { covered: 417, pct: 56.42, skipped: 0, total: 739 },
		statements: { covered: 417, pct: 56.42, skipped: 0, total: 739 },
	},
};
expectedParseCoverageData[coverageSummaryPath]![join(directoryName, "src", "index.ts")] = {
	branches: { covered: 1, pct: 100, skipped: 0, total: 1 },
	functions: { covered: 1, pct: 100, skipped: 0, total: 1 },
	lines: { covered: 7, pct: 100, skipped: 0, total: 7 },
	statements: { covered: 7, pct: 100, skipped: 0, total: 7 },
};
expectedParseCoverageData[coverageSummaryPath]![join(directoryName, "src", "classes", "Badge.ts")] = {
	branches: { covered: 0, pct: 100, skipped: 0, total: 0 },
	functions: { covered: 0, pct: 0, skipped: 0, total: 8 },
	lines: { covered: 16, pct: 29.09, skipped: 0, total: 55 },
	statements: { covered: 16, pct: 29.09, skipped: 0, total: 55 },
};
expectedParseCoverageData[coverageSummaryPath]![join(directoryName, "src", "classes", "BadgeGenerator.ts")] = {
	branches: { covered: 3, pct: 75, skipped: 0, total: 4 },
	functions: { covered: 3, pct: 23.07, skipped: 0, total: 13 },
	lines: { covered: 62, pct: 23.04, skipped: 0, total: 269 },
	statements: { covered: 62, pct: 23.04, skipped: 0, total: 269 },
};
expectedParseCoverageData[coverageSummaryPath]![join(directoryName, "src", "classes", "ConfigHandler.ts")] = {
	branches: { covered: 2, pct: 100, skipped: 0, total: 2 },
	functions: { covered: 2, pct: 50, skipped: 0, total: 4 },
	lines: { covered: 37, pct: 48.05, skipped: 0, total: 77 },
	statements: { covered: 37, pct: 48.05, skipped: 0, total: 77 },
};
expectedParseCoverageData[coverageSummaryPath]![join(directoryName, "src", "util", "configs.ts")] = {
	branches: { covered: 1, pct: 100, skipped: 0, total: 1 },
	functions: { covered: 3, pct: 100, skipped: 0, total: 3 },
	lines: { covered: 168, pct: 100, skipped: 0, total: 168 },
	statements: { covered: 168, pct: 100, skipped: 0, total: 168 },
};
expectedParseCoverageData[coverageSummaryPath]![join(directoryName, "src", "util", "constants.ts")] = {
	branches: { covered: 4, pct: 100, skipped: 0, total: 4 },
	functions: { covered: 5, pct: 100, skipped: 0, total: 5 },
	lines: { covered: 56, pct: 100, skipped: 0, total: 56 },
	statements: { covered: 56, pct: 100, skipped: 0, total: 56 },
};
expectedParseCoverageData[coverageSummaryPath]![join(directoryName, "src", "util", "coverage.ts")] = {
	branches: { covered: 0, pct: 100, skipped: 0, total: 0 },
	functions: { covered: 3, pct: 100, skipped: 0, total: 3 },
	lines: { covered: 42, pct: 100, skipped: 0, total: 42 },
	statements: { covered: 42, pct: 100, skipped: 0, total: 42 },
};
expectedParseCoverageData[coverageSummaryPath]![join(directoryName, "src", "util", "getNewConfig.ts")] = {
	branches: { covered: 0, pct: 100, skipped: 0, total: 0 },
	functions: { covered: 0, pct: 0, skipped: 0, total: 3 },
	lines: { covered: 13, pct: 30.23, skipped: 0, total: 43 },
	statements: { covered: 13, pct: 30.23, skipped: 0, total: 43 },
};
expectedParseCoverageData[coverageSummaryPath]![join(directoryName, "src", "classes", "__mocks__", "expectedData.ts")] = {
	branches: { covered: 2, pct: 33.33, skipped: 0, total: 6 },
	functions: { covered: 2, pct: 100, skipped: 0, total: 2 },
	lines: { covered: 16, pct: 72.72, skipped: 0, total: 22 },
	statements: { covered: 16, pct: 72.72, skipped: 0, total: 22 },
};

export const EXPECTED_PARSE_COVERAGE_DATA = expectedParseCoverageData;

const expectedBadgesPerFile: Record<string, Record<keyof typeof COVERAGE_REPLACEMENTS, BadgeLocation[]>> = {};
expectedBadgesPerFile[join("src", "classes", "__mocks__", "test_README.md")] = {
	branches: [
		{
			fullLine: "line 19 https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$branches-url$&style=flat",
			replacement: "https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$branches-url$&style=flat",
		},
		{ fullLine: "line 9 $branches$", replacement: "$branches$" },
	],
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
	statements: [
		{
			fullLine: "line 21 https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$statements-url$&style=flat",
			replacement: "https://img.shields.io/badge/dwa-90.57%25-success.svg?placeholder=$statements-url$&style=flat",
		},
		{ fullLine: "line 11 $statements$", replacement: "$statements$" },
	],
};

export const EXPECTED_BADGES_PER_FILE = expectedBadgesPerFile;

const expectedBadgesPerFileWithNewBadges: Record<string, [BadgeLocation, string][]> = {};

expectedBadgesPerFileWithNewBadges[join("src", "classes", "__mocks__", "test_README.md")] = [
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
];

export const EXPECTED_BADGES_PER_FILE_WITH_NEW_BADGES = expectedBadgesPerFileWithNewBadges;

const expectedBadgesPerFileWithNewBadges2: Record<string, [BadgeLocation, string][]> = {};
expectedBadgesPerFileWithNewBadges2[join("src", "classes", "__mocks__", "test_README.md")] = [
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
];

export const EXPECTED_BADGES_PER_FILE_WITH_NEW_BADGES2 = expectedBadgesPerFileWithNewBadges2,
	CUSTOM_CONFIG = {
		coverageFiles: "**/coverage-summary.json",
		mdFiles: {
			"**/*README.md": {
				branches: {
					color: {
						"<70": "critical",
						"<80": "important",
						">=90": "success",
						uncovered: "informational",
					},
					label: "branches",
					logo: "vitest",
					style: "flat",
					uncoveredText: "unknown",
				},
				coverage: {
					color: {
						"<70": "critical",
						"<80": "important",
						">=90": "success",
						uncovered: "informational",
					},
					label: "coverage",
					logo: "vitest",
					style: "flat",
					uncoveredText: "unknown",
				},
				functions: {
					color: {
						"<70": "critical",
						"<80": "important",
						">=90": "success",
						uncovered: "informational",
					},
					label: "functions",
					logo: "vitest",
					style: "flat",
					uncoveredText: "unknown",
				},
				lines: {
					color: {
						"<70": "critical",
						"<80": "important",
						">=90": "success",
						uncovered: "informational",
					},
					label: "lines",
					logo: "vitest",
					style: "flat",
					uncoveredText: "unknown",
				},
				statements: {
					color: {
						"<70": "critical",
						"<80": "important",
						">=90": "success",
						uncovered: "informational",
					},
					label: "statements",
					logo: "vitest",
					style: "flat",
					uncoveredText: "unknown",
				},
			},
		},
		silent: false,
	},
	BADGES_CONFIG = {
		coverageFiles: "coverage/coverage-summary.json",
		mdFiles: {
			"README.md": {
				branches: {
					color: {
						"<80": "critical",
						"<90": "important",
						">=90": "success",
						uncovered: "informational",
					},
					label: "branches",
					style: "flat",
					uncoveredText: "unknown",
				},
				coverage: {
					color: {
						"<80": "critical",
						"<90": "important",
						">=90": "success",
						uncovered: "informational",
					},
					label: "coverage",
					style: "flat",
					uncoveredText: "unknown",
				},
				functions: {
					color: {
						"<80": "critical",
						"<90": "important",
						">=90": "success",
						uncovered: "informational",
					},
					label: "functions",
					style: "flat",
					uncoveredText: "unknown",
				},
				lines: {
					color: {
						"<80": "critical",
						"<90": "important",
						">=90": "success",
						uncovered: "informational",
					},
					label: "lines",
					style: "flat",
					uncoveredText: "unknown",
				},
				statements: {
					color: {
						"<80": "critical",
						"<90": "important",
						">=90": "success",
						uncovered: "informational",
					},
					label: "statements",
					style: "flat",
					uncoveredText: "unknown",
				},
			},
		},
		silent: false,
	},
	DEFAULT_STYLING_FILE = `"color": {
					"<80": "critical",
					"<90": "important",
					">=90": "success",
					"uncovered": "informational"
				},
				"style": "flat",
				"uncoveredText": "unknown"`,
	DEFAULT_CONFIG_FILE = `/**
 * Configuration file for monorepo-coverage-badges (Monorepo Coverage Badges)
 */

/** @type {import('monorepo-coverage-badges').Config} */
module.exports = {
	"coverageFiles": "**/coverage-summary.json",
	"mdFiles": {
		"**/*.md": {
			"branches": {
				"label": "branches",
				${DEFAULT_STYLING_FILE}
			},
			"coverage": {
				"label": "coverage",
				${DEFAULT_STYLING_FILE}
			},
			"functions": {
				"label": "functions",
				${DEFAULT_STYLING_FILE}
			},
			"lines": {
				"label": "lines",
				${DEFAULT_STYLING_FILE}
			},
			"statements": {
				"label": "statements",
				${DEFAULT_STYLING_FILE}
			}
		}
	},
	"silent": false
};`;
