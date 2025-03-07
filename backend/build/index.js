"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const api_1 = require("./api");
require("dotenv").config();
const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");
const app = express();
const PORT = 5000;
const prisma = new client_1.PrismaClient();
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
const upload = multer({ storage: multer.memoryStorage() });
function uploadToS3(fileBuffer, fileName, mimeType) {
    return __awaiter(this, void 0, void 0, function* () {
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
            const result = yield s3.send(command);
            const extracted_text = yield pdfParse(fileBuffer);
            const url = `https://ask-pdf-http-s3.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueName}`;
            yield prisma.$executeRaw `INSERT INTO pdf_details (file_name, extracted_text, url) 
    VALUES (${fileName}, ${extracted_text}, ${url})`;
            const embeddings = yield (0, api_1.generateEmbeddings)(extracted_text === null || extracted_text === void 0 ? void 0 : extracted_text.text);
            console.log("embeddings:", ...embeddings);
            // console.log("extractedSentences:", ...extractedSentences);
            return url;
        }
        catch (error) {
            console.error("Error uploading to S3:", error); // Log error details
            throw error;
        }
    });
}
// Routes 
app.post("/upload", upload.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded." });
        }
        const fileUrl = yield uploadToS3(req.file.buffer, req.file.originalname, req.file.mimetype);
        res.status(200).json({ message: "File uploaded successfully.", url: fileUrl });
    }
    catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ message: "File upload failed.", error: error });
    }
}));
app.get("/", (req, res) => {
    res.send("server working");
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
