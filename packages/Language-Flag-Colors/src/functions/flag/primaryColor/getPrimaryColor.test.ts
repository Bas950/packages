import { describe, expect, test } from "vitest";

import { getPrimaryColor } from "./getPrimaryColor.js";

describe("getPrimaryColor()", () => {
	test("Getting the primary color of a language given its locale", () => {
		expect(getPrimaryColor("nl-nl")).toStrictEqual({ base10: 16_731_904, cmyk: [0, 69, 100, 0], hex: "#FF4F00", rgb: [255, 79, 0] });
	});

	test("Getting the primary color of a language given its ISO codes", () => {
		expect(getPrimaryColor("pt")).toStrictEqual({ base10: 16_711_680, cmyk: [0, 100, 100, 0], hex: "#FF0000", rgb: [255, 0, 0] });
		expect(getPrimaryColor("nld")).toStrictEqual({ base10: 16_731_904, cmyk: [0, 69, 100, 0], hex: "#FF4F00", rgb: [255, 79, 0] });
		expect(getPrimaryColor("afb")).toStrictEqual({ base10: 15_865_649, cmyk: [0, 91, 80, 5], hex: "#F21731", rgb: [242, 23, 49] });
	});

	test("Getting the primary color of a language given its name", () => {
		expect(getPrimaryColor("english")).toStrictEqual({ base10: 668_001, cmyk: [90, 49, 0, 62], hex: "#0A3161", rgb: [10, 49, 97] });
	});
});
