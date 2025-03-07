/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "pdf_details" (
    "id" SERIAL NOT NULL,
    "file_name" VARCHAR(50) NOT NULL,
    "extracted_text" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pdf_details_pkey" PRIMARY KEY ("id")
);
