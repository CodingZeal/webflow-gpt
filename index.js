const generateMetaDescription = require('./api/openai/generate')
const getWebflowBlogItems = require('./api/webflow')

getWebflowBlogItems()
  .then(items => items[0]['post-body'])
  .then(postBody => {
    generateMetaDescription(postBody)
      .then(metaDescription => {
        const formattedText = metaDescription[0].text.replaceAll('\n', '')
        console.log(formattedText)
      })
  })
