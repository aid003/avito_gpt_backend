import dotenv from "dotenv";
import { client } from "../Initialization/InitializationGptClient.js";

dotenv.config();

export async function makeHistoryRequest(
  userContent,
  promtContent,
  historyContent,
  gptModel
) {
  if (!userContent || !promtContent || !historyContent || !gptModel) {
    throw new Error("Отсутствуют параметры для запроса.");
  }

  const historyRequest = [
    ...historyContent,
    { role: "developer", content: promtContent },
    { role: "user", content: userContent },
  ];

  const response = await client.chat.completions.create({
    messages: historyRequest,
    model: gptModel,
  });

  return response.choices[0].message;
}
