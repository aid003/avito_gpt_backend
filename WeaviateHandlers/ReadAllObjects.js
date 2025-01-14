export async function readAllObjexcts(
  client,
  collectionsName,
  includeVector = false
) {
  const collection = client.collections.get(collectionsName);

  for await (let item of collection.iterator({
    includeVector: includeVector,
  })) {
    console.log(item.uuid, item.properties);
    includeVector && console.log(item.vectors);
  }
}
