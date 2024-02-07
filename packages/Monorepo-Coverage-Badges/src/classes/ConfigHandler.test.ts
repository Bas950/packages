import fs from "node:fs";
import { join } from "node:path";

import { describe, expect, test, vitest } from "vitest";

import { activeConfig } from "../index.js";
import { DEFAULT_CONFIG, MODULE_NAME } from "../util/constants.js";
import { directoryName } from "../util/directoryName.js";
import { BADGES_CONFIG, CUSTOM_CONFIG, DEFAULT_CONFIG_FILE } from "./__mocks__/expectedData.js";

describe("ConfigHandler", () => {
	vitest.mock("chalk", () => {
		return {
			default: {
				blue: vitest.fn(text => `<blue>${text}`),
				red: vitest.fn(text => `<red>${text}`),
				yellow: vitest.fn(text => `<yellow>${text}`),
			},
		};
	});

	vitest.mock("fs", async () => {
		const actual: Record<string, unknown> = await vitest.importActual("fs");
		return {
			...actual,
			default: {
				writeFileSync: vitest.fn().mockImplementation(() => Promise.resolve()),
			},
		};
	});

	test("loadConfig()", async () => {
		const spy = vitest.spyOn(global.console, "log"),
			processExitSpy = vitest.spyOn(process, "exit").mockImplementation((number) => {
				throw new Error(`process.exit: ${number}`);
			}),
			writeFileSyncSpy = vitest.spyOn(fs, "writeFileSync");

		await expect(activeConfig.loadConfig()).resolves.toStrictEqual(activeConfig);

		expect(activeConfig.filepath).not.toBeDefined();
		expect(activeConfig.config).toStrictEqual(DEFAULT_CONFIG);
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith("<blue>[INFO] No config file found, using default values");
		expect(processExitSpy).not.toHaveBeenCalled();
		expect(writeFileSyncSpy).not.toHaveBeenCalled();

		spy.mockClear();
		processExitSpy.mockClear();
		writeFileSyncSpy.mockClear();

		// Rename the test config file so it will be found
		activeConfig.moduleName = "testing";

		await expect(activeConfig.loadConfig()).resolves.toStrictEqual(activeConfig);

		expect(activeConfig.filepath).toBeDefined();
		expect(activeConfig.config).toStrictEqual(CUSTOM_CONFIG);

		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith("<blue>[INFO] Config file loaded");
		expect(processExitSpy).not.toHaveBeenCalled();
		expect(writeFileSyncSpy).not.toHaveBeenCalled();

		spy.mockClear();
		processExitSpy.mockClear();
		writeFileSyncSpy.mockClear();

		// Rename the test an config file so it will be found, but it will be an empty object
		activeConfig.moduleName = "testingZod";

		await expect(activeConfig.loadConfig()).rejects.toThrowError();
		expect(activeConfig.filepath).not.toBeDefined();
		expect(spy).toHaveBeenCalledTimes(3);
		expect(spy).toHaveBeenCalledWith("<red>[ERROR] Could not parse configuration file, please check your syntax!");
		expect(spy).toHaveBeenCalledWith("<red>[ERROR] message: Required");
		expect(spy).toHaveBeenCalledWith("<red>[ERROR] location: mdFiles");
		expect(processExitSpy).toHaveBeenCalledTimes(1);
		expect(processExitSpy).toHaveBeenCalledWith(1);
		expect(writeFileSyncSpy).toHaveBeenCalledTimes(0);

		activeConfig.moduleName = MODULE_NAME;
		spy.mockClear();
		processExitSpy.mockClear();
		writeFileSyncSpy.mockClear();

		// Test if --config is used in the CLI
		const oldArgv = [...process.argv];
		process.argv = [...oldArgv, "--config", "badges.config.cjs"];

		await expect(activeConfig.loadConfig()).resolves.toStrictEqual(activeConfig);
		expect(activeConfig.filepath).toBeDefined();
		expect(activeConfig.config).toStrictEqual(BADGES_CONFIG);
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith("<blue>[INFO] Config file loaded");
		expect(processExitSpy).not.toHaveBeenCalled();
		expect(writeFileSyncSpy).not.toHaveBeenCalled();

		spy.mockClear();
		processExitSpy.mockClear();
		writeFileSyncSpy.mockClear();

		// Try out if it errors if you don't pass a file to --config
		process.argv = [...oldArgv, "--config"];

		await expect(activeConfig.loadConfig()).rejects.toThrowError();
		expect(activeConfig.filepath).not.toBeDefined();
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith("<red>[ERROR] No config file path was provided after --config");
		expect(processExitSpy).toHaveBeenCalledTimes(1);
		expect(processExitSpy).toHaveBeenCalledWith(1);
		expect(writeFileSyncSpy).toHaveBeenCalledTimes(0);

		process.argv = oldArgv;
		activeConfig.moduleName = MODULE_NAME;
		activeConfig.filepath = undefined;
		activeConfig.config = DEFAULT_CONFIG;

		spy.mockRestore();
		processExitSpy.mockRestore();
		writeFileSyncSpy.mockRestore();
	});

	test("initConfig()", async () => {
		const spy = vitest.spyOn(global.console, "log"),
			processExitSpy = vitest.spyOn(process, "exit").mockImplementation((number) => {
				throw new Error(`process.exit: ${number}`);
			}),
			writeFileSyncSpy = vitest.spyOn(fs, "writeFileSync");

		await expect(activeConfig.initConfig()).resolves.toStrictEqual(activeConfig);
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith(`<blue>[INFO] Initialized new config file at ${join(directoryName, `${activeConfig.moduleName}.config.cjs`)}`);
		expect(processExitSpy).not.toHaveBeenCalled();
		expect(writeFileSyncSpy).toHaveBeenCalledTimes(1);
		expect(writeFileSyncSpy).toHaveBeenCalledWith(join(directoryName, `${activeConfig.moduleName}.config.cjs`), DEFAULT_CONFIG_FILE);
	});
});
