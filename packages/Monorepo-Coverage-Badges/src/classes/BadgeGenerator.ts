/* eslint-disable unicorn/no-process-exit */
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

import { globby } from "globby";
import multimatch from "multimatch";

import { activeConfig } from "../index.js";
import { COVERAGE_REPLACEMENTS, NAME, VERSION } from "../util/constants.js";
import { Coverage, CoverageData, CoverageFileData, coverageSchema } from "../util/coverage.js";
import { directoryName } from "../util/directoryName.js";
import { logger } from "../util/logger.js";
import { Badge } from "./Badge.js";

export interface BadgeLocation {
	fullLine: string;
	replacement: string;
}

export interface BadgeMappedToLine {
	fullLine: string;
	/**
	 * The first item is the old badge, the second item is the new badge
	 */
	replacements: [string, string][];
}

export class BadgeGenerator {
	coverageFileLocations: string[] = [];
	coverageFiles: Record<string, Coverage> = {};
	fileLocations: string[] = [];
	badgesPerFile: Record<string, Record<keyof typeof COVERAGE_REPLACEMENTS, BadgeLocation[]>> = {};
	badgesPerFileWithNewBages: Record<string, [BadgeLocation, string][]> = {};
	startTime = Date.now();

	constructor() {
		logger("info", `${NAME} v${VERSION}`);
		logger("info", "Starting Badge Generator...");
	}

	async findCoverageFiles(): Promise<this> {
		const fileLocations = await globby([activeConfig.config.coverageFiles, "!**/node_modules/**"]);
		// To make sure it uses the correct path separator
		this.coverageFileLocations = fileLocations.map(location => join(location));

		if (this.coverageFileLocations.length === 0) logger("warn", "No coverage files found!");
		else logger("info", `Found ${this.coverageFileLocations.length} coverage files.`);

		return this;
	}

	async parseCoverageFiles(): Promise<this> {
		if (this.coverageFileLocations.length === 0) return this;

		for (const location of this.coverageFileLocations) {
			// Read the file and parse it to JSON
			let json: Record<string, unknown>;
			try {
				const file = await readFile(location, "utf8");
				json = JSON.parse(file) as Record<string, unknown>;
			} catch (error) {
				logger("error", `Could not parse ${location} as JSON!`, `message: ${(error as Error).message}`);
				continue;
			}

			// Test if the file is valid
			const result = coverageSchema.safeParse(json);

			if (!result.success) {
				logger("error", `Could not parse ${location} as a valid coverage file!`, `message: ${result.error.errors[0]?.message}`);
				continue;
			}

			this.coverageFiles[join(directoryName, location)] = result.data;
		}

		logger("info", `Parsed ${Object.keys(this.coverageFiles).length} coverage files.`);

		return this;
	}

	async findFiles(): Promise<this> {
		const fileLocations = await globby([...Object.keys(activeConfig.config.mdFiles), "!**/node_modules/**"], {
			gitignore: true,
		});
		// To make sure it uses the correct path separator
		this.fileLocations = fileLocations.map(location => join(location));

		if (this.fileLocations.length === 0) {
			logger("warn", "No (markdown) files found! Exiting...");
			process.exit(0);
		} else logger("info", `Found ${this.fileLocations.length} (markdown) files.`);

		return this;
	}

	async locateBadges(): Promise<this> {
		if (this.fileLocations.length === 0) return this;

		for (const location of this.fileLocations) {
			try {
				const fileData = await readFile(location, "utf8");
				this.badgesPerFile[location] = this._findBadges(fileData);
			} catch (error) {
				logger("error", `Could not read ${location}!`, `message: ${(error as Error).message}`);
			}
		}

		logger(
			"info",
			`Found ${Object.values(this.badgesPerFile).reduce((accumulator, current) => accumulator + Object.values(current).flat().length, 0)} badges.`,
		);

		return this;
	}

