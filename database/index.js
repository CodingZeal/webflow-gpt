const sqlite3 = require('sqlite3').verbose()
const dbName = 'DB_WEBFLOW'


module.exports = function(verbose) {
  const logger = (error, verbose) => {
    if (error) {
      throw new Error(error)
    }

    if (verbose) {
      console.log(`✅ Successfully created database: ${dbName}`)
    }

    return
  }

  return new sqlite3.Database(`./database/${dbName}`, (error) => logger(error, verbose))
}