import asyncHandler from "express-async-handler";
import { prisma } from "../../index.js";

export const createPrompt = asyncHandler(async (req, res) => {
  try {
    const { name, content, type, projectId } = req.body;
    try {
      const prompt = await prisma.prompts.create({
        data: {
          name,
          content,
          type,
          projectId: Number(projectId),
        },
      });

      res.status(200);
      res.json(prompt);
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
