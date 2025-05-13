/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table("posts", (table) => {
        table.bigint("pet_weight").nullable().alter();
        table.bigint("pet_height").nullable().alter();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table('posts', (table) => {
    table.decimal("pet_weight", 5, 2).nullable().alter(); // Weight in pounds (Allows for 2 decimal places)
    table.decimal("pet_height", 4, 2).nullable().alter(); // Height in inches (Allows for 2 decimal places)
  })
};
