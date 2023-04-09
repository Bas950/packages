/* eslint-disable unicorn/filename-case */
import findLanguage from "../findLanguage.js";

/**
 * Gets the [ISO 639-3](https://en.wikipedia.org/wiki/ISO_639-3) code of a language
 * @param lang The locale, ISO code or name of the language to find the ISO 639-3 of
 * @returns The ISO 639-3 code of the language, `undefined` if it is not found or `null` if the language doesn't have the code
 */
// eslint-disable-next-line camelcase
export function getISO_639_3(lang: string) {
	const language = findLanguage(lang);
	// eslint-disable-next-line unicorn/no-null
	return language ? language.ids.ISO_639_3 ?? null : undefined;
}
