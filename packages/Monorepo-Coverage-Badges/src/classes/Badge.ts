import type { DefaultBadge } from "../index.js";

export class Badge {
	constructor(private config: { label: string } & DefaultBadge) {}

	generateBadge(coverage: number, placeholder: string): string {
		return `https://img.shields.io/badge/${this._getLabel()}-${this._getCoverageString(coverage)}-${this._getColor(
			coverage
		)}.svg?placeholder=${this._getPlaceholder(placeholder)}${this._getLogo()}&style=${this.config.style}`;
	}

	private _getLabel(): string {
		return encodeURI(this.config.label);
	}

	private _getColor(coverage: number): string {
		if (coverage === -1) return this.config.color.uncovered;

		// parse <80, <90, >=90 to greater than, less than, equal to
		for (const key of Object.keys(this.config.color)) {
			const operator = key.match(/(?<operator>[!<=>]{1,2})\d+/)?.groups?.operator,
				value = key.match(/(?<value>\d+)/)?.groups?.value;
			if (!operator || !value) continue;

			if (operator === "<" && coverage < Number(value)) return this.config.color[key];
			if (operator === ">" && coverage > Number(value)) return this.config.color[key];
			if (operator === "==" && coverage === Number(value)) return this.config.color[key];
			if (operator === "!=" && coverage !== Number(value)) return this.config.color[key];
			if (operator === "<=" && coverage <= Number(value)) return this.config.color[key];
			if (operator === ">=" && coverage >= Number(value)) return this.config.color[key];
		}

		return this.config.color.uncovered;
	}

	private _getCoverageString(coverage: number): string {
		if (coverage === -1) return this.config.uncoveredText;
		const fixedCoverage = coverage.toFixed(2),
			// If it ends with .00, remove the .00
			finalCoverage = fixedCoverage.endsWith(".00") ? fixedCoverage.replace(".00", "") : fixedCoverage;
		return `${finalCoverage}${encodeURI("%")}`;
	}

	private _getLogo(): string {
		return this.config.logo ? `&logo=${this.config.logo}` : "";
	}

	private _getPlaceholder(placeholder: string): string {
		const newPlaceholder = placeholder.match(/(?<placeholder>\$.+\$(?:\/[\w-\d]+)*)/)?.groups?.placeholder ?? placeholder;

		// Replace the last $ in the placeholder with -url$
		// This is to differentiate between the placeholder and the url
		return `$${newPlaceholder.replace(/\$(.+)\$/, "$1-url$")}`.replace("-url-url", "-url");
	}
}
