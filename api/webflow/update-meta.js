require('dotenv').config()
const axios = require('axios');
const generateMetaDescription = require('../openai/generate')
const db = require('../../database')(false)

const postsTable = 'posts'
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const options = {
  headers: {
    accept: 'application/json',
    authorization: `Bearer ${process.env.WEBFLOW_API_KEY}`
  },
}

const patchWebflowMetaDescription = (postId, description) => {
  const data = {fields: { 'meta-description': description }}
  const endpoint = `https://api.webflow.com/collections/${process.env.WEBFLOW_BLOG_ID}/items/${postId}?live=true`

  axios.patch(endpoint, data, options)
  .then(() => console.log(`Added a new description for "${postId}" to Webflow\n`))
  .catch(error => console.error(error))
}


db.all(`SELECT * FROM ${postsTable}`, function(error, posts) {
  if (error) {
    console.error(error.message)
  }

  posts.forEach((post, index) => {
    const content = post.post_body || post.post_body_markdown

    wait(index * 15000)
    .then(() => {
      generateMetaDescription(content)
      .then(metaDescription => {
        const formattedText = metaDescription?.[0].text.replaceAll('\n', '')
        const description = metaDescription ? formattedText : ''
        const updateMeta = db.prepare(`UPDATE ${postsTable} SET ai_meta_description = (?) WHERE webflow_id = (?)`)
        
        updateMeta.run(description, post.webflow_id, function(error) {
          if (error) {
            console.log(error.message)
          }
          
          console.log(`Added a new description for "${post.post_name}" to the database`)
        })
        
        patchWebflowMetaDescription(post.webflow_id, formattedText)
      })
    })
    .catch(error => console.error(error))

  })
})
