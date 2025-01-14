/*
  Warnings:

  - A unique constraint covering the columns `[id,type]` on the table `Prompts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Prompts_id_type_key" ON "Prompts"("id", "type");
