import { client } from "../Initialization/InitializationGptClient.js";

export async function makeFirstRequest(userContent, promtContent, gptModel) {
  if (!userContent || !promtContent || !gptModel) {
    console.log(userContent, promtContent, gptModel);
    throw new Error("Отсутствуют параметры для запроса.");
  }

  const response = await client.chat.completions.create({
    messages: [
      {
        role: "developer",
        content: promtContent,
      },
      {
        role: "user",
        content: userContent,
      },
    ],
    model: gptModel,
  });

  return response.choices[0].message;
}
