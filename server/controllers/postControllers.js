const knex = require("../db/knex");
const Post = require("../models/Post");
const { s3 } = require("../awsConfig");
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();

/* 
POST /api/posts
Creates a new post and returns its information
*/
exports.createPost = async (req, res) => {
  const userId = req.session.userId;
  const {
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
  } = req.body;

  const images = []

  req.files.forEach((file) => {
    images.push({
      img_name: file.key,
      img_src: file.location
    })
  })

  const result = await Post.create({
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
  }, images)


  res.send(result)
};

/* 
GET /api/posts
Returns an array of all posts in the database
*/
exports.listPosts = async (req, res) => {
  try {
    const posts = await Post.list();
    res.send(posts);
  } catch (error) {
    res.send({ Error: error });
  }
};

/* 
GET /api/post/:id 
Returns a single user (if found)
*/
exports.getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findPost(id);
    res.send(post);
  } catch (error) {
    return res.status(404).send({ message: "Post not found." });
  }
};

/* 
PATCH /api/posts/:id
Updates a single post (if found) and only if authorized
*/
exports.updatePost = async (req, res) => {
  const userId = req.session.userId;
  const postId = req.params.id;
  const {
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
  } = req.body;

  try {
    // A user is only authorized to modify their own post information
    const isUserAuthor = await Post.verifyPostOwnerShip(postId, userId);

    if (!isUserAuthor) {
      return res.status(403).send({ message: "Unauthorized." });
    }

    const updatedPost = await Post.updatePost({
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
      last_seen_location,
      last_seen_location_latitude,
      last_seen_location_longitude,
    });

    res.send(updatedPost);
  } catch (error) {
    console.error(error);
    res.send({ message: error });
  }
};

/*
DELETE api/posts/:id
Removes a post from the DB
*/
exports.deletePost = async (req, res) => {
  const userId = req.session.userId;
  const postId = req.params.id;

  // Verify user owns the post
  const isUserAuthor = await Post.verifyPostOwnership(postId, userId);
  if (!isUserAuthor) {
    return res.status(403).send({ message: "Unauthorized." });
  }

  // Delete post images from S3

  // 1. Get list of posts from the DB
  const postImages = await Post.getPostImages(postId);

  // 2. Delete every image that belongs to the post in the S3 Bucket
  for (let img of postImages) {
    const command = new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: img.img_name,
    });
    await s3.send(command);
  }

  // Delete post from the database
  const deletedPost = await Post.deletePost(postId);

  res
    .status(200)
    .send({ message: "Post has been deleted", deletedPost: deletedPost });
};

exports.getUserPosts = async (req, res) => {
  const userId = req.session.userId;
  try {
    const posts = await Post.getUserPosts(userId);
    console.log(posts)
    res.send(posts);
  } catch (error) {
    res.send({ message: error.message });
  }
};
