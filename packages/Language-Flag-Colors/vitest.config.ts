import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		coverage: {
			reportOnFailure: true,
			reporter: ["json-summary", "text", "html"],
			thresholds: {
				100: true,
			},
		},
		isolate: false,
	},
});
