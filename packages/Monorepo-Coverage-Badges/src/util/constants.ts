/* eslint-disable redos/no-vulnerable */
import { readFileSync } from "node:fs";

import { Config, configSchema } from "./configs.js";

/* c8 ignore start */
// Ignore coverage for this file, because it's just constants
export const NAME = "Monorepo-Coverage-Badges";
export const VERSION = (JSON.parse(readFileSync(new URL("../../package.json", import.meta.url)).toString()) as { version: string }).version;
export const MODULE_NAME = NAME.toLowerCase();
export const DEFAULT_CONFIG = configSchema.parse({
	mdFiles: {
		"**/*.md": {
			branches: {},
			coverage: {},
			functions: {},
			lines: {},
			statements: {},
		},
	},
});
export const COVERAGE_REPLACEMENTS: Record<
	keyof Config["mdFiles"][string],
	{
		/**
		 * The regex to match the badge, the regex just matches the full url
		 * @example url: https://img.shields.io/badge/Coverage-98%25-success.svg?placeholder=$coverage$/path/to/folder&style=flat-square
		 */
		url: RegExp;
		/**
		 * The regex to match the placeholder
		 * @example placeholder: $coverage$/path/to/folder
		 */
		placeholder: RegExp;
	}
> = {
	branches: {
		placeholder: /(?<!<code>)(?<!placeholder=)\$branches\$(?:\/[\w-\d]+)*/g,
		url: /https:\/\/img\.shields\.io\/badge\/.*\.svg\?placeholder=\$branches-url\$(?:\/[\w-\d]+)*(&logo=.*)?&style=(flat-square|flat|for-the-badge|plastic|social)/g,
	},
	coverage: {
		placeholder: /(?<!<code>)(?<!placeholder=)\$coverage\$(?:\/[\w-\d]+)*/g,
		url: /https:\/\/img\.shields\.io\/badge\/.*\.svg\?placeholder=\$coverage-url\$(?:\/[\w-\d]+)*(&logo=.*)?&style=(flat-square|flat|for-the-badge|plastic|social)/g,
	},
	functions: {
		placeholder: /(?<!<code>)(?<!placeholder=)\$functions\$(?:\/[\w-\d]+)*/g,
		url: /https:\/\/img\.shields\.io\/badge\/.*\.svg\?placeholder=\$functions-url\$(?:\/[\w-\d]+)*(&logo=.*)?&style=(flat-square|flat|for-the-badge|plastic|social)/g,
	},
	lines: {
		placeholder: /(?<!<code>)(?<!placeholder=)\$lines\$(?:\/[\w-\d]+)*/g,
		url: /https:\/\/img\.shields\.io\/badge\/.*\.svg\?placeholder=\$lines-url\$(?:\/[\w-\d]+)*(&logo=.*)?&style=(flat-square|flat|for-the-badge|plastic|social)/g,
	},
	statements: {
		placeholder: /(?<!<code>)(?<!placeholder=)\$statements\$(?:\/[\w-\d]+)*/g,
		url: /https:\/\/img\.shields\.io\/badge\/.*\.svg\?placeholder=\$statements-url\$(?:\/[\w-\d]+)*(&logo=.*)?&style=(flat-square|flat|for-the-badge|plastic|social)/g,
	},
};
