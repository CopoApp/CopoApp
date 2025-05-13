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
      // When the comment is deleted the image is deleted as well from the comment_images table
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
