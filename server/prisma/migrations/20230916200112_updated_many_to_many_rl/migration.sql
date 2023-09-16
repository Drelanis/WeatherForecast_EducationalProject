-- DropForeignKey
ALTER TABLE "Weather" DROP CONSTRAINT "Weather_city_id_fkey";

-- AddForeignKey
ALTER TABLE "Weather" ADD CONSTRAINT "Weather_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
