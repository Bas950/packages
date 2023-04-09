export * from "./functions/flag/flagColors/getBase10FlagColors.js";
export * from "./functions/flag/flagColors/getCMYKFlagColors.js";
export * from "./functions/flag/flagColors/getFlagColors.js";
export * from "./functions/flag/flagColors/getHexFlagColors.js";
export * from "./functions/flag/flagColors/getRGBFlagColors.js";
export * from "./functions/flag/getEmoji.js";
export * from "./functions/flag/getFlag.js";
export * from "./functions/flag/getImage.js";
export * from "./functions/flag/primaryColor/getPrimaryBase10.js";
export * from "./functions/flag/primaryColor/getPrimaryCMYK.js";
export * from "./functions/flag/primaryColor/getPrimaryColor.js";
export * from "./functions/flag/primaryColor/getPrimaryHex.js";
export * from "./functions/flag/primaryColor/getPrimaryRGB.js";
export * from "./functions/getCountry.js";
export * from "./functions/getCountryCode.js";
export * from "./functions/getCountryLanguages.js";
export * from "./functions/getDirection.js";
export * from "./functions/getLanguage.js";
export * from "./functions/getName.js";
export * from "./functions/getNativeName.js";
export * from "./functions/getRegion.js";
export * from "./functions/getRegionCode.js";
export * from "./functions/getRegionLanguages.js";
export * from "./functions/ids/getAndroidCode.js";
export * from "./functions/ids/getGlottolog.js";
export * from "./functions/ids/getIds.js";
export * from "./functions/ids/getISO_639_1.js";
export * from "./functions/ids/getISO_639_2.js";
export * from "./functions/ids/getISO_639_3.js";
export * from "./functions/ids/getLocale.js";
export * from "./functions/ids/getOSXCode.js";
export * from "./functions/ids/getOSXLocale.js";
import languages from "./languages.js";

// eslint-disable-next-line unicorn/prefer-export-from
export default languages;

export interface Language {
	name: string;
	nativeName: string;
	ids: LanguageIds;
	direction: "ltr" | "rtl";
	country: string;
	countryCode: string;
	flag: LanguageFlag;
	region?: string;
	regionCode?: string;
}

export interface LanguageIds {
	locale: string;
	ISO_639_1?: string;
	ISO_639_2?: string;
	ISO_639_3?: string;
	androidCode: string;
	osxCode: string;
	osxLocale: string;
	glottolog?: string;
}

export interface LanguageFlag {
	image: `https://crowdin.com/images/flags/${string}.png`;
	emoji?: string;
	primaryColor: Color;
	flagColors: Color[];
}

export interface Color {
	hex: `#${string}`;
	rgb: [number, number, number];
	cmyk: [number, number, number, number];
	base10: number;
}
