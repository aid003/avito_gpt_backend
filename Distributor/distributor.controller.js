import { telegramDistributor } from "./Telegram/telegramDistributor.service.js";
import { weaviateDistribution } from "./Weaviate/weaviateDistributor.service.js";

export async function distributor() {
  try {
    await telegramDistributor();
  } catch (error) {
    console.error("Error during distributor:", error);
    throw error;
  }
}
