import asyncHandler from "express-async-handler";
import { prisma } from "../../index.js";

export const getTypesPrtoperties = asyncHandler(async (req, res) => {
  try {
    const properties = await prisma.propertyMeta.findMany();

    res.status(200);
    res.json(properties);
  } catch (error) {
    console.error("Error during createProject:", error);
    res.status(500);
    res.json({ message: "Server error" });
  }
});
