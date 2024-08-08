import * as dotenv from "dotenv";
import { createError } from "../../server/error.js";
import openai from "openai";

dotenv.config();

// Setup open ai api key
const configuration = {
  apiKey: process.env.OPENAI_API_KEY,
};
const openaiClient = new openai.OpenAIApi(configuration);

// Controller to generate Image
export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    const response = await openaiClient.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    const generatedImage = response.data.data[0].b64_json;
    res.status(200).json({ photo: generatedImage });
  } catch (error) {
    next(
      createError(
        error.status,
        error?.response?.data?.error.message || error.message
      )
    );
  }
};
