export async function similarityTextSearch(
  client,
  collectionsName,
  searchQuery,
  limit = 2
) {
  try {
    const collection = client.collections.get(collectionsName);

    const responce = await collection.query.nearText(searchQuery, {
      limit: Number(limit),
      returnMetadata: ["distance"],
    });

    let resultStr = "";

    responce.objects.forEach((item) => {
      //   console.log(JSON.stringify(item.properties, null, 2));
      resultStr += `${item.properties.answer} `;
    });

    console.log(`Результаты поиска: ${limit} найдено.`);
    return resultStr;
  } catch (error) {
    console.error(`Ошибка поиска по тексту: ${searchQuery}.`, error);
    throw new Error(`Ошибка поиска по тексту: ${error.message}`);
  }
}
