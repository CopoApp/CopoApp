const knex = require("../db/knex");

class Comment {
  static async create(
    user_id,
    post_id,
    content,
    location_embed,
    location_embed_latitude,
    location_embed_longitude
  ) {
    const query = `INSERT INTO comments (user_id, post_id, content, location_embed, location_embed_latitude, location_embed_longitude)
    VALUES (?, ?, ?, ?, ?, ?) RETURNING *`;

    const result = await knex.raw(query, [
      user_id,
      post_id,
      content,
      location_embed,
      location_embed_latitude,
      location_embed_longitude,
    ]);

    const rawUserData = result.rows[0];
    return rawUserData;
  }

  static async attachImage(comment_id, img_name, img_src) {
    const query = `INSERT INTO comment_images (comment_id, img_name, img_src)
    VALUES (?, ?, ?) RETURNING *`;

    const result = await knex.raw(query, [comment_id, img_name, img_src]);

    const rawUserData = result.rows[0];
    return rawUserData;
  }
}

module.exports = Comment;
