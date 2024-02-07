import { describe, expect, test } from "vitest";

import { DEFAULT_CONFIG_FILE } from "../classes/__mocks__/expectedData.js";
import { activeConfig } from "../index.js";
import { getNewConfig } from "./getNewConfig.js";

describe("getNewConfig", () => {
	test("getNewConfig(...)", () => {
		expect(getNewConfig(activeConfig.config)).toBe(DEFAULT_CONFIG_FILE);
		expect(
			getNewConfig({
				coverageFiles: "**/coverage-summary.json",
				mdFiles: {},
				silent: true,
			}),
		).toBe(`/**
 * Configuration file for monorepo-coverage-badges (Monorepo Coverage Badges)
 */

/** @type {import('monorepo-coverage-badges').Config} */
module.exports = {
	"coverageFiles": "**/coverage-summary.json",
	"mdFiles": {},
	"silent": true
};`);
	});
});
