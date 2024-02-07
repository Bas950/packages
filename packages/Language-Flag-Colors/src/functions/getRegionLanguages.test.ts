import { describe, expect, test } from "vitest";

import { getRegionLanguages } from "../index.js";

describe("getRegionLanguges()", () => {
	const langs = [
		{
			country: "United Kingdom",
			countryCode: "gb",
			direction: "ltr",
			flag: {
				emoji: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
				flagColors: [
					{ base10: 24_248, cmyk: [100, 56, 0, 3], hex: "#005EB8", rgb: [0, 94, 184] },
					{ base10: 16_777_215, cmyk: [0, 0, 0, 0], hex: "#FFFFFF", rgb: [255, 255, 255] },
				],
				image: "https://crowdin.com/images/flags/sco.png",
				primaryColor: { base10: 24_248, cmyk: [100, 49, 0, 28], hex: "#005EB8", rgb: [0, 94, 184] },
			},
			ids: {
				ISO_639_2: "sco",
				ISO_639_3: "sco",
				androidCode: "sco-rGB",
				glottolog: "scot1243",
				locale: "sco-GB",
				osxCode: "sco.lproj",
				osxLocale: "sco",
			},
			name: "Scots",
			nativeName: "Scoats leid",
			region: "Scotland",
			regionCode: "sct",
		},
		{
			country: "United Kingdom",
			countryCode: "gb",
			direction: "ltr",
			flag: {
				emoji: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
				flagColors: [
					{ base10: 24_248, cmyk: [100, 56, 0, 3], hex: "#005EB8", rgb: [0, 94, 184] },
					{ base10: 16_777_215, cmyk: [0, 0, 0, 0], hex: "#FFFFFF", rgb: [255, 255, 255] },
				],
				image: "https://crowdin.com/images/flags/gd.png",
				primaryColor: { base10: 24_248, cmyk: [100, 49, 0, 28], hex: "#005EB8", rgb: [0, 94, 184] },
			},
			ids: {
				ISO_639_1: "gd",
				ISO_639_2: "gla",
				ISO_639_3: "gla",
				androidCode: "gd-rGB",
				glottolog: "scot1245",
				locale: "gd-GB",
				osxCode: "gd.lproj",
				osxLocale: "gd",
			},
			name: "Scottish Gaelic",
			nativeName: "Gàidhlig",
			region: "Scotland",
			regionCode: "sct",
		},
	];

	test("Getting all the languages specific to a region given its name", () => {
		expect(getRegionLanguages("scotland")).toStrictEqual(langs);
	});

	test("Getting all the languages specific to a region given its code", () => {
		expect(getRegionLanguages("sct")).toStrictEqual(langs);
	});

	test("An invalid language returns undefined", () => {
		expect(getRegionLanguages("invalid")).toBeUndefined();
	});
});
