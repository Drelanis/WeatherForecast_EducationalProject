-- DropIndex
DROP INDEX "Token_token_key";

-- AlterTable
ALTER TABLE "City" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "City_id_seq";

-- AlterTable
ALTER TABLE "Token" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Token_pkey" PRIMARY KEY ("id");
