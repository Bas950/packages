import { readFileSync } from "node:fs";

import { Config, configSchema } from "./configs.js";

/* c8 ignore start */
// Ignore coverage for this file, because it's just constants
export const NAME = "Monorepo-Coverage-Badges";
export const VERSION = JSON.parse(readFileSync(new URL("../../package.json", import.meta.url)).toString()).version;
export const MODULE_NAME = NAME.toLowerCase();
export const DEFAULT_CONFIG = configSchema.parse({
	mdFiles: {
		"**/*.md": {
			coverage: {},
			statements: {},
			branches: {},
			functions: {},
			lines: {},
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
	coverage: {
		url: /https:\/\/img\.shields\.io\/badge\/.*\.svg\?placeholder=\$coverage-url\$(?:\/[\w-\d]+)*(&logo=.*)?&style=(flat-square|flat|for-the-badge|plastic|social)/g,
		placeholder: /(?<!<code>)(?<!placeholder=)\$coverage\$(?:\/[\w-\d]+)*/g,
	},
	statements: {
		url: /https:\/\/img\.shields\.io\/badge\/.*\.svg\?placeholder=\$statements-url\$(?:\/[\w-\d]+)*(&logo=.*)?&style=(flat-square|flat|for-the-badge|plastic|social)/g,
		placeholder: /(?<!<code>)(?<!placeholder=)\$statements\$(?:\/[\w-\d]+)*/g,
	},
	branches: {
		url: /https:\/\/img\.shields\.io\/badge\/.*\.svg\?placeholder=\$branches-url\$(?:\/[\w-\d]+)*(&logo=.*)?&style=(flat-square|flat|for-the-badge|plastic|social)/g,
		placeholder: /(?<!<code>)(?<!placeholder=)\$branches\$(?:\/[\w-\d]+)*/g,
	},
	functions: {
		url: /https:\/\/img\.shields\.io\/badge\/.*\.svg\?placeholder=\$functions-url\$(?:\/[\w-\d]+)*(&logo=.*)?&style=(flat-square|flat|for-the-badge|plastic|social)/g,
		placeholder: /(?<!<code>)(?<!placeholder=)\$functions\$(?:\/[\w-\d]+)*/g,
	},
	lines: {
		url: /https:\/\/img\.shields\.io\/badge\/.*\.svg\?placeholder=\$lines-url\$(?:\/[\w-\d]+)*(&logo=.*)?&style=(flat-square|flat|for-the-badge|plastic|social)/g,
		placeholder: /(?<!<code>)(?<!placeholder=)\$lines\$(?:\/[\w-\d]+)*/g,
	},
};
