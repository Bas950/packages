import { writeFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { beforeAll, describe, expect, test, vitest } from "vitest";

import { activeConfig } from "../index.js";
import { DEFAULT_CONFIG } from "../util/constants.js";
import { directoryName } from "../util/directoryName.js";
import {
	EXPECTED_BADGES_PER_FILE,
	EXPECTED_BADGES_PER_FILE_WITH_NEW_BADGES,
	EXPECTED_BADGES_PER_FILE_WITH_NEW_BADGES2,
	EXPECTED_PARSE_COVERAGE_DATA,
} from "./__mocks__/expectedData.js";
import { BadgeGenerator } from "./BadgeGenerator.js";

beforeAll(async () => {
	// Read coverage-summary-template.json file
	const coverageSummaryTemplate = await readFile(join(directoryName, "src", "classes", "__mocks__", "coverage", "coverage-summary-template.json"), "utf8"),
		// Parse coverage-summary-template.json file
		coverageSummaryTemplateParsed = JSON.parse(coverageSummaryTemplate),
		// Create a new object to store the new data
		coverageSummaryTemplateParsedNew = {};
	// Go through each key in the coverageSummaryTemplateParsed object and see if it has "\\"
	for (const key in coverageSummaryTemplateParsed) {
		if (key.includes("\\")) {
			const data = coverageSummaryTemplateParsed[key],
				// Split the key by the "\\" and then join it with directoryName
				newKey = join(directoryName, ...key.split("\\"));
			coverageSummaryTemplateParsedNew[newKey] = data;
		} else coverageSummaryTemplateParsedNew[key] = coverageSummaryTemplateParsed[key];
	}

	// Write the new data to the coverage-summary.json file
	writeFileSync(
		join(directoryName, "src", "classes", "__mocks__", "coverage", "coverage-summary.json"),
		JSON.stringify(coverageSummaryTemplateParsedNew, undefined, 2)
	);
});

describe("BadgeGenerator", () => {
	vitest.mock("chalk", () => {
		return {
			default: {
				blue: vitest.fn(text => `<blue>${text}`),
				red: vitest.fn(text => `<red>${text}`),
				yellow: vitest.fn(text => `<yellow>${text}`),
			},
		};
	});

	vitest.mock("fs/promises", async () => {
		const actual: Record<string, any> = await vitest.importActual("fs/promises");
		return {
			...actual,
			writeFile: vitest.fn().mockImplementation(() => Promise.resolve()),
		};
	});

	test("findCoverageFiles()", async () => {
		activeConfig.config = DEFAULT_CONFIG;

		const badgeGenerator = new BadgeGenerator(),
			spy = vitest.spyOn(global.console, "log"),
			processExitSpy = vitest.spyOn(process, "exit").mockImplementation(number => {
				throw new Error(`process.exit: ${number}`);
			});

		await expect(badgeGenerator.findCoverageFiles()).resolves.not.toThrowError();
		expect(badgeGenerator.coverageFileLocations).toEqual([join("src", "classes", "__mocks__", "coverage", "coverage-summary.json")]);

		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith("<blue>[INFO] Found 1 coverage files.");

		// Set coverageFiles to a non-existent file
		activeConfig.config = {
			silent: false,
			coverageFiles: "**/coverage-fake.json",
			mdFiles: {},
		};

		spy.mockClear();

		await expect(badgeGenerator.findCoverageFiles()).resolves.not.toThrowError();
		expect(badgeGenerator.coverageFileLocations).toStrictEqual([]);

		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith("<yellow>[WARN] No coverage files found!");
		spy.mockRestore();

		expect(processExitSpy).toHaveBeenCalledTimes(0);
		processExitSpy.mockRestore();
	});

	test("parseCoverageFiles()", async () => {
		activeConfig.config = DEFAULT_CONFIG;

		const badgeGenerator = new BadgeGenerator(),
			spy = vitest.spyOn(global.console, "log"),
			processExitSpy = vitest.spyOn(process, "exit").mockImplementation(number => {
				throw new Error(`process.exit: ${number}`);
			});

		badgeGenerator.coverageFileLocations = [join("src", "classes", "__mocks__", "coverage", "coverage-summary.json")];

		await expect(badgeGenerator.parseCoverageFiles()).resolves.not.toThrowError();
		expect(badgeGenerator.coverageFiles).toStrictEqual(EXPECTED_PARSE_COVERAGE_DATA);

		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith("<blue>[INFO] Parsed 1 coverage files.");

		// Set coverageFiles to a non-existent file, and reset coverageFileLocations & coverageFiles
		activeConfig.config = {
			silent: false,
			coverageFiles: "**/coverage-fake.json",
			mdFiles: {},
		};
		badgeGenerator.coverageFileLocations = [];
		badgeGenerator.coverageFiles = {};

		spy.mockClear();

		await expect(badgeGenerator.parseCoverageFiles()).resolves.not.toThrowError();
		expect(badgeGenerator.coverageFiles).toStrictEqual({});

		expect(spy).toHaveBeenCalledTimes(0);

		// Reset coverageFiles, and set coverageFileLocations to a non-existent file
		badgeGenerator.coverageFileLocations = [join("src", "classes", "__mocks__", "coverage-fake", "coverage-summary.json")];
		badgeGenerator.coverageFiles = {};

		spy.mockClear();

		await expect(badgeGenerator.parseCoverageFiles()).resolves.not.toThrowError();
		expect(badgeGenerator.coverageFiles).toStrictEqual({});
		expect(spy).toHaveBeenCalledTimes(3);
		expect(spy).toHaveBeenCalledWith(`<red>[ERROR] Could not parse ${join("src", "classes", "__mocks__", "coverage-fake", "coverage-summary.json")} as JSON!`);
		expect((spy.mock.calls?.[1]?.[0] as string | undefined)?.startsWith("<red>[ERROR] message: ENOENT: no such file or directory, open")).toBe(true);
		expect(spy).toHaveBeenCalledWith("<blue>[INFO] Parsed 0 coverage files.");

		// Reset coverageFiles, and set coverageFileLocations to an invalid file
		badgeGenerator.coverageFileLocations = [join("src", "classes", "__mocks__", "coverage", "invalid-summary.json")];
		badgeGenerator.coverageFiles = {};

		spy.mockClear();

		await expect(badgeGenerator.parseCoverageFiles()).resolves.not.toThrowError();
		expect(badgeGenerator.coverageFiles).toStrictEqual({});
		expect(spy).toHaveBeenCalledTimes(3);
		expect(spy).toHaveBeenCalledWith(
			`<red>[ERROR] Could not parse ${join("src", "classes", "__mocks__", "coverage", "invalid-summary.json")} as a valid coverage file!`
		);
		expect(spy).toHaveBeenCalledWith("<red>[ERROR] message: Required");
		expect(spy).toHaveBeenCalledWith("<blue>[INFO] Parsed 0 coverage files.");

		spy.mockRestore();

		expect(processExitSpy).toHaveBeenCalledTimes(0);
		processExitSpy.mockRestore();
	});

	test("findFiles()", async () => {
		activeConfig.config = DEFAULT_CONFIG;
		activeConfig.config.mdFiles = {
			"**/__mocks__/**/*.md": DEFAULT_CONFIG.mdFiles["**/*.md"],
		};

		const badgeGenerator = new BadgeGenerator(),
			spy = vitest.spyOn(global.console, "log"),
			processExitSpy = vitest.spyOn(process, "exit").mockImplementation(number => {
				throw new Error(`process.exit: ${number}`);
			});

		await expect(badgeGenerator.findFiles()).resolves.not.toThrowError();
		expect(badgeGenerator.fileLocations).toEqual([join("src", "classes", "__mocks__", "README.md")]);

		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith("<blue>[INFO] Found 1 (markdown) files.");

		expect(processExitSpy).toHaveBeenCalledTimes(0);

		// Reset set coverageFiles to a non-existent file, and reset fileLocations
		activeConfig.config = {
			silent: false,
			coverageFiles: "**/coverage-fake.json",
			mdFiles: {},
		};
		badgeGenerator.fileLocations = [];

		spy.mockClear();

		await expect(badgeGenerator.findFiles()).rejects.toThrowError("process.exit: 0");
		expect(badgeGenerator.fileLocations).toStrictEqual([]);

		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith("<yellow>[WARN] No (markdown) files found! Exiting...");

		spy.mockRestore();

		expect(processExitSpy).toHaveBeenCalledTimes(1);
		processExitSpy.mockRestore();
	});

	test("locateBadges()", async () => {
		activeConfig.config = DEFAULT_CONFIG;
		const badgeGenerator = new BadgeGenerator(),
			spy = vitest.spyOn(global.console, "log");

		badgeGenerator.fileLocations = [join("src", "classes", "__mocks__", "README.md")];

		await expect(badgeGenerator.locateBadges()).resolves.not.toThrowError();
		expect(badgeGenerator.badgesPerFile).toStrictEqual(EXPECTED_BADGES_PER_FILE);

		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith("<blue>[INFO] Found 12 badges.");

		spy.mockClear();

		// Set fileLocations to a non-existent file, and reset badgesPerFile
		badgeGenerator.fileLocations = [join("src", "classes", "__mocks__", "README-fake.md")];
		badgeGenerator.badgesPerFile = {};

		await expect(badgeGenerator.locateBadges()).resolves.not.toThrowError();
		expect(badgeGenerator.badgesPerFile).toStrictEqual({});

		expect(spy).toHaveBeenCalledTimes(3);
		expect(spy).toHaveBeenCalledWith(`<red>[ERROR] Could not read ${join("src", "classes", "__mocks__", "README-fake.md")}!`);
		expect((spy.mock.calls?.[1]?.[0] as string | undefined)?.startsWith("<red>[ERROR] message: ENOENT: no such file or directory, open")).toBe(true);
		expect(spy).toHaveBeenCalledWith("<blue>[INFO] Found 0 badges.");

		spy.mockClear();

		// Set fileLocations to an empty array, and reset badgesPerFile
		badgeGenerator.fileLocations = [];
		badgeGenerator.badgesPerFile = {};

		await expect(badgeGenerator.locateBadges()).resolves.not.toThrowError();
		expect(badgeGenerator.badgesPerFile).toStrictEqual({});

		expect(spy).toHaveBeenCalledTimes(0);
		spy.mockRestore();
	});

	test("generateBadges()", () => {
		activeConfig.config = DEFAULT_CONFIG;

		const badgeGenerator = new BadgeGenerator(),
			spy = vitest.spyOn(global.console, "log"),
			processExitSpy = vitest.spyOn(process, "exit").mockImplementation(number => {
				throw new Error(`process.exit: ${number}`);
			});

		badgeGenerator.badgesPerFile = EXPECTED_BADGES_PER_FILE;

		expect(() => badgeGenerator.generateBadges()).not.toThrowError();

		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith("<blue>[INFO] Generated 12 new badges.");

		expect(badgeGenerator.badgesPerFileWithNewBages).toStrictEqual(EXPECTED_BADGES_PER_FILE_WITH_NEW_BADGES);

		// Set some coverage data
		badgeGenerator.coverageFiles = EXPECTED_PARSE_COVERAGE_DATA;

		expect(() => badgeGenerator.generateBadges()).not.toThrowError();

		expect(spy).toHaveBeenCalledTimes(2);
		expect(spy).toHaveBeenCalledWith("<blue>[INFO] Generated 12 new badges.");

		expect(badgeGenerator.badgesPerFileWithNewBages).toStrictEqual(EXPECTED_BADGES_PER_FILE_WITH_NEW_BADGES2);

		expect(processExitSpy).toHaveBeenCalledTimes(0);
		spy.mockClear();

		// Set badgesPerFile to an empty object, and reset badgesPerFileWithNewBages
		badgeGenerator.badgesPerFile = {};
		badgeGenerator.badgesPerFileWithNewBages = {};

		expect(() => badgeGenerator.generateBadges()).toThrowError();

		expect(spy).toHaveBeenCalledTimes(1);
		// the ms is different every time, so we can't test for it
		expect((spy.mock.lastCall?.[0] as string).startsWith("<blue>[INFO] All badges are up-to-date! 🎉")).toBe(true);

		expect(processExitSpy).toHaveBeenCalledTimes(1);

		// Set badgesPerFile to EXPECTED_BADGES_PER_FILE, and reset badgesPerFileWithNewBages
		badgeGenerator.badgesPerFile = EXPECTED_BADGES_PER_FILE;
		badgeGenerator.badgesPerFileWithNewBages = {};
		processExitSpy.mockClear();
		spy.mockClear();

		const oldArgv = [...process.argv];
		// Set process.argv to include --ci
		process.argv = ["--ci"];
		expect(() => badgeGenerator.generateBadges()).toThrowError();

		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith("<red>[ERROR] 12 badges are not up-to-date!");
		expect(processExitSpy).toHaveBeenCalledTimes(1);

		process.argv = oldArgv;
		processExitSpy.mockClear();
		spy.mockClear();

		// Set badgesPerFile to EXPECTED_BADGES_PER_FILE, and reset badgesPerFileWithNewBages
		badgeGenerator.badgesPerFile = EXPECTED_BADGES_PER_FILE;
		badgeGenerator.badgesPerFileWithNewBages = {};

		// Set the config to not include the README.md file
		activeConfig.config = {
			silent: false,
			coverageFiles: "**/coverage-fake.json",
			mdFiles: {},
		};

		expect(() => badgeGenerator.generateBadges()).toThrowError();

		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith(`<red>[ERROR] Could not find coverage config for ${join(directoryName, "src", "classes", "__mocks__", "README.md")}!`);
		expect(processExitSpy).toHaveBeenCalledTimes(1);

		spy.mockRestore();
	});

	test("updateFiles()", async () => {
		const badgeGenerator = new BadgeGenerator(),
			spy = vitest.spyOn(global.console, "log"),
			processExitSpy = vitest.spyOn(process, "exit").mockImplementation(number => {
				throw new Error(`process.exit: ${number}`);
			});

		// Set badgesPerFileWithNewBages
		badgeGenerator.badgesPerFileWithNewBages = EXPECTED_BADGES_PER_FILE_WITH_NEW_BADGES;

		await expect(badgeGenerator.updateFiles()).resolves.not.toThrowError();

		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith("<blue>[INFO] Updated 1 files.");
		expect(processExitSpy).toHaveBeenCalledTimes(0);
	});

	test("logSuccess()", () => {
		activeConfig.config = DEFAULT_CONFIG;

		const badgeGenerator = new BadgeGenerator(),
			spy = vitest.spyOn(global.console, "log"),
			processExitSpy = vitest.spyOn(process, "exit").mockImplementation(number => {
				throw new Error(`process.exit: ${number}`);
			});

		expect(() => badgeGenerator.logSuccess()).toThrowError();

		expect(spy).toHaveBeenCalledTimes(2);
		expect((spy.mock.calls[0][0] as string).startsWith("<blue>[INFO] Successfully updated the badges! 🎉")).toBe(true);
		expect(spy).toHaveBeenCalledWith("<blue>[INFO] You can now commit the changes.");

		expect(processExitSpy).toHaveBeenCalledTimes(1);
	});
});
