import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/hf_transformers";
// import { HfInference } from '@huggingface/inference';
import Embedding from "../models/embedding.model.js";
import { cosineSimilarity } from "../utils/similarity.js";
import dotenv from "dotenv";
dotenv.config();

const promptTemplate = `
You are an AI assistant called "College Companion" that acts as a "College Guide" by answering questions based on provided context. Your goal is to directly address the question concisely and to the point, without excessive elaboration. You are a friendly and helpful assistant. Please answer the question based on the context provided. If the question is outside the context or if you don't know the answer, kindly say, "I'm sorry, but I don't have that information. Would you like to provide more details? but don't say like "I can help you if you provide more context" you are an assistant user are there to interact with you and ask you about their college queries, data is provided by your mainatiner to you user's doesn't provide any context to you" 

To generate your answer:

- Carefully analyze the question and identify the key information needed to address it
- Locate the specific parts of each context that contain this key information
- Concisely summarize the relevant information from the higher-scoring context(s) in your own words
- Provide a direct answer to the question
- Use Markdown Formatting: When generating your answer, use suitable Markdown practices, including:
  - Bold for emphasis on important points.
  - Italics for additional emphasis or to highlight specific terms.
  - Bullet points for lists to improve clarity and readability.
- Give detailed and accurate responses for long-form questions.
If no context is provided, introduce yourself and explain that the user can save content which will allow you to answer questions about that content in the future. Do not provide an answer if no context is provided.

Context: {context}

Question: {question}
`;

const chatModel = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
});

const model = new HuggingFaceTransformersEmbeddings({
  model: "Xenova/all-MiniLM-L6-v2",
});

export const getResponse = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      res.status(400).json({
        message: "query is not present in body",
      });
    }
    // vector embedding from user queries
    const userQueryEmbeddings = await model.embedQuery(query);

    // get embedding from db
    const embeddings = await Embedding.find({});

    const results = embeddings.map((embedding) => ({
      text: embedding.text,
      similarity: cosineSimilarity(embedding.embedding, userQueryEmbeddings),
    }));

    // sorting results by similarity
    results.sort((a, b) => b.similarity - a.similarity);
    const topResults = results.slice(0, 5); // top 5 results

    const prompt = ChatPromptTemplate.fromTemplate(promptTemplate);
    const chain = prompt.pipe(chatModel);

    // getting ragbot response from user query
    const response = await chain.invoke({
      context: topResults.map((result) => result.text).join("\n"),
      question: query,
    });

    // console.log(response.content);

    // Process the response text to extract links and points
    const responseText = response.content;
    const linkRegex = /\[(.*?)\]\((.*?)\)/g;
    const links = [];
    let processedText = responseText.replace(linkRegex, (match, text, url) => {
      links.push({ text, url });
      return `- [${text}](${url})`;
    });
    console.log(processedText, links);

    const points = processedText
      .split("\n")
      .filter((line) => line.startsWith("- "));
    console.log(points);

    return res.status(200).json({
      message: "response genrated successfully",
      response: response.content.toString(),
      links: links,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error in getting response from ragbot",
    });
  }
};
