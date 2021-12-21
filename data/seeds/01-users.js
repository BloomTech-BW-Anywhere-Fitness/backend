exports.seed = async function (knex) {
  // 000-cleanup.js already cleaned out all tables

  await knex("roles").insert([{ name: "instructor" }, { name: "client" }]);
  await knex("users").insert({
    username: "instructor",
    password: "$2a$08$CjOzAqkUXePlNyZCG6TKuubIY.MpjKqOdrV/W3178ah483kyEbeSe", // plain text password is 1234
    role: 1,
  });
};
