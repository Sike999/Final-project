-- CreateTable
CREATE TABLE "GenreImages" (
    "id" SERIAL NOT NULL,
    "url" VARCHAR(550) NOT NULL,
    "genre" VARCHAR(150) NOT NULL,

    CONSTRAINT "GenreImages_pkey" PRIMARY KEY ("id")
);
