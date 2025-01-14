import asyncHandler from "express-async-handler";
import { prisma } from "../../index.js";

export const updateProperty = asyncHandler(async (req, res) => {
  const { projectId, propertyName, changeValue } = req.body;

  try {
    const dataToUpdate = { [propertyName]: changeValue };

    const project = await prisma.projects.update({
      where: { id: Number(projectId) },
      include: { prompts: true, users: true, vectorCollections: true },
      data: dataToUpdate,
    });

    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update the project." });
  }
});
