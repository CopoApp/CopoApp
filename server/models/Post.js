const knex = require("../db/knex");
const { s3 } = require("../awsConfig");
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();

class Post {
  static async create(postInformation, images) {
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
      pet_type,
      pet_color,
      last_seen_location,
      last_seen_location_latitude,
      last_seen_location_longitude,
    } = postInformation;

    try {
      // 1st create post
      const post = await knex("posts").insert(
        {
          author_user_id: userId,
          status,
          title,
          content,
          contact_email,
          contact_phone_number,
          pet_name,
          pet_height,
          pet_weight,
          pet_type,
          pet_color,
          last_seen_location,
          last_seen_location_latitude,
          last_seen_location_longitude,
        },
        // Additional "*" argument to tell insert function to return all the data. Shortahand for .returning()
        "*"
      );

      const createdPostId = post[0]?.id;

      const createdImages = [];

      if (images?.length > 0) {
        for (const image of images) {
          const newImage = await knex("post_images").insert(
            {
              post_id: createdPostId,
              img_name: image.img_name,
              img_src: image.img_src,
            },
            "*"
          );
          createdImages.push(newImage[0]);
        }
      }

      const result = { ...post[0], images: images };

      // 2. Use the created comment information to attach the images

      if (!result || result.length === 0)
        throw new Error(`Comment could not be inserted. Please try again.`);

      return result;
    } catch (error) {
      throw error;
    }
  }

  // Fetches ALL posts from the posts table
  static async list() {
    try {
      // Selects all of the post information and only the username from the users table by joining on the author_user_id
      const images = await knex.select("*").from("post_images");

      const posts = await knex
        .select("posts.*", "users.username as author")
        .from("posts")
        .leftJoin("users", "author_user_id", "users.id")
        .orderBy("created_at", "desc")
        .returning("*");

      const result = posts.map((post) => {
        const postImages = [];
        for (let image of images) {
          if (image.post_id === post.id) {
            postImages.push(image);
          }
        }
        return { ...post, images: postImages };
      });

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
      const post = await knex("posts")
        .leftJoin("users", "posts.author_user_id", "=", "users.id")
        .where("posts.id", id)
        .select("posts.*", "users.username");

      const images = await await knex("post_images").where("post_id", id);
      return { ...post[0], images: images };
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

  static async updatePost(postInformation, addedImages) {
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
      pet_type,
      pet_color,
      last_seen_location_latitude,
      last_seen_location,
      last_seen_location_longitude,
    } = postInformation;

    try {
      // Update post
      const updatedPost = await knex("posts")
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
          pet_type,
          pet_color,
          last_seen_location_latitude,
          last_seen_location,
          last_seen_location_longitude,
        })
        .returning("*");

      // // Delete Images
      // if (deletedImages.length > 0) {
      //   for (let image of deletedImages) {
      //     // delete from S3
      //     const command = new DeleteObjectCommand({
      //       Bucket: process.env.S3_BUCKET_NAME,
      //       Key: image.img_name,
      //     });
      //     await s3.send(command);

      //     // Delete from database
      //     await knex("post_images")
      //     .where("id", image.id)
      //     .del();
      //   }
      // }

      // Update Images in the database
      if (addedImages.length > 0) {
        for (let image of addedImages) {
          await knex("post_images").insert({
            post_id: postId,
            img_name: image.img_name,
            img_src: image.img_src,
          });
        }
      }

      const updatedPostImages = await knex
        .select("*")
        .from("post_images")
        .where("post_id", postId);

      return { ...updatedPost[0], images: updatedPostImages };
    } catch (error) {
      console.log(Error(error));
      throw error;
    }
  }

  static async deletePost(id) {
    try {
      // 1. Get list of posts from the DB
      const postImages = await Post.getPostImages(id);

      // 2. Delete every image that belongs to the post in the S3 Bucket
      for (let img of postImages) {
        const command = new DeleteObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: img.img_name,
        });
        await s3.send(command);
      }

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
    // Selects all of the post information and only the username from the users table by joining on the author_user_id
    const posts = await knex
      .select("posts.*", "users.username as author")
      .from("posts")
      .leftJoin("users", "posts.author_user_id", "users.id")
      .where("posts.author_user_id", userId);

    const result = [];

    for (let post of posts) {
      const postImages = await knex
        .select("*")
        .from("post_images")
        .where("post_id", post.id);
      result.push({ ...post, images: postImages });
    }

    if (!result || result.length === 0)
      throw new Error(`Query returned no data`);

    return result;
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
