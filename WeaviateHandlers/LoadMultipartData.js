export async function loadMultipartData(client, collectionsName, dataList) {
  try {
    const collection = client.collections.get(collectionsName);
    const response = await collection.data.insertMany(dataList);

    if (!response.hasErrors) {
      console.log(
        `Успешно загрузил данные в коллекцию: ${collectionsName} | ${
          Object.keys(response.uuids).length
        } добавлено.`
      );
      return 1;
    } else {
      console.error(
        `Не удалось загрузить данные в коллекцию: ${collectionsName}.`,
        response.errors
      );
      return 0;
    }
  } catch (error) {
    console.error(`Не загрузил данные в коллекцию: ${collectionsName}.`, error);
    return 0;
  }
}
