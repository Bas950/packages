import { describe, expect, test } from "vitest";

import { getBase10FlagColors } from "./getBase10FlagColors.js";

describe("getBase10FlagColors()", () => {
	test("Getting the base-10 flag colors of a language given its locale", () => {
		expect(getBase10FlagColors("nl-nl")).toStrictEqual([13_111_342, 16_777_215, 15_781]);
	});

	test("Getting the base-10 flag colors of a language given its ISO codes", () => {
		expect(getBase10FlagColors("pt")).toStrictEqual([289_336, 14_297_372, 16_771_328, 11_634, 16_777_215, 0]);
		expect(getBase10FlagColors("nld")).toStrictEqual([13_111_342, 16_777_215, 15_781]);
		expect(getBase10FlagColors("afb")).toStrictEqual([13_504_806, 16_777_215]);
	});

	test("Getting the base-10 flag colors of a language given its name", () => {
		expect(getBase10FlagColors("english")).toStrictEqual([11_737_410, 16_777_215, 668_001]);
	});
});
