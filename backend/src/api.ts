import axios from "axios";
import weaviate, { WeaviateClient, ApiKey } from 'weaviate-ts-client';
const { Configuration, OpenAIApi } = require('openai');

export const generateEmbeddings = async (text : any) => {
  try {
    if (typeof text !== "string") {
      console.error("generateEmbeddings expects a string.");
      return null;
    }

    const sentences = text
      .split(/(?<=[.?!])\s+/)
      .map((sentence) => sentence.trim()) 
      .filter((sentence) => sentence.length > 0);

    const payload = { inputs : {
      source_sentence : "",
      sentences
    } };

    console.log("payload",payload)

    const response = await fetch(
      "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2",
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACEAPI_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error("Hugging Face API Error:", data.error);
      return null;
    }

    return data; 
  } catch (error) {
    console.error("Error generating embeddings:", error);
    return null;
  }
};

export async function retrieveRelevantContext(query: string, filename: string): Promise<string> {
  const queryEmbedding = await generateEmbeddings(query);

  const client: WeaviateClient = weaviate.client({
    scheme: 'https',
    host: process.env.WCD_URL || '',
    apiKey: new ApiKey(process.env.WCD_API_KEY || ''),
  });

  try {
    const result = await client.graphql
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
  } catch (error) {
    console.error('Error retrieving context from Weaviate:', error);
    return '';
  }
}