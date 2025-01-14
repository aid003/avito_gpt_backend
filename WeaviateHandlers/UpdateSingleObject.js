export async function updateSingleObject(
  client,
  collectionsName,
  id,
  propertiesObject
) {
  const collection = client.collections.get(collectionsName);
  const response = await collection.data.update({
    id: id.toString(),
    properties: propertiesObject,
  });

  console.log(response);
}
