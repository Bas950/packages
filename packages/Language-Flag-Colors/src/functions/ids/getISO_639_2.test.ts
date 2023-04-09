/* eslint-disable unicorn/filename-case */
import { describe, expect, test } from "vitest";

// eslint-disable-next-line camelcase
import { getISO_639_2 } from "./getISO_639_2.js";

describe("getISO_639_2()", () => {
	test("Getting the ISO 639-2 code of a language given its locale", () => {
		expect(getISO_639_2("nl-nl")).toStrictEqual("nld");
	});

	test("Getting the ISO 639-2 code of a language given its ISO codes", () => {
		expect(getISO_639_2("pt")).toStrictEqual("por");
		expect(getISO_639_2("nld")).toStrictEqual("nld");
		expect(getISO_639_2("afb")).toStrictEqual("ara");
	});

	test("Getting the ISO 639-2 code of a language given its name", () => {
		expect(getISO_639_2("english")).toStrictEqual("eng");
	});

	test("An invalid language returns undefined", () => {
		expect(getISO_639_2("invalid")).toBeUndefined();
	});

	test("A language with no ISO 639-2 code returns null", () => {
		expect(getISO_639_2("lolcat")).toBeNull();
	});
});
