import asyncHandler from "express-async-handler";
import { prisma } from "../../index.js";
import { readAllObjexcts } from "../../WeaviateHandlers/ReadAllObjects.js";
import { client } from "../../Initialization/InitializationWeaviateClient.js";
import { createEmptyCollection } from "../../WeaviateHandlers/CreateDefaultCollection.js";
import { createCollection } from "../../WeaviateHandlers/CreateCollection.js";

export const createVectorCollection = asyncHandler(async (req, res) => {
  try {
    const { name, description, type, projectId, structure } = req.body;
    try {
      if (structure === "empty") {
        const collection = await prisma.vectorCollections.create({
          data: {
            name,
            description,
            type,
            projectId: Number(projectId),
          },
        });

        try {
          await createEmptyCollection(client, name);

          res.status(200);
          res.json(collection);
          await readAllObjexcts(client, name);
        } catch (error) {
          res.status(500);
        }
      } else if (structure === "properties") {
        const collection = await prisma.vectorCollections.create({
          data: {
            name,
            description,
            type,
            projectId: Number(projectId),
          },
        });

        try {
          await createCollection(client, name);

          res.status(200);
          res.json(collection);
          await readAllObjexcts(client, name);
        } catch (error) {
          res.status(500);
        }
      }
    } catch (error) {
      console.error("Error during createCollections:", error);
      res.status(500);
      res.json({ message: "Server error" });
    }
  } catch (error) {
    console.error("Error during createProject:", error);
    res.status(400);
    res.json({ message: "Invalid request" });
  }
});
