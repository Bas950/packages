/* eslint-disable no-console */
import chalk from "chalk";

import { activeConfig } from "../index.js";

export const logger = (type: "info" | "error" | "warn", ...text: string[]) => {
	if (activeConfig.config.silent && type !== "error") return;
	switch (type) {
		case "info":
			for (const t of text) console.log(chalk.blue("[INFO] ") + t);
			break;
		case "error":
			for (const t of text) console.log(chalk.red("[ERROR] ") + t);
			break;
		case "warn":
			for (const t of text) console.log(chalk.yellow("[WARN] ") + t);
			break;
	}
};
