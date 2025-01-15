import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { PrismaClient } from "@prisma/client";
import { initializationGptClient } from "./Initialization/InitializationGptClient.js";
import { initializationTgBot } from "./Initialization/InitializationTgBot.js";
import { initializationWeaviteClient } from "./Initialization/InitializationWeaviateClient.js";
import { distributor } from "./Distributor/distributor.controller.js";
import { createProject } from "./Api/Project/CreateProject.js";
import { createPrompt } from "./Api/Project/CreatePrompt.js";
import { getAllProjects } from "./Api/Project/GetAllProjects.js";
import { createVectorCollection } from "./Api/Project/CreateVectorCollection.js";
import { getProject } from "./Api/Project/GetProject.js";
import { getTypesPrtoperties } from "./Api/Project/GetTypesProperties.js";
import { deleteVectorCollection } from "./Api/Project/DeleteVectorCollection.js";
import multer from "multer";
import path from "path";
import { uploadJsonDataToVectorCollections } from "./Distributor/Middleware/UploadFile.js";
import { weaviateDistribution } from "./Distributor/Weaviate/weaviateDistributor.service.js";
import { updateProperty } from "./Api/Project/UpdateProperty.js";
import { updatePrompt } from "./Api/Project/UpdatePrompt.js";
import { deletePrompt } from "./Api/Project/DeletePrompt.js";

const upload = multer({ dest: "uploads/" });
export const prisma = new PrismaClient();
const app = express();
dotenv.config();

async function main() {
  try {
    app.use(cors({ origin: "*" }));
    app.use(express.json());
    app.use(morgan("tiny"));

    app.use("/api/create-project/", createProject);
    app.use("/api/create-prompt/", createPrompt);
    app.use("/api/create-vector-collection/", createVectorCollection);

    app.use("/api/get-all-projects/", getAllProjects);
    app.use("/api/get-project/", getProject);
    app.use("/api/get-properties/", getTypesPrtoperties);

    app.use("/api/update-properties/", updateProperty);
    app.use("/api/update-prompt/", updatePrompt);

    app.use("/api/delete-vector-collection/", deleteVectorCollection);
    app.use("/api/delete-prompt/", deletePrompt);

    app.post("/api/upload/", upload.single("file"), (req, res) => {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded." });
      }
      weaviateDistribution(
        req.body.collectionName,
        req.body.collectionStructure,
        `${req.file.path}`,
        res
      );
      console.log(`File uploaded: ${req.file.originalname}`);
    });

    // Блок инитиализации клиентов
    // await initializationGptClient(process.env.IS_USING_PROXY);
    // await initializationWeaviteClient(process.env.IS_USING_WEAVIATE_SANDBOX);
    // await initializationTgBot(process.env.TG_BOT_API_KEY);
    // await distributor();

    app.listen(
      process.env.PORT,
      console.log(
        `🚀 Сервер успешно запущен в ${process.env.NODE_ENV} mode на порту ${process.env.PORT}.`
      )
    );
  } catch (error) {
    console.error("Error during initialization:", error);
    throw error;
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
