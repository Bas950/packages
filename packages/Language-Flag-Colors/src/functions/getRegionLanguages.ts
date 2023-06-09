import languages from "../languages.js";

/**
 * Gets an array with all the languages belonging to a given region
 * @param region The region name or code to find
 * @returns An array with all the languages belonging to that region or undefined if none are found
 */
export function getRegionLanguages(region: string) {
	const regionLangs = languages.filter(l => l.region?.toLowerCase() === region.toLowerCase() || l.regionCode?.toLowerCase() === region.toLowerCase());
	return regionLangs.length > 0 ? regionLangs : undefined;
}
