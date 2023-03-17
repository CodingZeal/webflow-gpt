const db = require('./index')(true)

db.serialize(() => {
  const table = 'posts'
  console.log(`Creating ${table} table ...`)
  db.run(`CREATE TABLE IF NOT EXISTS ${table} (id INTEGER PRIMARY KEY AUTOINCREMENT, webflow_id TEXT NOT NULL, post_name TEXT DEFAULT NULL, previous_meta_description TEXT DEFAULT NULL, ai_meta_description TEXT DEFAULT NULL, post_body TEXT DEFAULT NULL, post_body_markdown TEXT DEFAULT NULL, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)`, (error) => {
    if (error) {
      throw new Error(error)
    }

    console.log(`✅ Successfully created ${table} table.`)
  });

  db.run(`CREATE TRIGGER IF NOT EXISTS update_time AFTER UPDATE ON ${table} BEGIN UPDATE ${table} SET updated_at = CURRENT_TIMESTAMP; END;`, (error) => {
    if (error) {
      throw new Error(`Error creating timestamp trigger: ${error.message}`)
    }
  })
})

db.close();