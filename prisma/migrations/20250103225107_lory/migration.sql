/*
  Warnings:

  - You are about to drop the column `contact` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `Users` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Users" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL DEFAULT 'Не указано',
    "sourceCreation" TEXT NOT NULL DEFAULT 'Не указано',
    "avitoId" TEXT,
    "tgId" TEXT,
    "otherId" TEXT,
    "projectId" INTEGER NOT NULL,
    "timeCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Users_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Users" ("avitoId", "name", "otherId", "projectId", "tgId", "userId") SELECT "avitoId", coalesce("name", 'Не указано') AS "name", "otherId", "projectId", "tgId", "userId" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_avitoId_key" ON "Users"("avitoId");
CREATE UNIQUE INDEX "Users_tgId_key" ON "Users"("tgId");
CREATE UNIQUE INDEX "Users_otherId_key" ON "Users"("otherId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
