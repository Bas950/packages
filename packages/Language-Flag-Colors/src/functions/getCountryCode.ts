import findLanguage from "./findLanguage.js";

/**
 * Gets the code of a language's country
 * @param lang The locale, ISO code or name of the language to find the country code of
 * @returns The code of the language's country, or `undefined` if it is not found
 */
export function getCountryCode(lang: string) {
	const language = findLanguage(lang);
	return language?.countryCode;
}
