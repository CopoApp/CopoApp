/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("comments", (table) => {
    table.increments("id").primary();

    table
      .integer("user_id")
      .unsigned() // Only accepts positive numbers
      .references("id")
      .inTable("users")
      // When the user is deleted from the db their comment remains stored
      .onDelete("SET NULL")
      .onUpdate("CASCADE");

    table
      .integer("post_id")
      .unsigned() // Only accepts positive numbers
      .references("id")
      .inTable("posts")
      // If post is deleted comments are deleted as well
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table.string("content").notNullable();

    table.string("location_embed").notNullable();
    table.decimal("location_embed_latitude", 10, 8).notNullable(); // 10 total digits, 8 after decimal
    table.decimal("location_embed_longitude", 11, 8).notNullable(); // 11 total digits, 8 after decimal

    table.timestamps(true, true); // first true: default to now, second true: allows updates
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("comments");
};
