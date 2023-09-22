/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `City` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "City_id_key" ON "City"("id");
