import { Response, Request } from "express";
import { MimeType, multerRequest } from "./types/types";
import { PrismaClient } from "@prisma/client";
import { generateEmbeddings } from "./api";
require("dotenv").config();
const express = require("express");
import cors from "cors";
const multer = require("multer");
const pdfParse = require("pdf-parse");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");
import weaviate, { WeaviateClient, ApiKey } from 'weaviate-ts-client';


const app = express();
app.use(cors()); 

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

async function createPdfDetailsClass(client: WeaviateClient) {
  const classObj = {
    class: 'PdfDetails',
    vectorizer: 'none',  // Since you're providing custom vectors
    properties: [
      {
        name: 'fileName',
        dataType: ['string'],
      },
      {
        name: 'extractedText',
        dataType: ['text'],
      },
      {
        name: 'url',
        dataType: ['string'],
      },
    ],
  };

  try {
    await client.schema.classCreator().withClass(classObj).do();
    console.log('PdfDetails class created successfully');
  } catch (error) {
    console.error('Error creating PdfDetails class:', error);
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

// ...existing code...

app.post("/upload_video", async (req: Request, res: Response) => {
  try {
    const { url, title } = req.body;
    
    if (!url || !title) {
      return res.status(400).json({ message: "URL and title are required." });
    }

    await prisma.$executeRaw`INSERT INTO video_details (url, title) VALUES (${url}, ${title})`;
    
    res.status(200).json({ message: "Video details uploaded successfully." });
  } catch (error) {
    console.error("Error uploading video details:", error);
    res.status(500).json({ message: "Failed to upload video details.", error });
  }
});

app.get("/fetch_all_pdf", async (req: Request, res: Response) => {
  try {
    const pdfs = await prisma.$queryRaw`SELECT * FROM pdf_details`;
    res.status(200).json(pdfs);
  } catch (error) {
    console.error("Error fetching PDFs:", error);
    res.status(500).json({ message: "Failed to fetch PDFs.", error });
  }
});

app.get("/fetch_all_video", async (req: Request, res: Response) => {
  try {
    const videos = await prisma.$queryRaw`SELECT * FROM video_details`;
    res.status(200).json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ message: "Failed to fetch videos.", error });
  }
});

// ...existing code...

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
