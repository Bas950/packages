import "source-map-support/register.js";

import { ConfigHandler } from "./classes/ConfigHandler.js";

export * from "./util/configs.js";

export const activeConfig = new ConfigHandler();
