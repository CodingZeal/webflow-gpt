const generateMetaDescription = require('./api/openai/generate')
const getWebflowBlogItems = require('./api/webflow')

getWebflowBlogItems()
  .then(items => {
    console.log(items[0])
    return items[0]['post-body-markdown-optional']
    // Some blogs have 'post-body-markdown-optional' and some have 'post-body'. We need to make sure it has the right data, other wise we're gonna get something whack.
  })
  .then(postBody => {
    generateMetaDescription(postBody)
      .then(metaDescription => {
        const formattedText = metaDescription[0].text.replaceAll('\n', '')
        console.log(formattedText)
      })
  })
