const knex = require("../db/knex");
const Post = require("../models/Post");

/* 
POST /api/posts/:id/images
Creates a new post and returns its information
*/
exports.createImageForPost = async (req, res) => {
  const { id } = req.params;
  const promises = [];

  req.files.forEach((file) => {
    const promise = Post.attachImage({
      post_id: id,
      img_name: file.originalname,
      img_src: file.location,
    });
    promises.push(promise);
  });

  Promise.all(promises)
    .then((imageInformation) => {
      // Considers the first image user submitted as the cover image
      const postId = imageInformation[0].post_id;
      const coverImageSrc = imageInformation[0].img_src;
      const coverImagePromise = Post.setCoverImage(postId, coverImageSrc);
      coverImagePromise.then(() => {
        res.send(imageInformation);
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

/* 
GET /api/posts
Returns an array of all posts in the database
*/
exports.getImageForUserPosts = async (req, res) => {
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
  try {
    // Verify user owns the post
    const isUserAuthor = await Post.verifyPostOwnerShip(postId, userId);
    if (!isUserAuthor) {
      return res.status(403).send({ message: "Unauthorized." });
    }
    await Post.deletePost(postId);
    res.status(200).send({ message: "Post has been deleted" });
  } catch (error) {
    res.send({ message: error.message });
  }
};

exports.getUserPosts = async (req, res) => {
  const userId = req.session.userId;
  try {
    const posts = await Post.getUserPosts(userId);
    res.send(posts);
  } catch (error) {
    res.send({ message: error.message });
  }
};
