/* eslint-disable unicorn/filename-case */
import findLanguage from "../findLanguage.js";

/**
 * Gets the OS X locale used to name translated resources (i.e. uk, zh-Hans, zh_HK)
 * @param lang The locale, ISO code or name of the language to find the OS X locale of
 * @returns The OS X locale of the language, or `undefined` if it is not found
 */
export function getOSXLocale(lang: string) {
	const language = findLanguage(lang);
	return language?.ids.osxLocale;
}
