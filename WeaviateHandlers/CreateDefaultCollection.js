import { vectorizer, generative, dataType } from "weaviate-client";

export async function createEmptyCollection(client, collectionsName) {
  try {
    const questions = await client.collections.create({
      name: collectionsName,
      generative: generative.openAI(),
      vectorizers: vectorizer.text2VecOpenAI(),
      properties: [{ name: "strings", dataType: dataType.TEXT }],
    });
    console.log(`Успешно создал пустую коллекцию: ${questions.name}.`);
  } catch (error) {
    console.error(`Не создал коллекцию: ${collectionsName}.`, error);
    throw new Error(`Ошибка создания коллекции: ${error.message}`);
  }
}
