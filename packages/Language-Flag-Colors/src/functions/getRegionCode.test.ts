import { describe, expect, test } from "vitest";

import { getRegionCode } from "./getRegionCode.js";

describe("getRegion()", () => {
	test("Getting the region code of a language given its locale", () => {
		expect(getRegionCode("sco-GB")).toStrictEqual("sct");
	});

	test("Getting the region code of a language given its ISO codes", () => {
		expect(getRegionCode("gd")).toStrictEqual("sct");
		expect(getRegionCode("sco")).toStrictEqual("sct");
		expect(getRegionCode("ckb")).toStrictEqual("ku");
	});

	test("Getting the region code of a language given its name", () => {
		expect(getRegionCode("scottish")).toStrictEqual("sct");
	});

	test("An invalid language returns undefined", () => {
		expect(getRegionCode("invalid")).toBeUndefined();
	});

	test("A language with no region code returns null", () => {
		expect(getRegionCode("lolcat")).toBeNull();
	});
});
