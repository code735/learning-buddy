import { Response } from "express";
import { MimeType, multerRequest } from "./types/types";
import { PrismaClient } from "@prisma/client";
import { generateEmbeddings } from "./api";
require("dotenv").config();
const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");
import weaviate, { WeaviateClient } from 'weaviate-client';


const app = express();
const PORT = 5000;
const prisma = new PrismaClient()

const wcdUrl = process.env.WCD_URL as string;
const wcdApiKey = process.env.WCD_API_KEY as string;


const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const upload = multer({ storage: multer.memoryStorage() });

async function uploadToS3(fileBuffer: Buffer, fileName: string, mimeType: MimeType) {

  const uuid = uuidv4();
  const encodedUuid = Buffer.from(uuid).toString('base64').slice(0, 5);
  const uniqueName = `ask-pdf-${encodedUuid}`;

  const params = {
    Bucket: "ask-pdf-http-s3",
    Key: uniqueName,
    Body: fileBuffer,
    ContentType: mimeType,
  };

  console.log("S3 Upload Params:", params);

  const command = new PutObjectCommand(params);

  try {
    const result = await s3.send(command);

    const extracted_text = await pdfParse(fileBuffer)
    const url = `https://ask-pdf-http-s3.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueName}`

    await prisma.$executeRaw`INSERT INTO pdf_details (file_name, extracted_text, url) 
    VALUES (${fileName}, ${extracted_text}, ${url})`;

    const embeddings = await generateEmbeddings(extracted_text?.text);
    console.log("embeddings:", ...embeddings);

    return url;
  } catch (error) {
    console.error("Error uploading to S3:", error); // Log error details
    throw error;
  }
}

app.post("/upload", upload.single("file"), async (req: multerRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const fileUrl = await uploadToS3(req.file.buffer, req.file.originalname, req.file.mimetype);

    res.status(200).json({ message: "File uploaded successfully.", url: fileUrl });
  } catch (error: unknown) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "File upload failed.", error: error });
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send("server working")
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
