const knex = require("../db/knex");

class Post {
  static async create(
    author_user_id,
    status,
    title,
    content,
    contact_email,
    contact_phone_number,
    pet_name,
    last_seen_location,
    last_seen_location_latitude,
    last_seen_location_longitude
  ) {
    const query = `INSERT INTO posts (author_user_id, status, title, content, contact_email, contact_phone_number, pet_name, last_seen_location, last_seen_location_latitude, last_seen_location_longitude)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING *`;

    const result = await knex.raw(query, [
      author_user_id,
      status,
      title,
      content,
      contact_email,
      contact_phone_number,
      pet_name,
      last_seen_location,
      last_seen_location_latitude,
      last_seen_location_longitude,
    ]);

    const rawUserData = result.rows[0];
    return rawUserData;
  }

  static async attachImage(post_id, img_name, img_src) {
    const query = `INSERT INTO post_images (post_id, img_name, img_src)
    VALUES (?, ?, ?) RETURNING *`;

    const result = await knex.raw(query, [post_id, img_name, img_src]);

    const rawUserData = result.rows[0];
    return rawUserData;
  }

  static async save(user_id, post_id) {
    const query = `INSERT INTO saved_posts (user_id, post_id)
    VALUES (?, ?) RETURNING *`;

    const result = await knex.raw(query, [user_id, post_id]);

    const rawUserData = result.rows[0];
    return rawUserData;
  }

  static async enableAlerts(user_id, post_id) {
    const query = `INSERT INTO post_alerts (user_id, post_id)
    VALUES (?, ?) RETURNING *`;

    const result = await knex.raw(query, [user_id, post_id]);

    const rawUserData = result.rows[0];
    return rawUserData;
  }
}

module.exports = Post;
