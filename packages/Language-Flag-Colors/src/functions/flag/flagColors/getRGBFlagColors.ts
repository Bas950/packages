/* eslint-disable unicorn/filename-case */
import findLanguage from "../../findLanguage.js";

/**
 * Gets the RGB colors in a language's flag
 * @param lang The locale, ISO code or name of the language to find the colors of
 * @returns An array with all the RGB colors in the language's flag, or `undefined` if it is not found
 */
export function getRGBFlagColors(lang: string) {
	const language = findLanguage(lang);
	return language?.flag.flagColors.map(c => c.rgb);
}
