export async function loadSingleData(client, collectionsName, dataObject) {
  try {
    const collection = client.collections.get(collectionsName);
    const uuid = await collection.data.insert(dataObject);

    console.log(`Успешно загрузил данные в коллекцию: ${collectionsName}: ${uuid}`);
  } catch (error) {
    console.error(`Не загрузил данные в коллекцию: ${collectionsName}.`, error);
    throw new Error(`Ошибка загрузки данных в коллекцию: ${error.message}`);
  }
}
