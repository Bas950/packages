/* eslint-disable unicorn/filename-case */
import { describe, expect, test } from "vitest";

// eslint-disable-next-line camelcase
import { getISO_639_1 } from "./getISO_639_1.js";

describe("getISO_639_1()", () => {
	test("Getting the ISO 639-1 code of a language given its locale", () => {
		expect(getISO_639_1("nl-nl")).toStrictEqual("nl");
	});

	test("Getting the ISO 639-1 code of a language given its ISO codes", () => {
		expect(getISO_639_1("pt")).toStrictEqual("pt");
		expect(getISO_639_1("nld")).toStrictEqual("nl");
		expect(getISO_639_1("afb")).toStrictEqual("ar");
	});

	test("Getting the ISO 639-1 code of a language given its name", () => {
		expect(getISO_639_1("english")).toStrictEqual("en");
	});

	test("An invalid language returns undefined", () => {
		expect(getISO_639_1("invalid")).toBeUndefined();
	});

	test("A language with no ISO 639-1 code returns null", () => {
		expect(getISO_639_1("lolcat")).toBeNull();
	});
});
