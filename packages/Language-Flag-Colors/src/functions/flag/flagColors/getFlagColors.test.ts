import { describe, expect, test } from "vitest";

import { getFlagColors } from "./getFlagColors.js";

describe("getFlagColors()", () => {
	test("Getting the flag colors of a language given its locale", () => {
		expect(getFlagColors("nl-nl")).toStrictEqual([
			{ base10: 13_111_342, cmyk: [0, 100, 80, 5], hex: "#C8102E", rgb: [200, 16, 46] },
			{ base10: 16_777_215, cmyk: [0, 0, 0, 0], hex: "#FFFFFF", rgb: [255, 255, 255] },
			{ base10: 15_781, cmyk: [100, 76, 0, 9], hex: "#003DA5", rgb: [0, 61, 165] },
		]);
	});

	test("Getting the flag colors of a language given its ISO codes", () => {
		expect(getFlagColors("pt")).toStrictEqual([
			{ base10: 289_336, cmyk: [85, 3, 91, 44], hex: "#046A38", rgb: [4, 106, 56] },
			{ base10: 14_297_372, cmyk: [0, 95, 100, 0], hex: "#DA291C", rgb: [218, 41, 28] },
			{ base10: 16_771_328, cmyk: [0, 3, 97, 0], hex: "#FFE900", rgb: [255, 233, 0] },
			{ base10: 11_634, cmyk: [100, 79, 0, 37], hex: "#002D72", rgb: [0, 45, 114] },
			{ base10: 16_777_215, cmyk: [0, 0, 0, 0], hex: "#FFFFFF", rgb: [255, 255, 255] },
			{ base10: 0, cmyk: [0, 0, 0, 100], hex: "#000000", rgb: [0, 0, 0] },
		]);
		expect(getFlagColors("nld")).toStrictEqual([
			{ base10: 13_111_342, cmyk: [0, 100, 80, 5], hex: "#C8102E", rgb: [200, 16, 46] },
			{ base10: 16_777_215, cmyk: [0, 0, 0, 0], hex: "#FFFFFF", rgb: [255, 255, 255] },
			{ base10: 15_781, cmyk: [100, 76, 0, 9], hex: "#003DA5", rgb: [0, 61, 165] },
		]);
		expect(getFlagColors("afb")).toStrictEqual([
			{ base10: 13_504_806, cmyk: [0, 95, 100, 0], hex: "#CE1126", rgb: [206, 17, 38] },
			{ base10: 16_777_215, cmyk: [0, 0, 0, 0], hex: "#FFFFFF", rgb: [255, 255, 255] },
		]);
	});

	test("Getting the flag colors of a language given its name", () => {
		expect(getFlagColors("english")).toStrictEqual([
			{ base10: 11_737_410, cmyk: [0, 100, 66, 13], hex: "#B31942", rgb: [179, 25, 66] },
			{ base10: 16_777_215, cmyk: [0, 0, 0, 0], hex: "#FFFFFF", rgb: [255, 255, 255] },
			{ base10: 668_001, cmyk: [100, 68, 0, 54], hex: "#0A3161", rgb: [10, 49, 97] },
		]);
	});
});
