/* eslint-disable unicorn/filename-case */
import findLanguage from "../findLanguage.js";

/**
 * Gets the OS X locale identifier used to name ".lproj" directories
 * @param lang The locale, ISO code or name of the language to find the OS X code of
 * @returns The OS X code of the language, or `undefined` if it is not found
 */
export function getOSXCode(lang: string) {
	const language = findLanguage(lang);
	return language?.ids.osxCode;
}
