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
      prompt: `Read this blog post and generate a meta description with up to 150 characters: ${postBody}`,
      temperature: 0.2,
      max_tokens: 200,
    })
    return response.data.choices
  } catch(error) {
    console.error(`Error with OpenAI API request: ${error.message}`)
  }
}

module.exports = generateMetaDescription