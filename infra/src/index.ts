import { createCommonResources } from "./common";
import { createProductsResources } from "./products";
import { createSellersResources } from "./sellers";

const { role, api, apiDefaultStage } = createCommonResources()

createProductsResources(role, api)
createSellersResources(role, api)

export const publishedUrl = apiDefaultStage.invokeUrl;
