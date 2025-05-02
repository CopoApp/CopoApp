const User = require("../../models/User");
const Post = require("../../models/Post");
const Comment = require("../../models/Comment");
const {
  users,
  posts,
  post_images,
  comments,
  comment_images,
  saved_posts,
  post_alerts,
} = require("../data/seedData");

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

  for (let user of users) {
    await User.create(user.email, user.username, user.password, user.role);
  }

  for (let post of posts) {
    await Post.create(
      post.userId,
      post.type,
      post.title,
      post.description,
      post.userEmail,
      post.contactPhone,
      post.petName,
      post.location,
      post.latitude,
      post.longitude
    );
  }

  for (let comment of comments) {
    await Comment.create(
      comment.user_id,
      comment.post_id,
      comment.content,
      comment.location_embed,
      comment.location_embed_latitude,
      comment.location_embed_longitude
    );
  }

  for (let img of post_images) {
    await Post.attachImage(img.post_id, img.img_name, img.img_src);
  }

  for (let post of saved_posts) {
    await Post.save(post.user_id, post.post_id);
  }

  for (let post of post_alerts) {
    await Post.enableAlerts(post.user_id, post.post_id);
  }

  for (let img of comment_images) {
    await Comment.attachImage(img.comment_id, img.img_name, img.img_src);
  }
};
