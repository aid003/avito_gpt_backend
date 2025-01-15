import asyncHandler from "express-async-handler";
import { prisma } from "../../index.js";

export const deletePrompt = asyncHandler(async (req, res) => {
  const { projectId, id } = req.body;

  try {
    const prompt = await prisma.prompts.delete({
      where: { projectId: Number(projectId), id: Number(id) },
    });

    res.status(200).json(prompt);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update the project." });
  }
});
