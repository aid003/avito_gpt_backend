import asyncHandler from "express-async-handler";
import { prisma } from "../../index.js";

export const createProject = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      description,
      status,
      gptModel,
      gptTemperature,
      gptTop_p,
      openaiApiToken,
      isUsingRag,
      embeddingModel,
      modelSearch,
      tgBusinessConnectionId,
      avitoClientId,
      avitoClientSecret,
      avitoUserId,
    } = req.body;
    try {
      const project = await prisma.projects.create({
        data: {
          name,
          description: description
            ? description
            : "Это короткое описание вашего проекта.",
          status: status ? status : true,
          gptModel: gptModel ? gptModel : "gpt-3.5-turbo-0125",
          gptTemperature: gptTemperature ? gptTemperature : 1.0,
          gptTop_p: gptTop_p ? gptTop_p : 1.0,
          openaiApiToken: openaiApiToken ? openaiApiToken : "default",
          isUsingRag: Boolean(isUsingRag),
          embeddingModel: embeddingModel
            ? embeddingModel
            : "text-embedding-3-small",
          modelSearch: modelSearch ? modelSearch : "similarity",
          tgBusinessConnectionId: tgBusinessConnectionId
            ? tgBusinessConnectionId
            : null,
          avitoClientId: avitoClientId ? avitoClientId : null,
          avitoClientSecret: avitoClientSecret ? avitoClientSecret : null,
          avitoUserId: avitoUserId ? avitoUserId : null,
        },
      });

      res.status(200);
      res.json(project);
    } catch (error) {
      console.error("Error during createProject:", error);
      res.status(500);
      res.json({ message: "Server error" });
    }
  } catch (error) {
    console.error("Error during createProject:", error);
    res.status(400);
    res.json({ message: "Invalid request" });
  }
});