	private _findBadges(fileData: string): Record<keyof typeof COVERAGE_REPLACEMENTS, BadgeLocation[]> {
		const badges = {} as Record<keyof typeof COVERAGE_REPLACEMENTS, BadgeLocation[]>;

		for (const [key, value] of Object.entries(COVERAGE_REPLACEMENTS)) {
			// Find badge url's, ignore the next line because the || [] is an assertion
			/* c8 ignore next */
			const urlMatches = fileData.match(value.url) ?? ([] as string[]),
				// map the urls to the full line they are on in the file
				urlMatchesWithLine: BadgeLocation[] = urlMatches
					.map((url): [string, string[]] => [url, fileData.split(/\r?\n/).filter(line => line.includes(url))])
					.flatMap(([url, lines]) => lines.map(line => ({ fullLine: line, replacement: url }))),
				// Find badge placeholders (but filter out the found url's)
				placeholderMatches: BadgeLocation[] = fileData
					.split(/\r?\n/)
					.map(line => ({ fullLine: line, replacement: line.match(value.placeholder) as string[] | null }))
					.filter((line): line is { fullLine: string; replacement: string[] } => line.replacement !== null)
					.flatMap(line => line.replacement.map(replacement => ({ fullLine: line.fullLine, replacement }))),
				// Combine the url matches and the placeholder matches
				matches = [...urlMatchesWithLine, ...placeholderMatches],
				// Filter out the duplicates (if the same badge is found multiple times)
				finalMatches = matches.filter((match, index) => matches.findIndex(m => m.fullLine === match.fullLine && m.replacement === match.replacement) === index);

			// If no matches were found, continue
			/* c8 ignore next */
			if (finalMatches.length === 0) continue;

			// Add the matches to the badges object
			badges[key as keyof typeof COVERAGE_REPLACEMENTS] = finalMatches;
		}

		return badges;
	}

	generateBadges(): this {
		for (const [file, badges] of Object.entries(this.badgesPerFile)) {
			// get the folder of the file
			const folder = join(directoryName, dirname(file));
			let newBadges: [BadgeLocation, string][] = [];

			for (const [type, badgeLocations] of Object.entries(badges)) {
				for (const badgeLocation of badgeLocations) {
					// get folder path out of the replacement
					/* c8 ignore next */ // This is an assertion, it's not possible to test
					const badgeFolder = badgeLocation.replacement.match(/\$.*\$((?:\/[\w-\d]+)*)/)?.[1] ?? "",
						// get the folder in which the coverage should be from
						coverageFolder = join(folder, badgeFolder);

					// get the url of the badge
					newBadges.push([
						badgeLocation,
						this._getBadgeUrl(join(directoryName, file), coverageFolder, type as keyof typeof COVERAGE_REPLACEMENTS, badgeLocation.replacement),
					]);
				}
			}
			// Remove duplicates from the new badges array (so the same badge is replaced with the same url)
			newBadges = newBadges.filter(([{ replacement }, newBadge]) => replacement !== newBadge);

			if (newBadges.length > 0) this.badgesPerFileWithNewBages[file] = newBadges;
		}

		const totalNewBadges = Object.values(this.badgesPerFileWithNewBages).reduce((accumulator, current) => accumulator + current.length, 0);

		if (totalNewBadges === 0) {
			logger("info", `All badges are up-to-date! 🎉 (${Date.now() - this.startTime}ms)`);
			process.exit(0);
		}

		// Check if --ci flag is set
		if (process.argv.includes("--ci")) {
			logger("error", `${totalNewBadges} badges are not up-to-date!`);
			process.exit(1);
		}

		logger("info", `Generated ${totalNewBadges} new badges.`);

		return this;
	}

