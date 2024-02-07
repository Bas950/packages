import { describe, expect, it, test, vitest } from "vitest";

import { activeConfig } from "../index.js";
import { logger } from "./logger.js";

describe("logger", () => {
	vitest.mock("chalk", () => {
		return {
			default: {
				blue: vitest.fn(text => `<blue>${text}`),
				red: vitest.fn(text => `<red>${text}`),
				yellow: vitest.fn(text => `<yellow>${text}`),
			},
		};
	});

	test("logger(\"info\", ...)", () => {
		const spy = vitest.spyOn(global.console, "log");

		logger("info", "test");
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith("<blue>[INFO] test");

		spy.mockClear();

		logger("info", "test1", "test2");
		expect(spy).toHaveBeenCalledTimes(2);
		expect(spy).toHaveBeenCalledWith("<blue>[INFO] test1");
		expect(spy).toHaveBeenCalledWith("<blue>[INFO] test2");

		spy.mockRestore();
	});

	test("logger(\"error\", ...)", () => {
		const spy = vitest.spyOn(global.console, "log");

		logger("error", "test");
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith("<red>[ERROR] test");

		spy.mockClear();

		logger("error", "test1", "test2");
		expect(spy).toHaveBeenCalledTimes(2);
		expect(spy).toHaveBeenCalledWith("<red>[ERROR] test1");
		expect(spy).toHaveBeenCalledWith("<red>[ERROR] test2");

		spy.mockRestore();
	});

	test("logger(\"warn\", ...)", () => {
		const spy = vitest.spyOn(global.console, "log");

		logger("warn", "test");
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith("<yellow>[WARN] test");

		spy.mockClear();

		logger("warn", "test1", "test2");
		expect(spy).toHaveBeenCalledTimes(2);
		expect(spy).toHaveBeenCalledWith("<yellow>[WARN] test1");
		expect(spy).toHaveBeenCalledWith("<yellow>[WARN] test2");

		spy.mockRestore();
	});

	it("should be silent if config.silent is true", () => {
		activeConfig.config.silent = true;
		const spy = vitest.spyOn(global.console, "log");

		logger("info", "test");
		expect(spy).not.toHaveBeenCalled();

		logger("error", "test");
		expect(spy).toHaveBeenCalledWith("<red>[ERROR] test");

		spy.mockClear();

		logger("warn", "test");
		expect(spy).not.toHaveBeenCalled();

		activeConfig.config.silent = false;
		spy.mockRestore();
	});
});
