import { client } from "../../Initialization/InitializationWeaviateClient.js";
import { loadMultipartData } from "../../WeaviateHandlers/LoadMultipartData.js";
import {
  uploadJsonDataToVectorCollections,
  uploadTxtDataToVectorCollections,
} from "../Middleware/UploadFile.js";

export async function weaviateDistribution(
  collectionsName,
  collectionStructureType,
  path,
  res
) {
  if (collectionStructureType === "empty") {
    uploadTxtDataToVectorCollections(path, (err, result) => {
      if (err) {
        console.error("Ошибка:", err);
        res.status(400).json({ error: "No file uploaded." });
      } else {
        loadMultipartData(client, collectionsName, result).then((stat) => {
          if (stat) {
            res.status(200).json({ message: "File uploaded successfully." });
          } else {
            res.status(400).json({ error: "No file uploaded." });
          }
        });
      }
    });
  } else if (collectionStructureType === "properties") {
    uploadJsonDataToVectorCollections(path, (err, json) => {
      if (err) {
        res.status(400).json({ error: "No file uploaded." });
      }

      loadMultipartData(client, collectionsName, json).then((stat) => {
        if (stat) {
          res.status(200).json({ message: "File uploaded successfully." });
        } else {
          res.status(400).json({ error: "No file uploaded." });
        }
      });
    });
  }
}
