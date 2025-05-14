const knex = require("../db/knex");

class Comment {
  static async list(postId) {
    try {
      const result = await knex("comments")
        .where("post_id", postId)
        .returning("*");
      if (!result || result.length === 0)
        throw new Error(`Query returned no data`);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async create(commentInformation, images) {
    const {
      user_id,
      post_id,
      content,
      location_embed,
      location_embed_latitude,
      location_embed_longitude,
    } = commentInformation;

    try {
      // 1st create post
      const comment = await knex("comments").insert(
        {
          user_id,
          post_id,
          content,
          location_embed,
          location_embed_latitude,
          location_embed_longitude,
        },
        // Additional "*" argument to tell insert function to return all the data. Shortahand for .returning()
        "*"
      )

      const createdCommentId = comment[0]?.id

      const createdImages = []

      if (images?.length > 0){
        for (const image of images) {
          const newImage = await knex("comment_images").insert(
            {
              comment_id: createdCommentId,
              img_name: image.img_name,
              img_src: image.img_src,
            },
            '*'
          )
          createdImages.push(newImage[0])
        }
      }
      

      const result = {...comment[0], images: images}
      
      // 2. Use the created comment information to attach the images

      if (!result || result.length === 0)
        throw new Error(`Comment could not be inserted. Please try again.`);

      return result
    } catch (error) {
      throw error;
    }
  }

  static async verifyCommentOwnership(commentId, userId) {
    const result = await knex("comments").where({
      id: commentId,
      user_id: userId,
    });
    return result.length > 0;
  }

  static async updateComment(commentInformation) {
    const {
      commentId,
      content,
      location_embed,
      location_embed_latitude,
      location_embed_longitude,
    } = commentInformation;

    try {
      const result = await knex("comments").where("id", commentId).update(
        {
          content,
          location_embed,
          location_embed_latitude,
          location_embed_longitude,
        },
        "*"
      );

      if (!result || result.length === 0)
        throw new Error(`Comment could not be updated. Please try again.`);

      return result[0];
    } catch (error) {
      throw error;
    }
  }

  static async deleteComment(commentId) {
    try {
      await knex("comments").where("id", commentId).del();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async attachImage(comment_id, img_name, img_src) {}
}

module.exports = Comment;
