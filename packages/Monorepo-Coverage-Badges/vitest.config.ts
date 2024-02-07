import { coverageConfigDefaults, defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		coverage: {
			exclude: [...coverageConfigDefaults.exclude, "**/cli*"],
			reportOnFailure: true,
			reporter: ["json-summary", "text", "html"],
			thresholds: {
				100: true,
			},
		},
		isolate: false,
	},
});
