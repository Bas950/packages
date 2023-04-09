import { describe, expect, test } from "vitest";

import { getPrimaryBase10 } from "./getPrimaryBase10.js";

describe("getPrimaryBase10()", () => {
	test("Getting the primary base-10 color of a language given its locale", () => {
		expect(getPrimaryBase10("nl-nl")).toStrictEqual(16_731_904);
	});

	test("Getting the primary base-10 color of a language given its ISO codes", () => {
		expect(getPrimaryBase10("pt")).toStrictEqual(16_711_680);
		expect(getPrimaryBase10("nld")).toStrictEqual(16_731_904);
		expect(getPrimaryBase10("afb")).toStrictEqual(15_865_649);
	});

	test("Getting the primary base-10 color of a language given its name", () => {
		expect(getPrimaryBase10("english")).toStrictEqual(668_001);
	});
});
