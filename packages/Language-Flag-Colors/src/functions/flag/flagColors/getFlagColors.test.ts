import { describe, expect, test } from "vitest";

import { getFlagColors } from "./getFlagColors.js";

describe("getFlagColors()", () => {
	test("Getting the flag colors of a language given its locale", () => {
		expect(getFlagColors("nl-nl")).toStrictEqual([
			{ hex: "#C8102E", rgb: [200, 16, 46], cmyk: [0, 100, 80, 5], base10: 13_111_342 },
			{ hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16_777_215 },
			{ hex: "#003DA5", rgb: [0, 61, 165], cmyk: [100, 76, 0, 9], base10: 15_781 },
		]);
	});

	test("Getting the flag colors of a language given its ISO codes", () => {
		expect(getFlagColors("pt")).toStrictEqual([
			{ hex: "#046A38", rgb: [4, 106, 56], cmyk: [85, 3, 91, 44], base10: 289_336 },
			{ hex: "#DA291C", rgb: [218, 41, 28], cmyk: [0, 95, 100, 0], base10: 14_297_372 },
			{ hex: "#FFE900", rgb: [255, 233, 0], cmyk: [0, 3, 97, 0], base10: 16_771_328 },
			{ hex: "#002D72", rgb: [0, 45, 114], cmyk: [100, 79, 0, 37], base10: 11_634 },
			{ hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16_777_215 },
			{ hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
		]);
		expect(getFlagColors("nld")).toStrictEqual([
			{ hex: "#C8102E", rgb: [200, 16, 46], cmyk: [0, 100, 80, 5], base10: 13_111_342 },
			{ hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16_777_215 },
			{ hex: "#003DA5", rgb: [0, 61, 165], cmyk: [100, 76, 0, 9], base10: 15_781 },
		]);
		expect(getFlagColors("afb")).toStrictEqual([
			{ hex: "#CE1126", rgb: [206, 17, 38], cmyk: [0, 95, 100, 0], base10: 13_504_806 },
			{ hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16_777_215 },
		]);
	});

	test("Getting the flag colors of a language given its name", () => {
		expect(getFlagColors("english")).toStrictEqual([
			{ hex: "#B31942", rgb: [179, 25, 66], cmyk: [0, 100, 66, 13], base10: 11_737_410 },
			{ hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16_777_215 },
			{ hex: "#0A3161", rgb: [10, 49, 97], cmyk: [100, 68, 0, 54], base10: 668_001 },
		]);
	});
});
