/*
  Warnings:

  - You are about to drop the column `prjectId` on the `VectorCollections` table. All the data in the column will be lost.
  - Added the required column `projectId` to the `VectorCollections` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VectorCollections" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL DEFAULT 'default',
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "VectorCollections_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_VectorCollections" ("description", "id", "name", "timestamp", "type") SELECT "description", "id", "name", "timestamp", "type" FROM "VectorCollections";
DROP TABLE "VectorCollections";
ALTER TABLE "new_VectorCollections" RENAME TO "VectorCollections";
CREATE UNIQUE INDEX "VectorCollections_name_key" ON "VectorCollections"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
