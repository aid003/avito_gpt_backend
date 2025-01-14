-- CreateTable
CREATE TABLE "PropertyMeta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "isEditable" BOOLEAN NOT NULL DEFAULT true
);
