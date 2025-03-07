import { Response } from "express";
import { MimeType, multerRequest } from "./types/types";
import { PrismaClient } from "@prisma/client";
import { generateEmbeddings, retrieveRelevantContext } from "./api";
require("dotenv").config();
const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");
import weaviate, { WeaviateClient, ApiKey } from 'weaviate-ts-client';
import OpenAI from "openai";


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

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const upload = multer({ storage: multer.memoryStorage() });

async function createPdfDetailsClass(client: WeaviateClient) {
  const className = 'PdfDetails';
  
  try {
    const classExists = await client.schema.exists(className);
    if (classExists) {
      console.log(`Class ${className} already exists. Skipping creation.`);
      return;
    }

    const classObj = {
      class: className,
      vectorizer: 'none',
      properties: [
        { name: 'fileName', dataType: ['string'] },
        { name: 'extractedText', dataType: ['text'] },
        { name: 'url', dataType: ['string'] },
      ],
    };

    await client.schema.classCreator().withClass(classObj).do();
    console.log(`${className} class created successfully`);
  } catch (error) {
    console.error(`Error handling ${className} class:`, error);
  }
}

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
    const userQuery = 'what is knowledge based systems';
    const context = await retrieveRelevantContext(userQuery, fileName);
    const prompt = `Context:\n${context}\n\nQuestion: ${userQuery}\nAnswer:`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
    });
    
    const answer = response?.choices[0]?.message?.content?.trim();

    console.log("answer",answer)

    console.log("embeddings:", ...embeddings);

    const client: WeaviateClient = await weaviate.client({
      scheme: 'https',
      host: wcdUrl,
      apiKey: new ApiKey(wcdApiKey),
    });
    
    await createPdfDetailsClass(client);


    console.log('Data object with embeddings stored successfully.');

    return url;
  } catch (error) {
    console.error("Error uploading to S3:", error);
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
