import findLanguage from "./findLanguage.js";

/**
 * Gets the native name of a language
 * @param lang The locale, ISO code or name of the language to find the native name of
 * @returns The native name of the language, or `undefined` if it is not found
 */
export function getNativeName(lang: string) {
	const language = findLanguage(lang);
	return language?.nativeName;
}
