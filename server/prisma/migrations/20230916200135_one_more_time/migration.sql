/*
  Warnings:

  - You are about to drop the `_CityToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CityToUser" DROP CONSTRAINT "_CityToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_CityToUser" DROP CONSTRAINT "_CityToUser_B_fkey";

-- DropTable
DROP TABLE "_CityToUser";

-- CreateTable
CREATE TABLE "UserToCity" (
    "userId" TEXT NOT NULL,
    "cityId" INTEGER NOT NULL,

    CONSTRAINT "UserToCity_pkey" PRIMARY KEY ("userId","cityId")
);

-- AddForeignKey
ALTER TABLE "UserToCity" ADD CONSTRAINT "UserToCity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToCity" ADD CONSTRAINT "UserToCity_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;
