/*
  Warnings:

  - You are about to drop the `GenreImages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "GenreImages";

-- CreateTable
CREATE TABLE "genre_images" (
    "id" SERIAL NOT NULL,
    "url" VARCHAR(550) NOT NULL,
    "genre" VARCHAR(150) NOT NULL,

    CONSTRAINT "genre_images_pkey" PRIMARY KEY ("id")
);
