import findLanguage from "../findLanguage.js";

/**
 * Gets the [Glottolog](https://en.wikipedia.org/wiki/Glottolog) code of a language
 * @param lang The locale, ISO code or name of the language to find the Glottolog code of
 * @param url Whether or not to return the Glottolog URL with the code
 * @returns The Glottolog code of the language, or `undefined` if the language is not found, or `null` if the language has no Glottolog code
 */
export function getGlottolog(lang: string): string | null | undefined;
export function getGlottolog(lang: string, url: true): `https://glottolog.org/resource/languoid/id/${string}` | null | undefined;
export function getGlottolog(lang: string, url = false) {
	const language = findLanguage(lang);
	return language
		? (url && language.ids.glottolog
				? `https://glottolog.org/resource/languoid/id/${language.ids.glottolog}`
				// eslint-disable-next-line unicorn/no-null
				: language.ids.glottolog ?? null)
		: undefined;
}
