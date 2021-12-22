exports.up = function (knex) {
  return knex.schema
    .createTable("roles", (tbl) => {
      tbl.increments();
      tbl.string("name", 128).notNullable();
    })
    .createTable("users", (tbl) => {
      tbl.increments('users_id');
      tbl.string("username", 128).notNullable().unique();
      tbl.string("password", 256).notNullable();
      tbl.integer("role").unsigned().defaultTo(1);
      tbl.foreign("role").references("roles.id");
      // .onDelete("RESTRICT")
      //.onUpdate("CASCADE")
      //.defaultTo(2)
    })
    .createTable('classes', table => {
      table.increments('class_id')
      table.string('name').notNullable()
      table.string('instructor_username')
      table.string('type')
      table.string('start_time')
      table.string('duration')
      table.string('intensity')
      table.string('location')
      table.integer('attendees').defaultTo(0)
      table.integer('class_size')
  })
    .createTable('class_clients', table => {
      table.increments('class_clients_id')
      table.integer('class_id')
        .unsigned()
        .notNullable()
        .references('class_id')
        .inTable('classes')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT')
      table.integer('user_id')
      .unsigned()
      .notNullable()
      .references('user_id')
      .inTable('users')
      .onDelete('RESTRICT')
      .onUpdate('RESTRICT')
  })
};

exports.down = function (knex) {
  return knex.schema
  .dropTableIfExists("users")
  .dropTableIfExists("roles")
  .dropTableIfExists('class_clients')
  .dropTableIfExists('classes')
};
