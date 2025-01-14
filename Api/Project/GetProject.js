import asyncHandler from "express-async-handler";
import { prisma } from "../../index.js";

export const getProject = asyncHandler(async (req, res) => {
  const { id } = req.body;

  try {
    const project = await prisma.projects.findUnique({
      where: { id: Number(id) },
      include: { prompts: true, users: true, vectorCollections: true },
    });

    res.status(200);
    res.json(project);
  } catch (error) {
    console.error("Error during createProject:", error);
    res.status(500);
    res.json({ message: "Server error" });
  }
});
