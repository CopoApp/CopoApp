/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table("posts", (table) => {
    table.string("contact_email").nullable().alter();
    table.string("contact_phone_number").nullable().alter();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table("posts", (table) => {
    table.string("contact_email").notNullable().alter();
    table.string("contact_phone_number").notNullable().alter();
  });
};
