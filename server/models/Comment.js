const knex = require("../db/knex");
const { s3 } = require("../awsConfig");
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();

class Comment {
  static async list(postId) {
    try {
      const comments = await knex("comments")
      .where("post_id", postId)
      .join('users', 'comments.user_id', '=', 'users.id')
      .select('comments.*', 'users.username', 'users.profile_pic')
    

      const result = []

      for (let comment of comments) {
        const images = await knex("comment_images")
        .where("comment_id", comment.id)
        .returning("*");
        result.push({ ...comment, 'images': images})
      }
    
      if (!result || result.length === 0)
        throw new Error(`Query returned no data`);

      return result;
    } catch (error) {
      console.log(error)
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

  static async updateComment(commentInformation, addedImages) {
    const {
      commentId,
      content,
      location_embed,
      location_embed_latitude,
      location_embed_longitude,
    } = commentInformation;

    try {
      // Update comment
      const updatedComment = await knex("comments")
        .where("id", commentId)
        .update({
          content,
          location_embed,
          location_embed_latitude,
          location_embed_longitude,
        },
        "*")
        .returning("*");
      
      // Update Images in the database
      for (let image of addedImages) {
        await knex("comment_images")
        .insert({
          comment_id: commentId,
          img_name: image.img_name,
          img_src: image.img_src
        })
      }

      const updatedCommentImages = await knex.select('*').from('comment_images').where('comment_id', commentId);

      return { ...updatedComment[0], 'images': updatedCommentImages }
    } catch (error) {
      throw error;
    }
  }

  static async deleteComment(commentId) {
    try {
      // Delete images related to comment from S3
      const commentImages = await knex.select('*').from('comment_images').where('comment_id', commentId);
      for (let image of commentImages) {
        // delete from S3
        const command = new DeleteObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: image.img_name,
        });
        await s3.send(command);
      }

      // This deletion cascades on the comment_images table
      await knex("comments").where("id", commentId).del();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async deleteImage(images) {
      // Delete Images 
        for (let image of images) {
          // delete from S3
          const command = new DeleteObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: image.img_name,
          });
          await s3.send(command);

          // Delete from database
          await knex("comment_images")
          .where("id", image.id)
          .del();
        }
  }
}

module.exports = Comment;
