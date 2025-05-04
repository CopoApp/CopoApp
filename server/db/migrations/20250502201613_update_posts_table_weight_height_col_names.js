/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table("posts", (table) => {
    table.renameColumn("weight", "pet_weight");
    table.renameColumn("height", "pet_height");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table("posts", (table) => {
    table.renameColumn("pet_weight", "weight");
    table.renameColumn("pet_height", "height");
  });
};
