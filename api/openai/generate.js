require('dotenv').config()
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateMetaDescription = async (postBody) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `In at least 100 words, write a SEO meta description for this text: ${postBody}`,
      temperature: 0.6,
      max_tokens: 100,
    });
    return response.data.choices;
  } catch(error) {
    throw `Error with OpenAI API request: ${error.message}`;
  }
}

module.exports = generateMetaDescription