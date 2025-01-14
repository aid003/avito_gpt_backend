import weaviate from "weaviate-client";
import dotenv from "dotenv";
import { createVectorCollectionAndUploadData } from "../Test/createCollectionAndUploadData.js";
import { birki_data } from "../Data/birki_data.js";

dotenv.config();

export let client;

export async function initializationWeaviteClient(isUsingSandBox) {
  if (Number(isUsingSandBox) === 1) {
    try {
      client = await weaviate.connectToWeaviateCloud(process.env.WEAVIATE_URL, {
        authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_KEY),
        headers: {
          "X-OpenAI-Api-Key": process.env.OPENAI_API_KEY,
        },
      });

      if (await client.isReady()) {
        console.log("🚀 Weaviate клиент успешно создан.");
      } else {
        throw new Error("Клиент Weaviate не готов к работе.");
      }
    } catch (error) {
      console.error(`Ошибка создания клиента Weaviate: ${error.message}`);
      throw new Error(`Ошибка создания клиента Weaviate. \n\n${error}`);
    }
  } else if (Number(isUsingSandBox) === 0) {
    try {
      client = await weaviate.connectToLocal({
        host: process.env.WEAVIATE_HOST,
        port: process.env.WEAVIATE_PORT,
        grpcPort: process.env.WEAVIATE_GRPC_PORT,
      });

      if (await client.isReady()) {
        console.log("🚀 Weaviate клиент успешно создан.");
      } else {
        throw new Error("Клиент Weaviate не готов к работе.");
      }
    } catch (error) {
      console.error(`Ошибка создания клиента Weaviate: ${error.message}`);
      throw new Error(`Ошибка создания клиента Weaviate. \n\n${error}`);
    }

    // await createVectorCollectionAndUploadData(
    //   client,
    //   "Birki_default",
    //   birki_data
    // );
  }
}
