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
