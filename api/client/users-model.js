const db = require("../data/db-config");

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db("users as u")
    .join("roles as r", "u.role", "=", "r.id")
    .select("u.user_id", "u.username", "r.name as role");
}

function findBy(filter) {
  return db("users as u")
    .join("roles as r", "u.role", "=", "r.id")
    .select("u.user_id", "u.username", "r.name as role", "u.password")
    .where(filter);
}

async function add(user) {
  const [user_id] = await db("users").insert(user);
  return findById(user_id);
}

function findById(id) {
  return db("users as u")
    .join("roles as r", "u.role", "=", "r.id")
    .select("u.user_id", "u.username", "r.name as role")
    .where("u.user_id", id)
    .first();
}
