/*
  Warnings:

  - You are about to drop the column `tgId` on the `Projects` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Projects" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "gptModel" TEXT NOT NULL DEFAULT 'gpt-3.5-turbo-0125',
    "gptToken" TEXT NOT NULL DEFAULT 'default',
    "tgBusinessConnectionId" TEXT,
    "avitoClientId" TEXT,
    "avitoClientSecret" TEXT,
    "avitoUserId" TEXT,
    "isUsingRag" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Projects" ("avitoClientId", "avitoClientSecret", "avitoUserId", "description", "gptModel", "gptToken", "id", "isUsingRag", "name") SELECT "avitoClientId", "avitoClientSecret", "avitoUserId", "description", "gptModel", "gptToken", "id", "isUsingRag", "name" FROM "Projects";
DROP TABLE "Projects";
ALTER TABLE "new_Projects" RENAME TO "Projects";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
