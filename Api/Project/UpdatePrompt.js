import asyncHandler from "express-async-handler";
import { prisma } from "../../index.js";

export const updatePrompt = asyncHandler(async (req, res) => {
  const { projectId, type, text, id } = req.body;

  console.log(text)

  try {
    const prompt = await prisma.prompts.update({
      where: { projectId: Number(projectId), type, id },
      data: { content: text },
    });

    res.status(200).json(prompt);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update the project." });
  }
});
