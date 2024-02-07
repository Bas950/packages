import { describe, expect, test } from "vitest";

import { getFlag } from "./getFlag.js";

describe("getIds()", () => {
	test("Getting the ids of a language given its locale", () => {
		expect(getFlag("nl-nl")).toStrictEqual({
			emoji: "🇳🇱",
			flagColors: [
				{ base10: 13_111_342, cmyk: [0, 100, 80, 5], hex: "#C8102E", rgb: [200, 16, 46] },
				{ base10: 16_777_215, cmyk: [0, 0, 0, 0], hex: "#FFFFFF", rgb: [255, 255, 255] },
				{ base10: 15_781, cmyk: [100, 76, 0, 9], hex: "#003DA5", rgb: [0, 61, 165] },
			],
			image: "https://crowdin.com/images/flags/nl.png",
			primaryColor: { base10: 16_731_904, cmyk: [0, 69, 100, 0], hex: "#FF4F00", rgb: [255, 79, 0] },
		});
	});

	test("Getting the ids of a language given its ISO codes", () => {
		expect(getFlag("pt")).toStrictEqual({
			emoji: "🇵🇹",
			flagColors: [
				{ base10: 289_336, cmyk: [85, 3, 91, 44], hex: "#046A38", rgb: [4, 106, 56] },
				{ base10: 14_297_372, cmyk: [0, 95, 100, 0], hex: "#DA291C", rgb: [218, 41, 28] },
				{ base10: 16_771_328, cmyk: [0, 3, 97, 0], hex: "#FFE900", rgb: [255, 233, 0] },
				{ base10: 11_634, cmyk: [100, 79, 0, 37], hex: "#002D72", rgb: [0, 45, 114] },
				{ base10: 16_777_215, cmyk: [0, 0, 0, 0], hex: "#FFFFFF", rgb: [255, 255, 255] },
				{ base10: 0, cmyk: [0, 0, 0, 100], hex: "#000000", rgb: [0, 0, 0] },
			],
			image: "https://crowdin.com/images/flags/pt-PT.png",
			primaryColor: { base10: 16_711_680, cmyk: [0, 100, 100, 0], hex: "#FF0000", rgb: [255, 0, 0] },
		});
		expect(getFlag("nld")).toStrictEqual({
			emoji: "🇳🇱",
			flagColors: [
				{ base10: 13_111_342, cmyk: [0, 100, 80, 5], hex: "#C8102E", rgb: [200, 16, 46] },
				{ base10: 16_777_215, cmyk: [0, 0, 0, 0], hex: "#FFFFFF", rgb: [255, 255, 255] },
				{ base10: 15_781, cmyk: [100, 76, 0, 9], hex: "#003DA5", rgb: [0, 61, 165] },
			],
			image: "https://crowdin.com/images/flags/nl.png",
			primaryColor: { base10: 16_731_904, cmyk: [0, 69, 100, 0], hex: "#FF4F00", rgb: [255, 79, 0] },
		});
		expect(getFlag("afb")).toStrictEqual({
			emoji: "🇧🇭",
			flagColors: [
				{ base10: 13_504_806, cmyk: [0, 95, 100, 0], hex: "#CE1126", rgb: [206, 17, 38] },
				{ base10: 16_777_215, cmyk: [0, 0, 0, 0], hex: "#FFFFFF", rgb: [255, 255, 255] },
			],
			image: "https://crowdin.com/images/flags/ar-BH.png",
			primaryColor: { base10: 15_865_649, cmyk: [0, 91, 80, 5], hex: "#F21731", rgb: [242, 23, 49] },
		});
	});

	test("Getting the ids of a language given its name", () => {
		expect(getFlag("english")).toStrictEqual({
			emoji: "🇺🇸",
			flagColors: [
				{ base10: 11_737_410, cmyk: [0, 100, 66, 13], hex: "#B31942", rgb: [179, 25, 66] },
				{ base10: 16_777_215, cmyk: [0, 0, 0, 0], hex: "#FFFFFF", rgb: [255, 255, 255] },
				{ base10: 668_001, cmyk: [100, 68, 0, 54], hex: "#0A3161", rgb: [10, 49, 97] },
			],
			image: "https://crowdin.com/images/flags/en.png",
			primaryColor: { base10: 668_001, cmyk: [90, 49, 0, 62], hex: "#0A3161", rgb: [10, 49, 97] },
		});
	});
});
