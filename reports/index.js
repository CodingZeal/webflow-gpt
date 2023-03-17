

const db = require('../database')(false)
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = (path) => {
  return createCsvWriter({
    path: path,
    header: [
      {id: 'id', title: 'ID'},
      {id: 'webflow_id', title: 'Webflow ID'},
      {id: 'post_name', title: 'Post Name'},
      {id: 'previous_meta_description', title: 'Previous Meta Description'},
      {id: 'ai_meta_description', title: 'AI Meta Description'},
      {id: 'created_at', title: 'Created At'},
      {id: 'updated_at', title: 'Updated At'},
    ]
  })
}

db.all('SELECT * FROM posts', function(error, rows) {
  if (error) {
    console.error(error)
  }
  console.log('Writing posts.csv ... \n')
  csvWriter('./reports/posts.csv').writeRecords(rows)
})
