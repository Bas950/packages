import findLanguage from "./findLanguage.js";

/**
 * Gets the name of a language
 * @param lang The locale, ISO code or name of the language to find the name of
 * @returns The name of the language, or `undefined` if it is not found
 */
export function getName(lang: string) {
	const language = findLanguage(lang);
	return language?.name;
}
