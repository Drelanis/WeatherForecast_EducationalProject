/*
  Warnings:

  - You are about to drop the `UserToCity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserToCity" DROP CONSTRAINT "UserToCity_city_id_fkey";

-- DropForeignKey
ALTER TABLE "UserToCity" DROP CONSTRAINT "UserToCity_user_id_fkey";

-- DropTable
DROP TABLE "UserToCity";

-- CreateTable
CREATE TABLE "_CityToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CityToUser_AB_unique" ON "_CityToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CityToUser_B_index" ON "_CityToUser"("B");

-- AddForeignKey
ALTER TABLE "_CityToUser" ADD CONSTRAINT "_CityToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CityToUser" ADD CONSTRAINT "_CityToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
