/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    // Sets 'id' primary key
    table.increments("id").primary();
    // Username must exist and needs to be unique
    table.string("username").notNullable().unique();
    table.string("email").notNullable();
    table.string("password_hash").notNullable();
    table.string("about_me").nullable();
    // Link to users profile picture
    table.string("profile_pic").nullable();
    // User Location
    table.string("location").nullable();
    table.decimal("location_latitude", 10, 8).nullable(); // 10 total digits, 8 after decimal
    table.decimal("location_longitude", 11, 8).nullable(); // 11 total digits, 8 after decimal
    table.integer("saved_pets_count").nullable();
    // User role (Guest, User, Admin)
    table.string("role").notNullable();
    // Creates created_at and updated_at columns and adjust accordingly
    table.timestamps(true, true); // first true: default to now, second true: allows updates
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
