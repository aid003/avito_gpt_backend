/*
  Warnings:

  - A unique constraint covering the columns `[tgId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Users_tgId_key" ON "Users"("tgId");
