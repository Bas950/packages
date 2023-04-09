import languages from "../../languages.js";
import findLanguage from "../findLanguage.js";

/**
 * Gets a country's flag unicode emoji
 * @param country The country, country code, language locale, ISO code or name to get the flag emoji of
 * @returns A flag unicode emoji, `undefined` if no language is found or `null` if the language doesn't have an emoji
 */
export function getEmoji(country: string) {
	const language =
		languages.find(l => l.country.toLowerCase() === country.toLowerCase()) ??
		languages.find(l => l.countryCode.toLowerCase() === country.toLowerCase()) ??
		findLanguage(country);
	// eslint-disable-next-line unicorn/no-null
	return language ? language.flag.emoji ?? null : undefined;
}
