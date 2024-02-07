import { describe, expect, test } from "vitest";

import { getIds } from "./getIds.js";

describe("getIds()", () => {
	test("Getting the ids of a language given its locale", () => {
		expect(getIds("nl-nl")).toStrictEqual({
			ISO_639_1: "nl",
			ISO_639_2: "nld",
			ISO_639_3: "nld",
			androidCode: "nl-rNL",
			glottolog: "mode1257",
			locale: "nl-NL",
			osxCode: "nl.lproj",
			osxLocale: "nl",
		});
	});

	test("Getting the ids of a language given its ISO codes", () => {
		expect(getIds("pt")).toStrictEqual({
			ISO_639_1: "pt",
			ISO_639_2: "por",
			ISO_639_3: "por",
			androidCode: "pt-rPT",
			glottolog: "port1283",
			locale: "pt-PT",
			osxCode: "pt.lproj",
			osxLocale: "pt",
		});
		expect(getIds("nld")).toStrictEqual({
			ISO_639_1: "nl",
			ISO_639_2: "nld",
			ISO_639_3: "nld",
			androidCode: "nl-rNL",
			glottolog: "mode1257",
			locale: "nl-NL",
			osxCode: "nl.lproj",
			osxLocale: "nl",
		});
		expect(getIds("afb")).toStrictEqual({
			ISO_639_1: "ar",
			ISO_639_2: "ara",
			ISO_639_3: "afb",
			androidCode: "ar-rBH",
			glottolog: "gulf1241",
			locale: "ar-BH",
			osxCode: "ar-BH.lproj",
			osxLocale: "ar_BH",
		});
	});

	test("Getting the ids of a language given its name", () => {
		expect(getIds("english")).toStrictEqual({
			ISO_639_1: "en",
			ISO_639_2: "eng",
			ISO_639_3: "eng",
			androidCode: "en-rUS",
			glottolog: "stan1293",
			locale: "en",
			osxCode: "en.lproj",
			osxLocale: "en",
		});
	});
});
