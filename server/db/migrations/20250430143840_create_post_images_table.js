/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("post_images", (table) => {
    table.increments("id").primary();

    table
      .integer("post_id")
      .unsigned() // Only accepts positive numbers
      .references("id")
      .inTable("posts")
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
  return knex.schema.dropTable("post_images");
};
