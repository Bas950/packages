/* eslint-disable unicorn/no-process-exit */
import fs from "node:fs";
import { join } from "node:path";

import { cosmiconfig } from "cosmiconfig";
import type { CosmiconfigResult } from "cosmiconfig/dist/types.js";
import { TypeScriptLoader } from "cosmiconfig-typescript-loader";

import { Config, configSchema } from "../util/configs.js";
import { DEFAULT_CONFIG, MODULE_NAME } from "../util/constants.js";
import { directoryName } from "../util/directoryName.js";
import { getNewConfig } from "../util/getNewConfig.js";
import { logger } from "../util/logger.js";

export class ConfigHandler {
	filepath?: string = undefined;
	config: Config = DEFAULT_CONFIG;
	moduleName = MODULE_NAME;

	private get _cosmi() {
		return cosmiconfig(this.moduleName, {
			loaders: {
				".ts": TypeScriptLoader(),
			},
			searchPlaces: [
				"package.json",
				`.${this.moduleName}rc`,
				`.${this.moduleName}rc.json`,
				`.${this.moduleName}rc.yaml`,
				`.${this.moduleName}rc.yml`,
				`.${this.moduleName}rc.js`,
				`.${this.moduleName}rc.ts`,
				`.${this.moduleName}rc.cjs`,
				`${this.moduleName}.config.js`,
				`${this.moduleName}.config.ts`,
				`${this.moduleName}.config.cjs`,
			],
		});
	}

	public async loadConfig(): Promise<this> {
		// Reset filepath and config
		this.filepath = undefined;
		this.config = DEFAULT_CONFIG;

		// If --config is passed, use that file
		if (process.argv.includes("--config")) {
			const configPath = process.argv[process.argv.indexOf("--config") + 1];
			if (!configPath) {
				logger("error", "No config file path was provided after --config");
				process.exit(1);
			}

			const config = await this._cosmi.load(configPath);
			return this.parseConfigResult(config);
		}

		const config = await this._cosmi.search();
		return this.parseConfigResult(config);
	}

	private async parseConfigResult(config: CosmiconfigResult): Promise<this> {
		if (!config) {
			logger("info", "No config file found, using default values");
			return this;
		}

		/* c8 ignore next 5 */
		// This is an assertion, it's not possible to test
		if (config.isEmpty) {
			logger("info", "Config file is empty, initializing a new config file with default values");
			return this.initConfig();
		}

		const parseResult = configSchema.safeParse(config.config);
		if (!parseResult.success) {
			const error = parseResult.error.errors[0];
			logger("error", "Could not parse configuration file, please check your syntax!", `message: ${error?.message}`, `location: ${error?.path.join(" -> ")}`);
			process.exit(1);
		}
		logger("info", "Config file loaded");

		this.config = parseResult.data;
		this.filepath = config.filepath;
		return this;
	}

	public async initConfig(): Promise<this> {
		const config = await this._cosmi.search();

		/* c8 ignore next 5 */
		// This is an assertion, it's not possible to test
		if (config && !config.isEmpty) {
			logger("warn", "A non-empty config file already exists, aborting initialization");
			return this;
		}

		try {
			/* c8 ignore next 2 */
			// The config?.filepath is an assertion, it's not possible to test
			const location = config?.filepath ?? join(directoryName, `${this.moduleName}.config.cjs`);
			fs.writeFileSync(location, getNewConfig(DEFAULT_CONFIG));
			logger("info", `Initialized new config file at ${location}`);
			return this;
			/* c8 ignore next 6 */
			// This is an assertion, it's not possible to test
		} catch (error) {
			logger("error", "Could not initialize config file", (error as Error).message);
			process.exit(1);
		}
	}
}
