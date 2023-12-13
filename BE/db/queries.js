const tables = {
  user: `CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, username TEXT UNIQUE, email TEXT UNIQUE, password TEXT, created_at INTEGER, updated_at INTEGER)`,
  posts: `CREATE TABLE IF NOT EXISTS post (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    description TEXT, 
    created_at INTEGER, 
    updated_at INTEGER,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES user(id)
  )`,
}

const insert = {
  user: 'INSERT INTO user (name, username, email, password, created_at, updated_at) VALUES(?, ?, ?, ?, ?, ?)',
}

module.exports = {
  tables,
  insert,
}
