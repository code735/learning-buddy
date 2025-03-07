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
exports.generateEmbeddings = void 0;
const generateEmbeddings = (text) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (typeof text !== "string") {
            console.error("generateEmbeddings expects a string.");
            return null;
        }
        // Split the text into sentences
        const sentences = text
            .split(/(?<=[.?!])\s+/) // Split at punctuation followed by space
            .map((sentence) => sentence.trim()) // Remove spaces
            .filter((sentence) => sentence.length > 0); // Remove empty lines
        const payload = { inputs: {
                source_sentence: "",
                sentences
            } };
        console.log("payload", payload);
        const response = yield fetch("https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2", {
            method: "POST",
            body: JSON.stringify(payload), // ✅ Send as an array
            headers: {
                Authorization: `Bearer ${process.env.HUGGINGFACEAPI_KEY}`,
                "Content-Type": "application/json",
            },
        });
        const data = yield response.json();
        if (data.error) {
            console.error("Hugging Face API Error:", data.error);
            return null;
        }
        return data; // Returns embeddings
    }
    catch (error) {
        console.error("Error generating embeddings:", error);
        return null;
    }
});
exports.generateEmbeddings = generateEmbeddings;
