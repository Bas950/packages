import findLanguage from "../findLanguage.js";

/**
 * Gets the locale of a language
 * @param lang The locale, ISO code or name of the language to find the locale of
 * @returns The locale of the language, or `undefined` if it is not found
 */
export function getLocale(lang: string) {
	const language = findLanguage(lang);
	return language?.ids.locale;
}