	private _getBadgeUrl(file: string, coverageFolder: string, type: keyof typeof COVERAGE_REPLACEMENTS, replacement: string): string {
		// Get all coverage files that are in the coverage folder
		const allCoverages = Object.entries(this.coverageFiles)
				.flatMap(([, coverage]) => Object.entries(coverage))
				.filter(([location]) => location.startsWith(coverageFolder)),
			// get coverage config where glob matches the md file
			coverageConfig = Object.entries(activeConfig.config.mdFiles).find(([glob]) => multimatch(file, glob).length)?.[1];

		if (!coverageConfig) {
			logger("error", `Could not find coverage config for ${file}!`);
			process.exit(1);
		}

		// Get the config for the type
		const typeConfig = coverageConfig[type];

		if (allCoverages.length === 0) return new Badge(typeConfig).generateBadge(-1, replacement);
		return new Badge(typeConfig).generateBadge(this._getAverage(allCoverages, type), replacement);
	}

	private _getAverage(coverages: [string, CoverageFileData][], type: keyof typeof COVERAGE_REPLACEMENTS): number {
		return this._getAverageOfNumbers(
			coverages.map(([, coverage]): number => {
				if (type === "coverage") {
					// Typeof pct should always be a number, so this is an assertion, same a few lines down
					/* c8 ignore next */
					const percentages = Object.values(coverage).map((s: CoverageData) => (typeof s.pct === "number" ? s.pct : 0));
					return this._getAverageOfNumbers(percentages);
				} else {
					const covType = coverage[type];
					/* c8 ignore next */
					return typeof covType.pct === "number" ? covType.pct : 0;
				}
			}),
		);
	}

	private _getAverageOfNumbers(numbers: number[]): number {
		return numbers.reduce((accumulator, current) => accumulator + current, 0) / numbers.length;
	}

	async updateFiles(): Promise<this> {
		// Map the new badges to the files lines
		const newBadgesPerFile: Record<string, BadgeMappedToLine[]> = {};

		for (const [file, badges] of Object.entries(this.badgesPerFileWithNewBages)) {
			const badgesToFullLineAndReplacements = badges.map(
					([badgeLocation, newBadge]): BadgeMappedToLine => ({
						fullLine: badgeLocation.fullLine,
						replacements: [[badgeLocation.replacement, newBadge]],
					}),
				),
				// Join the badges to the same line
				joinedBadges: BadgeMappedToLine[] = [];

			for (const badge of badgesToFullLineAndReplacements) {
				const existingBadge = joinedBadges.findIndex(foundBadge => foundBadge.fullLine === badge.fullLine);
				if (existingBadge === -1) joinedBadges.push(badge);
				else joinedBadges[existingBadge]?.replacements.push(...badge.replacements);
			}

			newBadgesPerFile[file] = joinedBadges;
		}

		// Update the files
		for (const [filePath, badges] of Object.entries(newBadgesPerFile)) {
			const file = await readFile(join(directoryName, filePath), "utf8"),
				lines = file.split(/\r?\n/),
				// Depending on the OS, the line ending can be \n or \r\n
				/* c8 ignore next */
				lineEnding = file.endsWith("\n") ? "\n" : "\r\n",
				newLines: string[] = [];

			for (const line of lines) {
				const badge = badges.find(b => b.fullLine === line);
				if (badge) {
					let newLine = line;
					// () => is needed because the newBadge can contain $1, $2, etc.
					for (const [oldBadge, newBadge] of badge.replacements) newLine = newLine.replaceAll(oldBadge, () => newBadge);
					newLines.push(newLine);
				} else newLines.push(line);
			}

			// Write the new lines to the file
			await writeFile(join(directoryName, filePath), newLines.join(lineEnding));
		}

		logger("info", `Updated ${Object.keys(newBadgesPerFile).length} files.`);

		return this;
	}

	logSuccess(): this {
		logger("info", `Successfully updated the badges! 🎉 (${Date.now() - this.startTime}ms)`);
		logger("info", "You can now commit the changes.");
		process.exit(0);
	}
}
