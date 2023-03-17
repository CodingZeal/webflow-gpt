require('dotenv').config()
const axios = require('axios');
const db = require('../../database')(false)

const postsTable = 'posts'
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

const addBlogsToDb = (webflowId, postName, previousMetaDescription, postBody, postBodyMarkdown) => {
  db.get(`SELECT webflow_id, post_name, previous_meta_description, post_body, post_body_markdown FROM ${postsTable} WHERE webflow_id = "${webflowId}"`, function(error, post) {
    if (error) {
      console.error(error.message)
    }

    if (post) {
      const updatePost = db.prepare(`UPDATE ${postsTable} SET post_name = (?), previous_meta_description = (?), post_body = (?), post_body_markdown = (?) WHERE webflow_id = (?)`)
      updatePost.run(postName, previousMetaDescription, postBody, postBodyMarkdown, function(error) {
        if (error) {
          console.error(`Error updating Webflow ID ${webflowId}: ${error.message}`)
        }
        console.log(`Updated Webflow ID ${webflowId}`)
      })
    } else {
      const addPost = db.prepare(`INSERT INTO ${postsTable} (webflow_id, post_name, previous_meta_description, post_body, post_body_markdown) VALUES (?, ?, ?, ?, ?)`)
      addPost.run(webflowId, postName, previousMetaDescription, postBody, postBodyMarkdown, function(error) {
        if(error) {
          console.log(`Error adding Webflow ID ${webflowId}: ${error.message}`)
        }
        console.log(`Added Webflow ID ${webflowId}`)
      })
    }
  })
}

getWebflowBlogItems()
  .then(posts => {
    posts.forEach(post => {
      const webflowId = post['_id']
      const postName = post['name']
      const previousMetaDescription = post['meta-description'] || null
      const postBody = post['post-body'] || null
      const postBodyMarkdown = post['post-body-markdown-optional'] || null

      addBlogsToDb(webflowId, postName, previousMetaDescription, postBody, postBodyMarkdown)
    })
  })
  .catch(error => console.error(error))

module.exports = getWebflowBlogItems