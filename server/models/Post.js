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
      // Selects all of the post information and only the username from the users table by joining on the author_user_id
      const result = await knex
        .select("posts.*", "users.username as author")
        .from("posts")
        .leftJoin("users", "author_user_id", "users.id")
        .returning("*");
      if (!result || result.length === 0)
        throw new Error(`Query returned no data`);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async listImages(postId) {
    try {
      const result = await knex("post_images")
        .where("post_id", postId)
        .returning("*");

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

  static async verifyPostOwnership(postId, userId) {
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
      // Deletes post and post_image
      const deletedPost = await knex("posts")
        .where("id", id)
        .returning("*")
        .del();
      return deletedPost[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getUserPosts(userId) {
    try {
      const result = await knex
        .select("posts.*", "users.username as author")
        .from("posts")
        .leftJoin("users", "posts.author_user_id", "users.id")
        .where("posts.author_user_id", userId);

      if (!result) throw new Error(`Query did not return any data`);
      if (result.length === 0) throw new Error(`User has no posts`);

      return result;
    } catch (error) {
      throw error;
    }
  }

  static async attachImage(imageInformation) {
    const result = await knex("post_images")
      .insert(imageInformation)
      .returning("*");

    return result[0];
  }

  static async setCoverImage(postId, imageSource) {
    const result = await knex("posts")
      .where("id", postId)
      .update({
        cover_img_src: imageSource,
      })
      .returning("*");

    return result;
  }

  static async getPostImages(postId) {
    const result = await knex
      .select("post_images.img_name")
      .from("post_images")
      .where("post_id", postId);

    return result;
  }

  static async deleteImage(imageId) {
    try {
      const deletedImage = await knex("post_images")
        .where("id", imageId)
        .returning("*")
        .del();
      return deletedImage[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async saveBookmark(user_id, post_id) {
    const bookmark = await knex("saved_posts")
    .insert({ user_id , post_id })
    .returning("*");

    return bookmark[0];
  }

static async deleteBookmark(user_id, post_id) {
  const deleted = await knex("saved_posts")
    .where( 'post_id', post_id)
    .andWhere('user_id', user_id)
    .del();

    return deleted
}

// Get all bookmarks for a user
static async getBookmarks(user_id) {
  return await knex("saved_posts")
    .where( "user_id",  user_id )
    .returning('*')
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
