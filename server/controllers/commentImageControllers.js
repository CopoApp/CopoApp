const knex = require("../db/knex");
const Comment = require("../models/Comment");
const { s3 } = require("../awsConfig");
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();

/* 
POST /api/posts/:id/images
Adds uploaded to S3 to the database
*/
exports.createImageForComment = async (req, res) => {
  const { id } = req.params; // Comment ID
  const images = [];

  req.files.forEach((file) => {
    const promise = Comment.attachImage({
      comment_id: id,
      img_name: file.key,
      img_src: file.location,
    });
    images.push(promise);
  });

  Promise.all(images)
    .then((imageInformation) => {
      res.send(imageInformation)
    })
    .catch((error) => {
      console.error(error);
    });
};

/* 
GET /api/posts/:id/images
Returns an array of all images for a specific post
*/
exports.getImages = async (req, res) => {
  const commentId = req.params.id;
  try {
    const images = await Comment.listImages(commentId);
    res.send(images);
  } catch (error) {
    res.send({ Error: error.message });
  }
};

/*
DELETE api/posts/:id
Removes an image(s) from S3 and the Database
*/
exports.deleteImages = async (req, res) => {
  const userId = req.session.userId;
  const postId = req.params.id;
  const images = req.body;
  const deletedImages = [];

  // Verify user owns the post
  const isUserAuthor = await Post.verifyPostOwnership(postId, userId);
  if (!isUserAuthor) {
    return res.status(403).send({ message: "Unauthorized." });
  }

  // Remove images from S3
  // Delete every image that user request to delete
  for (let img of images) {
    const command = new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: img.img_name,
    });
    await s3.send(command);
    // Delete image(s) from the database
    const deletedPost = await Post.deleteImage(img.id);
    deletedImages.push(deletedPost);
  }

  res.status(200).send({
    message: "Images sucessfully deleted",
    deletedImages,
  });
};
