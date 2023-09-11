-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserToCity" (
    "user_id" INTEGER NOT NULL,
    "city_id" INTEGER NOT NULL,

    CONSTRAINT "UserToCity_pkey" PRIMARY KEY ("user_id","city_id")
);

-- CreateTable
CREATE TABLE "Weather" (
    "id" SERIAL NOT NULL,
    "city_id" INTEGER NOT NULL,

    CONSTRAINT "Weather_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Current_weather" (
    "id" SERIAL NOT NULL,
    "weather_id" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "current_weather" JSONB NOT NULL,

    CONSTRAINT "Current_weather_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Forecast_weather" (
    "id" SERIAL NOT NULL,
    "weather_id" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "forecast_weather" JSONB NOT NULL,

    CONSTRAINT "Forecast_weather_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserToCity_user_id_key" ON "UserToCity"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserToCity_city_id_key" ON "UserToCity"("city_id");

-- CreateIndex
CREATE UNIQUE INDEX "Weather_city_id_key" ON "Weather"("city_id");

-- CreateIndex
CREATE UNIQUE INDEX "Current_weather_weather_id_key" ON "Current_weather"("weather_id");

-- CreateIndex
CREATE UNIQUE INDEX "Forecast_weather_weather_id_key" ON "Forecast_weather"("weather_id");

-- AddForeignKey
ALTER TABLE "UserToCity" ADD CONSTRAINT "UserToCity_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToCity" ADD CONSTRAINT "UserToCity_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Weather" ADD CONSTRAINT "Weather_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Current_weather" ADD CONSTRAINT "Current_weather_weather_id_fkey" FOREIGN KEY ("weather_id") REFERENCES "Weather"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Forecast_weather" ADD CONSTRAINT "Forecast_weather_weather_id_fkey" FOREIGN KEY ("weather_id") REFERENCES "Weather"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
