-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Projects" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT DEFAULT 'Это короткое описание вашего проекта.',
    "status" BOOLEAN NOT NULL DEFAULT true,
    "gptModel" TEXT NOT NULL DEFAULT 'gpt-3.5-turbo-0125',
    "gptTemperature" REAL NOT NULL DEFAULT 1.0,
    "gptTop_p" REAL NOT NULL DEFAULT 1.0,
    "openaiApiToken" TEXT NOT NULL DEFAULT 'default',
    "isUsingRag" BOOLEAN NOT NULL DEFAULT true,
    "embeddingModel" TEXT NOT NULL DEFAULT 'text-embedding-3-small',
    "modelSearch" TEXT NOT NULL DEFAULT 'similarity',
    "tgBusinessConnectionId" TEXT,
    "avitoClientId" TEXT,
    "avitoClientSecret" TEXT,
    "avitoUserId" TEXT,
    "timeCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Projects" ("avitoClientId", "avitoClientSecret", "avitoUserId", "description", "embeddingModel", "gptModel", "gptTemperature", "gptTop_p", "id", "isUsingRag", "modelSearch", "name", "openaiApiToken", "status", "tgBusinessConnectionId") SELECT "avitoClientId", "avitoClientSecret", "avitoUserId", "description", "embeddingModel", "gptModel", "gptTemperature", "gptTop_p", "id", "isUsingRag", "modelSearch", "name", "openaiApiToken", "status", "tgBusinessConnectionId" FROM "Projects";
DROP TABLE "Projects";
ALTER TABLE "new_Projects" RENAME TO "Projects";
CREATE UNIQUE INDEX "Projects_tgBusinessConnectionId_key" ON "Projects"("tgBusinessConnectionId");
CREATE UNIQUE INDEX "Projects_avitoClientId_key" ON "Projects"("avitoClientId");
CREATE UNIQUE INDEX "Projects_avitoClientSecret_key" ON "Projects"("avitoClientSecret");
CREATE UNIQUE INDEX "Projects_avitoUserId_key" ON "Projects"("avitoUserId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
