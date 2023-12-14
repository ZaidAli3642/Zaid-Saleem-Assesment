const { database } = require('../startup/database')

const db = database.getDatabase()

const insert = (query = '', params = []) => {
  return new Promise((resolve, reject) => {
    db.run(query, params, err => {
      if (err) reject(err)

      resolve()
    })
  })
}

const get = (query = '', params = []) => {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) reject(err)

      resolve(row)
    })
  })
}

const all = (query = '', params = []) => {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, row) => {
      if (err) reject(err)

      resolve(row)
    })
  })
}

const update = (query, params) => {
  return new Promise((resolve, reject) => {
    db.run(query, params, err => {
      if (err) reject(err)

      resolve()
    })
  })
}

const remove = (query, params) => {
  return new Promise((resolve, reject) => {
    db.run(query, params, err => {
      if (err) reject(err)

      resolve()
    })
  })
}

const getLatest = (columns = [], tableName) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT ${columns.toString()} FROM ${tableName} ORDER BY created_at DESC LIMIT 1`, [], (err, row) => {
      if (err) reject(err)

      resolve(row)
    })
  })
}

module.exports = {
  insert,
  getLatest,
  get,
  update,
  all,
  remove,
}
