import { vectorizer, generative, dataType } from "weaviate-client";

export async function createCollection(client, collectionsName) {
  try {
    const questions = await client.collections.create({
      name: collectionsName,
      generative: generative.openAI(),
      vectorizers: vectorizer.text2VecOpenAI(),
      properties: [
        { name: "category", dataType: dataType.TEXT },
        { name: "question", dataType: dataType.TEXT },
        { name: "answer", dataType: dataType.TEXT },
      ],
    });
    console.log(`Успешно создал коллекцию: ${questions.name}.`);
  } catch (error) {
    console.error(`Не создал коллекцию: ${collectionsName}.`, error);
    throw new Error(`Ошибка создания коллекции: ${error.message}`);
  }
}
