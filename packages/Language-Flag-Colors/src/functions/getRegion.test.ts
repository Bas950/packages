import { describe, expect, test } from "vitest";

import { getRegion } from "./getRegion.js";

describe("getRegion()", () => {
	test("Getting the region of a language given its locale", () => {
		expect(getRegion("sco-GB")).toStrictEqual("Scotland");
	});

	test("Getting the region of a language given its ISO codes", () => {
		expect(getRegion("gd")).toStrictEqual("Scotland");
		expect(getRegion("sco")).toStrictEqual("Scotland");
		expect(getRegion("ckb")).toStrictEqual("Kurdistan");
	});

	test("Getting the region of a language given its name", () => {
		expect(getRegion("scottish")).toStrictEqual("Scotland");
	});

	test("An invalid language returns undefined", () => {
		expect(getRegion("invalid")).toBeUndefined();
	});

	test("A language with no region returns null", () => {
		expect(getRegion("lolcat")).toBeNull();
	});
});
