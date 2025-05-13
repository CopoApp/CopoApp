const knex = require("../db/knex");
const Post = require("../models/Post");
const { s3 } = require("../awsConfig");
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();

/* 
POST /api/posts/:id/images
Adds uploaded to S3 to the database
*/
exports.createImageForPost = async (req, res) => {
  const { id } = req.params;
  const images = [];

  req.files.forEach((file) => {
    const promise = Post.attachImage({
      post_id: id,
      img_name: file.key,
      img_src: file.location,
    });
    images.push(promise);
  });

  Promise.all(images)
    .then((imageInformation) => {
      // Considers the first image user submitted as the cover image
      const postId = imageInformation[0].post_id;
      const coverImageSrc = imageInformation[0].img_src;
      Post.setCoverImage(postId, coverImageSrc).then(() => {
        res.send(imageInformation);
      });
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
  const postId = req.params.id;
  try {
    const images = await Post.listImages(postId);
    res.send(images);
  } catch (error) {
    res.status(404).send({message: error})
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
