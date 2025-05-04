/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table("comments", (table) => {
    table.string("location_embed").nullable().alter();
    table.decimal("location_embed_latitude", 10, 8).nullable().alter(); // 10 total digits, 8 after decimal
    table.decimal("location_embed_longitude", 11, 8).nullable().alter(); // 11 total digits, 8 after decimal
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table("comments", (table) => {
    table.string("location_embed").notNullable().alter();
    table.decimal("location_embed_latitude", 10, 8).notNullable().alter(); // 10 total digits, 8 after decimal
    table.decimal("location_embed_longitude", 11, 8).notNullable().alter(); // 11 total digits, 8 after decimal
  });
};
