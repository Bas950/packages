//* Patches eslint's module resolution
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
	extends: "@recodive/eslint-config/strict",
	parserOptions: {
		project: [
			"./tsconfig.eslint.json",
      "./packages/*/tsconfig.json",
		],
    tsconfigRootDir: __dirname,
	},
};
