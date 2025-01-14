export async function deleteCollection(client, collectionsName) {
  await client.collections.delete(collectionsName);
}
