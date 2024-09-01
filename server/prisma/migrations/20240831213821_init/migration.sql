-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector";

-- CreateTable
CREATE TABLE "TextData" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "embedding" vector,

    CONSTRAINT "TextData_pkey" PRIMARY KEY ("id")
);
