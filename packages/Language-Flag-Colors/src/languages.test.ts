import got from "got";
import { describe, expect, test } from "vitest";

import findLanguage from "./functions/findLanguage.js";
import languages from "./languages.js";

describe("Languages array", () => {
	test("Expect languages to be an array with length", () => {
		expect(languages).toBeInstanceOf(Array);
		expect(languages[0]).toBeInstanceOf(Object);
		expect(languages.length).toBeTruthy();
	});

	test("Too have all Crowdin languages", async () => {
		const crowdinLanguages = await getAllPages();

		let shouldFail = false;
		for (const language of crowdinLanguages) {
			if (!findLanguage(language.data.locale)) {
				// eslint-disable-next-line no-console
				console.log(`Missing language: ${language.data.locale}`);
				shouldFail = true;
			}
		}

		expect(shouldFail).toBeFalsy();
		expect(languages.length).toBe(crowdinLanguages.length);
	});
});

async function getAllPages(offset = 0): Promise<Datum[]> {
	const result = await got.get(`https://api.crowdin.com/api/v2/languages?limit=500&offset=${offset}`).json<RootObject>();
	return result.data.length === 500 ? [...result.data, ...(await getAllPages(offset + 500))] : result.data;
}

interface RootObject {
	data: Datum[];
}

interface Datum {
	data: Data;
}

interface Data {
	id: string;
	name: string;
	editorCode: string;
	twoLettersCode: string;
	threeLettersCode: string;
	locale: string;
	androidCode: string;
	osxCode: string;
	osxLocale: string;
	pluralCategoryNames: string[];
	pluralRules: string;
	pluralExamples: string[];
	textDirection: string;
	dialectOf?: string;
}
