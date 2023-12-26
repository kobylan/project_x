const pgp = require('pg-promise')();
const bcrypt = require('bcrypt');

const db = pgp('postgresql://postgres:kobik2007@localhost:5432/Registration%20Form');

async function saveUser(username, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await db.one('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, hashedPassword]);
  return result;
}

async function findUserByUsernameAndPassword(username, password) {
  const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);

  if (user && (await bcrypt.compare(password, user.password))) {
    return user;
  }

  return null;
}

module.exports = {
  saveUser,
  findUserByUsernameAndPassword,
};
