/* eslint-disable unicorn/filename-case */
import findLanguage from "../../findLanguage.js";

/**
 * Gets the RGB color of a language
 * @param lang The locale, ISO code or name of the language to find the color of
 * @returns The RGB array of colors of the language, or `undefined` if it is not found
 */
export function getPrimaryRGB(lang: string) {
	const language = findLanguage(lang);
	return language?.flag.primaryColor.rgb;
}
