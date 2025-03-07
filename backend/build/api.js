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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEmbeddings = void 0;
exports.retrieveRelevantContext = retrieveRelevantContext;
const weaviate_ts_client_1 = __importStar(require("weaviate-ts-client"));
const { Configuration, OpenAIApi } = require('openai');
const generateEmbeddings = (text) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (typeof text !== "string") {
            console.error("generateEmbeddings expects a string.");
            return null;
        }
        const sentences = text
            .split(/(?<=[.?!])\s+/)
            .map((sentence) => sentence.trim())
            .filter((sentence) => sentence.length > 0);
        const payload = { inputs: {
                source_sentence: "",
                sentences
            } };
        console.log("payload", payload);
        const response = yield fetch("https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2", {
            method: "POST",
            body: JSON.stringify(payload),
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
        return data;
    }
    catch (error) {
        console.error("Error generating embeddings:", error);
        return null;
    }
});
exports.generateEmbeddings = generateEmbeddings;
function retrieveRelevantContext(query, filename) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryEmbedding = yield (0, exports.generateEmbeddings)(query);
        const client = weaviate_ts_client_1.default.client({
            scheme: 'https',
            host: process.env.WCD_URL || '',
            apiKey: new weaviate_ts_client_1.ApiKey(process.env.WCD_API_KEY || ''),
        });
        try {
            const result = yield client.graphql
                .get()
                .withClassName('PdfDetails')
                .withFields('fileName, extractedText')
                .withNearVector({
                vector: queryEmbedding,
                certainty: 0.7,
            })
                .withWhere({
                path: ['fileName'],
                operator: 'Equal',
                valueString: filename
            })
                .withLimit(1)
                .do();
            const relevantDocument = result.data.Get.PdfDetails[0];
            return relevantDocument ? relevantDocument.extractedText : '';
        }
        catch (error) {
            console.error('Error retrieving context from Weaviate:', error);
            return '';
        }
    });
}
