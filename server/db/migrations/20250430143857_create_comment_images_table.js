/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("comment_images", (table) => {
    table.increments("id").primary();

    table
      .integer("comment_id")
      .unsigned() // Only accepts positive numbers
      .references("id")
      .inTable("comments")
      // When the post is deleted images are removed from db
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table.string("img_name").nullable();
    table.string("img_src").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("comment_images");
};
