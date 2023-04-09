import { describe, expect, it } from "vitest";

import { Badge } from "./Badge.js";

describe("Badge", () => {
	it("should generate a badge", () => {
		const badge1 = new Badge({
			label: "test label",
			style: "flat",
			uncoveredText: "uncovered",
			color: {
				"<80": "critical",
				"<90": "important",
				">=90": "success",
				uncovered: "informational",
			},
		});

		expect(badge1.generateBadge(60, "$test-url$")).toBe("https://img.shields.io/badge/test%20label-60%25-critical.svg?placeholder=$test-url$&style=flat");
		expect(badge1.generateBadge(80.18, "$test-url$")).toBe(
			"https://img.shields.io/badge/test%20label-80.18%25-important.svg?placeholder=$test-url$&style=flat"
		);
		expect(badge1.generateBadge(85, "$test-url$")).toBe("https://img.shields.io/badge/test%20label-85%25-important.svg?placeholder=$test-url$&style=flat");
		expect(badge1.generateBadge(95, "$test-url$")).toBe("https://img.shields.io/badge/test%20label-95%25-success.svg?placeholder=$test-url$&style=flat");
		expect(badge1.generateBadge(-1, "$test-url$")).toBe(
			"https://img.shields.io/badge/test%20label-uncovered-informational.svg?placeholder=$test-url$&style=flat"
		);
	});

	it("should generate a badge with a logo", () => {
		const badge2 = new Badge({
			label: "test label",
			style: "flat",
			uncoveredText: "uncovered",
			color: {
				"<80": "critical",
				"<90": "important",
				">=90": "success",
				uncovered: "informational",
			},
			logo: "vitest",
		});

		expect(badge2.generateBadge(60, "$test-url$")).toBe(
			"https://img.shields.io/badge/test%20label-60%25-critical.svg?placeholder=$test-url$&logo=vitest&style=flat"
		);
		expect(badge2.generateBadge(85, "$test-url$")).toBe(
			"https://img.shields.io/badge/test%20label-85%25-important.svg?placeholder=$test-url$&logo=vitest&style=flat"
		);
		expect(badge2.generateBadge(95, "$test-url$")).toBe(
			"https://img.shields.io/badge/test%20label-95%25-success.svg?placeholder=$test-url$&logo=vitest&style=flat"
		);
		expect(badge2.generateBadge(-1, "$test-url$")).toBe(
			"https://img.shields.io/badge/test%20label-uncovered-informational.svg?placeholder=$test-url$&logo=vitest&style=flat"
		);
		// Should never happen, but this is to test the fallback, and to get 100% coverage
		expect(badge2.generateBadge(-1, "test-url")).toBe(
			"https://img.shields.io/badge/test%20label-uncovered-informational.svg?placeholder=$test-url&logo=vitest&style=flat"
		);
	});

	it("should work with all operators in the color object", () => {
		// test < operator
		const badge3 = new Badge({
			label: "test label",
			style: "flat",
			uncoveredText: "uncovered",
			color: {
				"<80": "critical",
				uncovered: "success",
			},
		});

		expect(badge3.generateBadge(60, "$test-url$")).toBe("https://img.shields.io/badge/test%20label-60%25-critical.svg?placeholder=$test-url$&style=flat");
		expect(badge3.generateBadge(85, "$test-url$")).toBe("https://img.shields.io/badge/test%20label-85%25-success.svg?placeholder=$test-url$&style=flat");

		// test <= operator
		const badge4 = new Badge({
			label: "test label",
			style: "flat",
			uncoveredText: "uncovered",
			color: {
				"<=80": "critical",
				uncovered: "success",
			},
		});

		expect(badge4.generateBadge(60, "$test-url$")).toBe("https://img.shields.io/badge/test%20label-60%25-critical.svg?placeholder=$test-url$&style=flat");
		expect(badge4.generateBadge(80, "$test-url$")).toBe("https://img.shields.io/badge/test%20label-80%25-critical.svg?placeholder=$test-url$&style=flat");
		expect(badge4.generateBadge(85, "$test-url$")).toBe("https://img.shields.io/badge/test%20label-85%25-success.svg?placeholder=$test-url$&style=flat");

		// test > operator
		const badge5 = new Badge({
			label: "test label",
			style: "flat",
			uncoveredText: "uncovered",
			color: {
				">80": "critical",
				uncovered: "success",
			},
		});

		expect(badge5.generateBadge(60, "$test-url$")).toBe("https://img.shields.io/badge/test%20label-60%25-success.svg?placeholder=$test-url$&style=flat");
		expect(badge5.generateBadge(85, "$test-url$")).toBe("https://img.shields.io/badge/test%20label-85%25-critical.svg?placeholder=$test-url$&style=flat");

		// test >= operator
		const badge6 = new Badge({
			label: "test label",
			style: "flat",
			uncoveredText: "uncovered",
			color: {
				">=80": "critical",
				uncovered: "success",
			},
		});

		expect(badge6.generateBadge(60, "$test-url$")).toBe("https://img.shields.io/badge/test%20label-60%25-success.svg?placeholder=$test-url$&style=flat");
		expect(badge6.generateBadge(80, "$test-url$")).toBe("https://img.shields.io/badge/test%20label-80%25-critical.svg?placeholder=$test-url$&style=flat");
		expect(badge6.generateBadge(85, "$test-url$")).toBe("https://img.shields.io/badge/test%20label-85%25-critical.svg?placeholder=$test-url$&style=flat");

		// test == operator
		const badge7 = new Badge({
			label: "test label",
			style: "flat",
			uncoveredText: "uncovered",
			color: {
				"==80": "critical",
				uncovered: "success",
			},
		});

		expect(badge7.generateBadge(60, "$test-url$")).toBe("https://img.shields.io/badge/test%20label-60%25-success.svg?placeholder=$test-url$&style=flat");
		expect(badge7.generateBadge(80, "$test-url$")).toBe("https://img.shields.io/badge/test%20label-80%25-critical.svg?placeholder=$test-url$&style=flat");
		expect(badge7.generateBadge(85, "$test-url$")).toBe("https://img.shields.io/badge/test%20label-85%25-success.svg?placeholder=$test-url$&style=flat");

		// test != operator
		const badge8 = new Badge({
			label: "test label",
			style: "flat",
			uncoveredText: "uncovered",
			color: {
				"!=80": "critical",
				uncovered: "success",
			},
		});

		expect(badge8.generateBadge(60, "$test-url$")).toBe("https://img.shields.io/badge/test%20label-60%25-critical.svg?placeholder=$test-url$&style=flat");
		expect(badge8.generateBadge(80, "$test-url$")).toBe("https://img.shields.io/badge/test%20label-80%25-success.svg?placeholder=$test-url$&style=flat");
		expect(badge8.generateBadge(85, "$test-url$")).toBe("https://img.shields.io/badge/test%20label-85%25-critical.svg?placeholder=$test-url$&style=flat");
	});
});
