import findLanguage from "../../findLanguage.js";

/**
 * Gets all the colors in a language's flag
 * @param lang The locale, ISO code or name of the language to find the colors of
 * @returns An array with objects of all the colors in the language's flag, or `undefined` if it is not found
 */
export function getFlagColors(lang: string) {
	const language = findLanguage(lang);
	return language?.flag.flagColors;
}
