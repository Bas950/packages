import type { Config } from "../util/configs.js";

export function getNewConfig(config: Config): string {
	return `${CONFIG_HEADER}${getStringifyedConfig(config)}${CONFIG_FOOTER}`;
}

function getStringifyedConfig(config: Config, tabCount = 1): string {
	let output = JSON.stringify(config, undefined, "\t".repeat(tabCount));
	// Remove the first and last curly brackets and delete their whole line
	output = output.replace(/^{\n/, "").replace(/\n}$/, "");
	// Add a comma to the end of each line if it's not there already, unless it ends with a {
	// eslint-disable-next-line redos/no-vulnerable
	output = output.replaceAll(/(.*)(?<!{),\n/g, "$1,\n");
	// Add a newline to the end
	output = `${output}\n`;
	return output;
}

const CONFIG_HEADER = `/**
 * Configuration file for monorepo-coverage-badges (Monorepo Coverage Badges)
 */

/** @type {import('monorepo-coverage-badges').Config} */
module.exports = {
`,
	CONFIG_FOOTER = "};";
