/**
 *
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("posts", (table) => {
    // Sets 'id' primary key
    table.increments("id").primary();

    // Foreign key referencing the users table
    table
      .integer("author_user_id")
      .unsigned() // Only accepts positive numbers
      .references("id")
      .inTable("users")
      // When the parent row is deleted, all children rows referencing the parent are deleted as well
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table.string("status").notNullable();
    table.string("title").notNullable();
    table.string("content").nullable();
    table.string("contact_email").notNullable();
    table.string("contact_phone_number").notNullable();
    table.string("pet_name").notNullable();
    table.decimal("weight", 5, 2).nullable(); // Weight in pounds (Allows for 2 decimal places)
    table.decimal("height", 4, 2).nullable(); // Height in inches (Allows for 2 decimal places)
    table.string("pet_breed").nullable();
    table.string("pet_color").nullable();
    table.string("last_seen_location").notNullable();
    table.decimal("last_seen_location_latitude", 10, 8).notNullable(); // 10 total digits, 8 after decimal
    table.decimal("last_seen_location_longitude", 11, 8).notNullable(); // 11 total digits, 8 after decimal

    // Creates created_at and updated_at columns and adjust accordingly
    table.timestamps(true, true); // first true: default to now, second true: allows updates
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("posts");
};
