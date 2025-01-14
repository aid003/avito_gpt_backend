import { makeHistoryRequest } from "../../ChatgptHandlers/MakeGptHistoryRequest.service.js";
import { client } from "../../Initialization/InitializationWeaviateClient.js";
import { getProjectById } from "../../PrismaHandlers/GetProjectById.service.js";
import { getSortedChat } from "../../PrismaHandlers/GetSortedChat.service.js";
import { updateChatHistory } from "../../PrismaHandlers/UpdateChatHistory.service.js";
import { similarityTextSearch } from "../../WeaviateHandlers/SimilarityTextSearch.js";

export async function makeHintHistotyRequest(
  userMessage,
  projectId,
  vectorsType,
  userId
) {
  const chatHistory = await getSortedChat(userId);
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

  const answer = await makeHistoryRequest(
    userMessage,
    upgradedPromt,
    chatHistory,
    project.gptModel
  );

  try {
    await updateChatHistory(userId, "user", userMessage);
    await updateChatHistory(userId, answer.role, answer.content);
  } catch (error) {
    console.error("Error updating chat history(hint, history):", error);
  }

  return answer.content;
}
