-- CreateTable
CREATE TABLE "Projects" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "gptModel" TEXT NOT NULL DEFAULT 'gpt-3.5-turbo-0125',
    "gptToken" TEXT NOT NULL DEFAULT 'default',
    "tgId" TEXT,
    "avitoClientId" TEXT,
    "avitoClientSecret" TEXT,
    "avitoUserId" TEXT,
    "isUsingRag" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "VectorCollections" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL DEFAULT 'default',
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "prjectId" INTEGER NOT NULL,
    CONSTRAINT "VectorCollections_prjectId_fkey" FOREIGN KEY ("prjectId") REFERENCES "Projects" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Prompts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'default',
    "content" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "Prompts_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Users" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "avitoId" TEXT,
    "tgId" TEXT,
    "otherId" TEXT,
    "name" TEXT,
    "contact" TEXT,
    "source" TEXT,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "Users_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Chats" (
    "chatId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role" TEXT,
    "content" TEXT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Chats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "VectorCollections_name_key" ON "VectorCollections"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Users_avitoId_key" ON "Users"("avitoId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_tgId_key" ON "Users"("tgId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_otherId_key" ON "Users"("otherId");
