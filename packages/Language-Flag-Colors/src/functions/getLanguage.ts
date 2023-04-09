import type { Language } from "../index.js";
import findLanguage from "./findLanguage.js";

/**
 * Gets a full language object matching the given input, or an array of languages if input is an array
 * @param lang The locale(s), ISO code(s) or name(s) of the language(s) to find
 * @returns An array of language objects or `undefined` if input is an array, otherwise a language object or `undefined`
 */
export function getLanguage(lang: string): Language | undefined;
export function getLanguage<T extends readonly string[] | []>(langs: T): { [P in keyof T]: Language | undefined };
export function getLanguage(lang: string | string[]) {
	return Array.isArray(lang) ? lang.map(l => findLanguage(l)) : findLanguage(lang);
}
