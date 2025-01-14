import { makeFirstRequest } from "../../ChatgptHandlers/MakeGptFirstRequest.service.js";
import { client } from "../../Initialization/InitializationWeaviateClient.js";
import { updateChatHistory } from "../../PrismaHandlers/UpdateChatHistory.service.js";
// import { tgPrompt } from "../../PromptLibary/TgHistory.js";
import { similarityTextSearch } from "../../WeaviateHandlers/SimilarityTextSearch.js";
import { getProjectById } from "../../PrismaHandlers/GetProjectById.service.js";

export async function makeHintRequest(
  userMessage,
  projectId,
  vectorsType,
  userId
) {
  if (!projectId || !userMessage || !vectorsType) {
    console.log(
      "Ошибка получения поиска с подсказками. Не переданы данные для поиска."
    );
    return 0;
  }

  const project = await getProjectById(projectId);

  let collectionsName;
  let defaultCollectionsName;
  for (let i = 0; i < project.vectorCollections.length; i++) {
    if (project.vectorCollections[i].type === vectorsType) {
      collectionsName = project.vectorCollections[i].name;
    }
    if (project.vectorCollections[i].type === "default") {
      defaultCollectionsName = project.vectorCollections[i].name;
    }
  }

  const hint = await similarityTextSearch(
    client,
    collectionsName ? collectionsName : defaultCollectionsName,
    userMessage,
    2
  );

  let prompt;
  let defaultPrompt;
  for (let i = 0; i < project.prompts.length; i++) {
    if (project.prompts[i].type === vectorsType) {
      prompt = project.prompts[i].content;
    }
    if (project.prompts[i].type === "default") {
      defaultPrompt = project.prompts[i].content;
    }
  }

  let upgradedPromt = prompt ? prompt : defaultPrompt;
  upgradedPromt += hint;

  const answer = await makeFirstRequest(
    userMessage,
    upgradedPromt,
    project.gptModel
  );

  await updateChatHistory(userId, "user", userMessage);
  await updateChatHistory(userId, "assistant", answer.content);

  return answer.content;
}
