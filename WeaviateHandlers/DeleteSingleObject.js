export async function deleteSingleObject(client, collectionsName, id) {
  try {
    const collection = client.collections.get(collectionsName);
    const response = await collection.data.deleteById(id.toString());

    console.log(response);
  } catch (error) {
    console.error(`Не удалил объект из коллекции: ${collectionsName}.`, error);
    throw new Error(`Ошибка удаления объекта из коллекции: ${error.message}`);
  }
}
