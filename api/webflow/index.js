require('dotenv').config()
const axios = require('axios');

const blogItemsEndpoint = `https://api.webflow.com/collections/${process.env.WEBFLOW_BLOG_ID}/items`;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    authorization: `Bearer ${process.env.WEBFLOW_API_KEY}`
  },
  url: blogItemsEndpoint
};

const getWebflowBlogItems = async () => {
  try {
    const payload = await axios(options)
    return payload.data.items
  } catch(error) {
    throw `Error with Webflow API request: ${error.message}`
  }
}

module.exports = getWebflowBlogItems