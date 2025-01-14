import { createCollection } from "../WeaviateHandlers/CreateCollection.js";
import { loadMultipartData } from "../WeaviateHandlers/LoadMultipartData.js";

export async function createVectorCollectionAndUploadData(
  client,
  collectionsName,
  dataList
) {
  await createCollection(client, collectionsName);
  await loadMultipartData(client, collectionsName, dataList);
  console.log("Загрузил");
}
