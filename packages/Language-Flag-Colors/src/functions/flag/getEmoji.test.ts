import { describe, expect, test } from "vitest";

import { getEmoji } from "./getEmoji.js";

describe("getEmoji()", () => {
	test("Getting the emoji of a language given its country", () => {
		expect(getEmoji("netherlands")).toStrictEqual("🇳🇱");
	});

	test("Getting the emoji of a language given its country code", () => {
		expect(getEmoji("nl")).toStrictEqual("🇳🇱");
	});

	test("Getting the emoji of a language given its locale", () => {
		expect(getEmoji("nl-nl")).toStrictEqual("🇳🇱");
	});

	test("Getting the emoji of a language given its ISO codes", () => {
		expect(getEmoji("pt")).toStrictEqual("🇵🇹");
		expect(getEmoji("nld")).toStrictEqual("🇳🇱");
		expect(getEmoji("afb")).toStrictEqual("🇧🇭");
	});

	test("Getting the emoji of a language given its name", () => {
		expect(getEmoji("english")).toStrictEqual("🇺🇸");
	});

	test("An invalid language returns undefined", () => {
		expect(getEmoji("invalid")).toBeUndefined();
	});

	test("A language with no emoji returns null", () => {
		expect(getEmoji("lolcat")).toBeNull();
	});
});
