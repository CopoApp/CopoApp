const knex = require("../db/knex");

class Post {
  static async create(postInformation) {
    const {
      userId,
      status,
      title,
      content,
      contact_email,
      contact_phone_number,
      pet_name,
      pet_height,
      pet_weight,
      pet_breed,
      pet_color,
      last_seen_location,
      last_seen_location_latitude,
      last_seen_location_longitude,
    } = postInformation;

    const result = await knex("posts")
      .insert({
        author_user_id: userId,
        status,
        title,
        content,
        contact_email,
        contact_phone_number,
        pet_name,
        pet_height,
        pet_weight,
        pet_breed,
        pet_color,
        last_seen_location,
        last_seen_location_latitude,
        last_seen_location_longitude,
      })
      .returning("*");

    const rawUserData = result[0];
    return rawUserData;
  }

  // Fetches ALL posts from the posts table
  static async list() {
    try {
      const result = await knex("posts").returning("*");
      if (!result || result.length === 0)
        throw new Error(`Query returned no data`);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async findPost(id) {
    try {
      const result = await knex("posts").where("id", id);
      return result[0];
    } catch (error) {
      throw error;
    }
  }

  static async verifyPostOwnerShip(postId, userId) {
    const result = await knex("posts").where({
      id: postId,
      author_user_id: userId,
    });
    return result.length > 0;
  }

  static async updatePost(postInformation) {
    const {
      postId,
      status,
      title,
      content,
      contact_email,
      contact_phone_number,
      pet_name,
      pet_height,
      pet_weight,
      pet_breed,
      pet_color,
      last_seen_location_latitude,
      last_seen_location,
      last_seen_location_longitude,
    } = postInformation;

    try {
      const result = await knex("posts")
        .where("id", postId)
        .update({
          status,
          title,
          content,
          contact_email,
          contact_phone_number,
          pet_name,
          pet_height,
          pet_weight,
          pet_breed,
          pet_color,
          last_seen_location_latitude,
          last_seen_location,
          last_seen_location_longitude,
        })
        .returning("*");
      return result[0];
    } catch (error) {
      throw error;
    }
  }

  static async deletePost(id) {
    try {
      await knex("posts").where("id", id).del();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getUserPosts(userId) {
    try {
      const result = await knex("posts")
        .where("author_user_id", userId)
        .returning("*");
      if (!result) throw new Error(`Query did not return any data`);
      if (result.length === 0) throw new Error(`User has no posts`);
      return result;
    } catch (error) {
      throw error;
    }
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
