const users = require("../data/users.json");
const posts = require("../data/posts.json");
const posts_images = require("../data/post_images.json");
const comments = require("../data/comments.json");
const comment_images = require("../data/comment_images.json");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await knex("users").del();
  await knex("posts").del();
  await knex("post_images").del();
  await knex("comments").del();
  await knex("comment_images").del();
  await knex("saved_posts").del();
  await knex("post_alerts").del();

  // resets user_id to 1 each time the seed file is executed.
  await knex.raw("ALTER SEQUENCE users_id_seq RESTART WITH 1");
  await knex.raw("ALTER SEQUENCE posts_id_seq RESTART WITH 1");
  await knex.raw("ALTER SEQUENCE post_images_id_seq RESTART WITH 1");
  await knex.raw("ALTER SEQUENCE comments_id_seq RESTART WITH 1");
  await knex.raw("ALTER SEQUENCE comment_images_id_seq RESTART WITH 1");

  await knex("users").insert(users);
  await knex("posts").insert(posts);
  await knex("post_images").insert(posts_images);
  await knex("comments").insert(comments);
  await knex("comment_images").insert(comment_images);
};
