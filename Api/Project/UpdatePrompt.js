import asyncHandler from "express-async-handler";
import { prisma } from "../../index.js";

export const updatePrompt = asyncHandler(async (req, res) => {
  const { projectId, type, text } = req.body;

  try {
    const prompt = await prisma.prompts.update({
      where: { id: Number(projectId), type },
      data: { content: text },
    });

    res.status(200).json(prompt);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update the project." });
  }
});
