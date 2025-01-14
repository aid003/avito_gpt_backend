import asyncHandler from "express-async-handler";
import { prisma } from "../../index.js";

export const getAllProjects = asyncHandler(async (req, res) => {
  try {
    const projects = await prisma.projects.findMany({
      include: { prompts: true, users: true, vectorCollections: true },
    });

    res.status(200);
    res.json(projects);
  } catch (error) {
    console.error("Error during createProject:", error);
    res.status(500);
    res.json({ message: "Server error" });
  }
});
