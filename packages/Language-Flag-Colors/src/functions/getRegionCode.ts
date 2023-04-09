import findLanguage from "./findLanguage.js";

/**
 * Gets the code of a language's region, if any
 * @param lang The locale, ISO code or name of the language to find the region code of
 * @returns The language's region code, `undefined` if no language is found
 * or `null` if the language doesn't have a region
 */
export function getRegionCode(lang: string) {
	const language = findLanguage(lang);
	// eslint-disable-next-line unicorn/no-null
	return language ? language.regionCode ?? null : undefined;
}
