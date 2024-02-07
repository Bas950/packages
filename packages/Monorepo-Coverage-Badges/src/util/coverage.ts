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
	covered: z.number(),
	pct: z.number().or(z.string()),
	skipped: z.number(),
	total: z.number(),
});

export interface CoverageFileData {
	lines: CoverageData;
	statements: CoverageData;
	functions: CoverageData;
	branches: CoverageData;
}

export const coverageFileDataSchema = z.object({
	branches: coverageDataSchema,
	functions: coverageDataSchema,
	lines: coverageDataSchema,
	statements: coverageDataSchema,
});

export interface Coverage {
	total: CoverageFileData;
	[x: string]: CoverageFileData;
}

export const coverageSchema = z.record(coverageFileDataSchema).and(
	z.object({
		total: coverageFileDataSchema,
	}),
);
