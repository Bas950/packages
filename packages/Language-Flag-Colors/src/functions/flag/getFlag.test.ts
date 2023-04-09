import { describe, expect, test } from "vitest";

import { getFlag } from "./getFlag.js";

describe("getIds()", () => {
	test("Getting the ids of a language given its locale", () => {
		expect(getFlag("nl-nl")).toStrictEqual({
			image: "https://crowdin.com/images/flags/nl.png",
			emoji: "🇳🇱",
			primaryColor: { hex: "#FF4F00", rgb: [255, 79, 0], cmyk: [0, 69, 100, 0], base10: 16_731_904 },
			flagColors: [
				{ hex: "#C8102E", rgb: [200, 16, 46], cmyk: [0, 100, 80, 5], base10: 13_111_342 },
				{ hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16_777_215 },
				{ hex: "#003DA5", rgb: [0, 61, 165], cmyk: [100, 76, 0, 9], base10: 15_781 },
			],
		});
	});

	test("Getting the ids of a language given its ISO codes", () => {
		expect(getFlag("pt")).toStrictEqual({
			image: "https://crowdin.com/images/flags/pt-PT.png",
			emoji: "🇵🇹",
			primaryColor: { hex: "#FF0000", rgb: [255, 0, 0], cmyk: [0, 100, 100, 0], base10: 16_711_680 },
			flagColors: [
				{ hex: "#046A38", rgb: [4, 106, 56], cmyk: [85, 3, 91, 44], base10: 289_336 },
				{ hex: "#DA291C", rgb: [218, 41, 28], cmyk: [0, 95, 100, 0], base10: 14_297_372 },
				{ hex: "#FFE900", rgb: [255, 233, 0], cmyk: [0, 3, 97, 0], base10: 16_771_328 },
				{ hex: "#002D72", rgb: [0, 45, 114], cmyk: [100, 79, 0, 37], base10: 11_634 },
				{ hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16_777_215 },
				{ hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
			],
		});
		expect(getFlag("nld")).toStrictEqual({
			image: "https://crowdin.com/images/flags/nl.png",
			emoji: "🇳🇱",
			primaryColor: { hex: "#FF4F00", rgb: [255, 79, 0], cmyk: [0, 69, 100, 0], base10: 16_731_904 },
			flagColors: [
				{ hex: "#C8102E", rgb: [200, 16, 46], cmyk: [0, 100, 80, 5], base10: 13_111_342 },
				{ hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16_777_215 },
				{ hex: "#003DA5", rgb: [0, 61, 165], cmyk: [100, 76, 0, 9], base10: 15_781 },
			],
		});
		expect(getFlag("afb")).toStrictEqual({
			image: "https://crowdin.com/images/flags/ar-BH.png",
			emoji: "🇧🇭",
			primaryColor: { hex: "#F21731", rgb: [242, 23, 49], cmyk: [0, 91, 80, 5], base10: 15_865_649 },
			flagColors: [
				{ hex: "#CE1126", rgb: [206, 17, 38], cmyk: [0, 95, 100, 0], base10: 13_504_806 },
				{ hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16_777_215 },
			],
		});
	});

	test("Getting the ids of a language given its name", () => {
		expect(getFlag("english")).toStrictEqual({
			image: "https://crowdin.com/images/flags/en.png",
			emoji: "🇺🇸",
			primaryColor: { hex: "#0A3161", rgb: [10, 49, 97], cmyk: [90, 49, 0, 62], base10: 668_001 },
			flagColors: [
				{ hex: "#B31942", rgb: [179, 25, 66], cmyk: [0, 100, 66, 13], base10: 11_737_410 },
				{ hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16_777_215 },
				{ hex: "#0A3161", rgb: [10, 49, 97], cmyk: [100, 68, 0, 54], base10: 668_001 },
			],
		});
	});
});
