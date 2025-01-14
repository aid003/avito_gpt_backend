import asyncHandler from "express-async-handler";
import { prisma } from "../../index.js";
import { client } from "../../Initialization/InitializationWeaviateClient.js";
import { deleteCollection } from "../../WeaviateHandlers/DeleteCollection.js";

export const deleteVectorCollection = asyncHandler(async (req, res) => {
  const { projectId, collectionId } = req.body;

  try {
    const del = await prisma.vectorCollections.delete({
      where: { projectId: Number(projectId), id: Number(collectionId) },
    });

    await deleteCollection(client, del.name);

    res.status(200).json(del);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete the collection." });
  }
});
