import { describe, expect, test } from "vitest";

import { getLanguage } from "./getLanguage.js";

const NL = {
		country: "Netherlands",
		countryCode: "nl",
		direction: "ltr",
		flag: {
			emoji: "🇳🇱",
			flagColors: [
				{ base10: 13_111_342, cmyk: [0, 100, 80, 5], hex: "#C8102E", rgb: [200, 16, 46] },
				{ base10: 16_777_215, cmyk: [0, 0, 0, 0], hex: "#FFFFFF", rgb: [255, 255, 255] },
				{ base10: 15_781, cmyk: [100, 76, 0, 9], hex: "#003DA5", rgb: [0, 61, 165] },
			],
			image: "https://crowdin.com/images/flags/nl.png",
			primaryColor: { base10: 16_731_904, cmyk: [0, 69, 100, 0], hex: "#FF4F00", rgb: [255, 79, 0] },
		},
		ids: {
			ISO_639_1: "nl",
			ISO_639_2: "nld",
			ISO_639_3: "nld",
			androidCode: "nl-rNL",
			glottolog: "mode1257",
			locale: "nl-NL",
			osxCode: "nl.lproj",
			osxLocale: "nl",
		},
		name: "Dutch",
		nativeName: "Nederlands",
	},
	PT = {
		country: "Portugal",
		countryCode: "pt",
		direction: "ltr",
		flag: {
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
		},
		ids: {
			ISO_639_1: "pt",
			ISO_639_2: "por",
			ISO_639_3: "por",
			androidCode: "pt-rPT",
			glottolog: "port1283",
			locale: "pt-PT",
			osxCode: "pt.lproj",
			osxLocale: "pt",
		},
		name: "Portuguese",
		nativeName: "Português",
	},
	BH = {
		country: "Bahrain",
		countryCode: "bh",
		direction: "rtl",
		flag: {
			emoji: "🇧🇭",
			flagColors: [
				{ base10: 13_504_806, cmyk: [0, 95, 100, 0], hex: "#CE1126", rgb: [206, 17, 38] },
				{ base10: 16_777_215, cmyk: [0, 0, 0, 0], hex: "#FFFFFF", rgb: [255, 255, 255] },
			],
			image: "https://crowdin.com/images/flags/ar-BH.png",
			primaryColor: { base10: 15_865_649, cmyk: [0, 91, 80, 5], hex: "#F21731", rgb: [242, 23, 49] },
		},
		ids: {
			ISO_639_1: "ar",
			ISO_639_2: "ara",
			ISO_639_3: "afb",
			androidCode: "ar-rBH",
			glottolog: "gulf1241",
			locale: "ar-BH",
			osxCode: "ar-BH.lproj",
			osxLocale: "ar_BH",
		},
		name: "Arabic, Bahrain",
		nativeName: "اللهجة البحرينية",
	},
	EN = {
		country: "United States",
		countryCode: "us",
		direction: "ltr",
		flag: {
			emoji: "🇺🇸",
			flagColors: [
				{ base10: 11_737_410, cmyk: [0, 100, 66, 13], hex: "#B31942", rgb: [179, 25, 66] },
				{ base10: 16_777_215, cmyk: [0, 0, 0, 0], hex: "#FFFFFF", rgb: [255, 255, 255] },
				{ base10: 668_001, cmyk: [100, 68, 0, 54], hex: "#0A3161", rgb: [10, 49, 97] },
			],
			image: "https://crowdin.com/images/flags/en.png",
			primaryColor: { base10: 668_001, cmyk: [90, 49, 0, 62], hex: "#0A3161", rgb: [10, 49, 97] },
		},
		ids: {
			ISO_639_1: "en",
			ISO_639_2: "eng",
			ISO_639_3: "eng",
			androidCode: "en-rUS",
			glottolog: "stan1293",
			locale: "en",
			osxCode: "en.lproj",
			osxLocale: "en",
		},
		name: "English",
		nativeName: "English",
	};

describe("getLanguage()", () => {
	test("Getting the language of a language given its locale", () => {
		expect(getLanguage("nl-nl")).toStrictEqual(NL);
	});

	test("Getting the language of a language given its ISO codes", () => {
		expect(getLanguage("pt")).toStrictEqual(PT);
		expect(getLanguage("nld")).toStrictEqual(NL);
		expect(getLanguage("afb")).toStrictEqual(BH);
	});

	test("Getting the language of a language given its name", () => {
		expect(getLanguage("english")).toStrictEqual(EN);
	});
});

describe("getLanguage(array)", () => {
	test("Getting the language of a language given its locale", () => {
		expect(getLanguage(["nl-nl"])).toStrictEqual([NL]);
	});

	test("Getting the language of a language given its ISO codes", () => {
		expect(getLanguage(["pt", "nld", "afb"])).toStrictEqual([PT, NL, BH]);
	});

	test("Getting the language of a language given its name", () => {
		expect(getLanguage(["english"])).toStrictEqual([EN]);
	});
});
