import { describe, expect, test } from "vitest";

import { DEFAULT_CONFIG_FILE } from "../classes/__mocks__/expectedData.js";
import { activeConfig } from "../index.js";
import { getNewConfig } from "./getNewConfig";

describe("getNewConfig", () => {
	test("getNewConfig(...)", () => {
		expect(getNewConfig(activeConfig.config)).toBe(DEFAULT_CONFIG_FILE);
		expect(
			getNewConfig({
				silent: true,
				coverageFiles: "**/coverage-summary.json",
				mdFiles: {},
			})
		).toBe(`/**
 * Configuration file for monorepo-coverage-badges (Monorepo Coverage Badges)
 */

/** @type {import('monorepo-coverage-badges').Config} */
module.exports = {
	"silent": true,
	"coverageFiles": "**/coverage-summary.json",
	"mdFiles": {}
};`);
	});
});
