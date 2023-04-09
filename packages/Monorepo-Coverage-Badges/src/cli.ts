#! /usr/bin/env node

import { BadgeGenerator } from "./classes/BadgeGenerator.js";
import { activeConfig } from "./index.js";
import { VERSION } from "./util/constants.js";

// Check if --init flag is present
if (process.argv.includes("--init")) {
	await activeConfig.initConfig();
	process.exit(0);
}

// Check if the --version or -v flag is present
if (process.argv.includes("--version") || process.argv.includes("-v")) {
	// eslint-disable-next-line no-console
	console.log(`v${VERSION}`);
	process.exit(0);
}

// Load config
await activeConfig.loadConfig();
// Start the Badge Generator
const generator = new BadgeGenerator();
// Find all coverage files
await generator.findCoverageFiles();
// Parse the coverage files
await generator.parseCoverageFiles();
// Find all (markdown) files
await generator.findFiles();
// Locate the badges (or their placeholders) in the files
await generator.locateBadges();
// Generate the updated badges
generator.generateBadges();
// Update the changed (markdown) files
await generator.updateFiles();
// Done! Exit the process and log a success message
generator.logSuccess();
