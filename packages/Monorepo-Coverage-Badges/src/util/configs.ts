import { z } from "zod";

/* c8 ignore start */
// Ignore coverage for this file, because it's just Zod schemas
export type BadgeStyles = "flat" | "flat-square" | "for-the-badge" | "plastic" | "social";
export const BadgeStylesSchema = z.union([z.literal("flat"), z.literal("flat-square"), z.literal("for-the-badge"), z.literal("plastic"), z.literal("social")]);

export interface DefaultBadge {
	/**
	 * The style of the badge
	 * @default "flat"
	 * @see https://shields.io/#styles
	 */
	style: BadgeStyles;
	/**
	 * The logo of the badge
	 * @default undefined
	 * @example "jest"
	 * @example "vitest"
	 * @see https://simpleicons.org/
	 */
	logo?: string;
	/**
	 * The logo color of the badge
	 */
	color: {
		[percentage: string]: string;
		uncovered: string;
	};
	/**
	 * The text it shows when the repository has no coverage data but does have monorepo-coverage-badges installed
	 * @default "unknown"
	 */
	uncoveredText: string;
}

export const DefaultBadgeSchema = z.object({
	color: z
		.record(z.string())
		.default({
			"<80": "critical",
			"<90": "important",
			">=90": "success",
		})
		.and(
			z
				.object({
					uncovered: z.string(),
				})
				.default({ uncovered: "informational" }),
		)
		.default({
			"<80": "critical",
			"<90": "important",
			">=90": "success",
			uncovered: "informational",
		}),
	logo: z.string().optional(),
	style: BadgeStylesSchema.default("flat"),
	uncoveredText: z.string().default("unknown"),
});

export interface Config {
	/**
	 * Whether to show the logs or not
	 * @default false
	 */
	silent: boolean;
	/**
	 * A glob pattern to match the coverage files
	 * @default "<star><star>/coverage-summary.json"
	 */
	coverageFiles: string;
	/**
	 * An object containing the glob patterns to match the markdown files
	 */
	mdFiles: Record<string, {
		/**
		 * The coverage badge
		 */
		coverage: {
			/**
			 * The label of the badge
			 * @default "coverage"
			 */
			label: string;
		} & DefaultBadge;
		/**
		 * The statements badge
		 */
		statements: {
			/**
			 * The label of the badge
			 * @default "statements"
			 */
			label: string;
		} & DefaultBadge;
		/**
		 * The branches badge
		 */
		branches: {
			/**
			 * The label of the badge
			 * @default "branches"
			 */
			label: string;
		} & DefaultBadge;
		/**
		 * The functions badge
		 */
		functions: {
			/**
			 * The label of the badge
			 * @default "functions"
			 */
			label: string;
		} & DefaultBadge;
		/**
		 * The lines badge
		 */
		lines: {
			/**
			 * The label of the badge
			 * @default "lines"
			 */
			label: string;
		} & DefaultBadge;
	}>;
}

export const configSchema = z.object({
	coverageFiles: z.string().default("**/coverage-summary.json"),
	mdFiles: z.record(
		z.object({
			branches: z
				.object({
					label: z.string().default("branches"),
				})
				.and(DefaultBadgeSchema),
			coverage: z
				.object({
					label: z.string().default("coverage"),
				})
				.and(DefaultBadgeSchema),
			functions: z
				.object({
					label: z.string().default("functions"),
				})
				.and(DefaultBadgeSchema),
			lines: z
				.object({
					label: z.string().default("lines"),
				})
				.and(DefaultBadgeSchema),
			statements: z
				.object({
					label: z.string().default("statements"),
				})
				.and(DefaultBadgeSchema),
		}),
	),
	silent: z.boolean().default(false),
});
