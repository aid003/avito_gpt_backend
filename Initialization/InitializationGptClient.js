import { HttpsProxyAgent } from "https-proxy-agent";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

export let client;

export async function initializationGptClient(is_using_proxy) {
  try {
    if (Number(is_using_proxy)) {
      const agent = new HttpsProxyAgent(process.env.PROXY_URL);

      client = new OpenAI({
        httpAgent: agent,
        apiKey: process.env.GPT_API_KEY,
      });
    } else {
      client = new OpenAI({
        apiKey: process.env.GPT_API_KEY,
      });
    }

    console.log("🚀 ChatGpt клиент успешно создан.");
  } catch (error) {
    throw new Error(`Ошибка создания клиента ChatGpt. \n\n${error}`);
  }
}
