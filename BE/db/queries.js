const tables = {
  user: `CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, username TEXT UNIQUE, email TEXT UNIQUE, password TEXT, created_at INTEGER, updated_at INTEGER, color TEXT)`,
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
  user: 'INSERT INTO user (name, username, email, password, created_at, updated_at, color) VALUES(?, ?, ?, ?, ?, ?, ?)',
  post: `INSERT INTO post (description, created_at, updated_at, user_id) values(?, ?, ?, ?)`,
}

const update = {
  user: 'UPDATE user SET username = ?, email = ?, name = ? WHERE id = ?',
  updateUserWithPassword: 'UPDATE user SET username = ?, email = ?, name = ?, password = ? WHERE id = ?',
  post: `UPDATE post SET description = ?, updated_at = ? WHERE id = ?`,
}

const get = {
  postByUserId: `SELECT json_object(
            'id', t1.id,
            'created_at', t1.created_at,
            'updated_at', t1.updated_at,
            'description', t1.description, 
            'user', json_object('id', t2.id, 'name', t2.name, 'username', t2.username, 'email', t2.email, 'color', t2.color)           
            ) col
          FROM post t1 INNER JOIN user t2 
          ON t2.id = t1.user_id
          WHERE t1.user_id = ?
          ORDER BY t1.created_at DESC LIMIT 1`,
  postById: `SELECT json_object(
            'id', t1.id,
            'created_at', t1.created_at,
            'updated_at', t1.updated_at,
            'description', t1.description, 
            'user', json_object('id', t2.id, 'name', t2.name, 'username', t2.username, 'email', t2.email, 'color', t2.color)           
            ) col
          FROM post t1 INNER JOIN user t2 
          ON t2.id = t1.user_id
          WHERE t1.id = ?
          `,
  allPosts: `SELECT json_group_array(json_object(
            'id', t1.id,
            'created_at', t1.created_at,
            'updated_at', t1.updated_at,
            'description', t1.description, 
            'user', json_object('id', t2.id, 'name', t2.name, 'username', t2.username, 'email', t2.email, 'color', t2.color)           
            )) posts
          FROM post t1 INNER JOIN user t2 
          ON t2.id = t1.user_id
          `,
}

const remove = {
  postById: 'DELETE FROM post WHERE id = ?',
}

module.exports = {
  tables,
  insert,
  update,
  get,
  remove,
}
