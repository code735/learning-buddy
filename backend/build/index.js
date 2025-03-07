"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
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
const weaviate_ts_client_1 = __importStar(require("weaviate-ts-client"));
const openai_1 = __importDefault(require("openai"));
const app = express();
const PORT = 5000;
const prisma = new client_1.PrismaClient();
const wcdUrl = process.env.WCD_URL;
const wcdApiKey = process.env.WCD_API_KEY;
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
const upload = multer({ storage: multer.memoryStorage() });
function createPdfDetailsClass(client) {
    return __awaiter(this, void 0, void 0, function* () {
        const className = 'PdfDetails';
        try {
            const classExists = yield client.schema.exists(className);
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
            yield client.schema.classCreator().withClass(classObj).do();
            console.log(`${className} class created successfully`);
        }
        catch (error) {
            console.error(`Error handling ${className} class:`, error);
        }
    });
}
function uploadToS3(fileBuffer, fileName, mimeType) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
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
            const userQuery = 'what is knowledge based systems';
            const context = yield (0, api_1.retrieveRelevantContext)(userQuery, fileName);
            const prompt = `Context:\n${context}\n\nQuestion: ${userQuery}\nAnswer:`;
            const response = yield openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
                max_tokens: 150,
            });
            const answer = (_c = (_b = (_a = response === null || response === void 0 ? void 0 : response.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.trim();
            console.log("answer", answer);
            console.log("embeddings:", ...embeddings);
            const client = yield weaviate_ts_client_1.default.client({
                scheme: 'https',
                host: wcdUrl,
                apiKey: new weaviate_ts_client_1.ApiKey(wcdApiKey),
            });
            yield createPdfDetailsClass(client);
            console.log('Data object with embeddings stored successfully.');
            return url;
        }
        catch (error) {
            console.error("Error uploading to S3:", error);
            throw error;
        }
    });
}
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
