/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("saved_posts", (table) => {
    // Foreign key referencing the users table
    table
      .integer("user_id")
      .unsigned() // Only accepts positive numbers
      .references("id")
      .inTable("users")
      // When user is deleted saved posts are deleted
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table
      .integer("post_id")
      .unsigned() // Only accepts positive numbers
      .references("id")
      .inTable("posts")
      // When the post is deleted saved post is deleted
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table.primary(["user_id", "post_id"]);

    // Creates created_at and updated_at columns and adjust accordingly
    table.timestamps(true, true); // first true: default to now, second true: allows updates
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("saved_posts");
};
