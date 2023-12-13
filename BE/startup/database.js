const Sqlite = require('sqlite3')

const { tables } = require('../db/queries')

class Database {
  constructor() {
    this.db = new Sqlite.Database('./database.db')
    this.initializeTables()
  }

  initializeTables() {
    this.db.serialize(() => {
      for (let query of Object.values(tables)) this.db.run(query)
    })
  }

  getDatabase() {
    if (!this.db) return new Database()

    return this.db
  }
}

const database = new Database()
Object.freeze(database)

module.exports = { database }
