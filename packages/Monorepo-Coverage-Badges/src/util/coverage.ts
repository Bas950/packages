import { z } from "zod";

/* c8 ignore start */
// Ignore coverage for this file, because it's just Zod schemas
export interface CoverageData {
	total: number;
	covered: number;
	skipped: number;
	pct: number | string;
}

export const coverageDataSchema = z.object({
	total: z.number(),
	covered: z.number(),
	skipped: z.number(),
	pct: z.number().or(z.string()),
});

export interface CoverageFileData {
	lines: CoverageData;
	statements: CoverageData;
	functions: CoverageData;
	branches: CoverageData;
}

export const coverageFileDataSchema = z.object({
	lines: coverageDataSchema,
	statements: coverageDataSchema,
	functions: coverageDataSchema,
	branches: coverageDataSchema,
});

export interface Coverage {
	total: CoverageFileData;
	[x: string]: CoverageFileData;
}

export const coverageSchema = z.record(coverageFileDataSchema).and(
	z.object({
		total: coverageFileDataSchema,
	})
);
