const knex = require("../db/knex");
const Comment = require("../models/Comment");

/* 
POST /api/posts
Creates a new post and returns its information
*/
exports.createComment = async (req, res) => {
  const userId = req.session.userId;
  const postId = req.params.id;
  const { content } = req.body
  const images = []
  
  req.files?.forEach((file) => {
    images.push({
      img_name: file.key,
      img_src: file.location
    })
  })

  const result = await Comment.create({
    user_id: userId,
    post_id: postId,
    content,
    // location_embed,
    // location_embed_latitude,
    // location_embed_longitude,
  }, images)

  res.send(result)
};

/* 
GET /api/posts
Returns an array of all posts in the database
*/
exports.listComments = async (req, res) => {
  const postId = Number(req.params.id);
  try {
    const posts = await Comment.list(postId);
    res.send(posts);
  } catch (error) {
    res.send({ Error: error });
  }
};

/* 
PATCH /api/posts/:id
Updates a single post (if found) and only if authorized
*/
exports.updateComment = async (req, res) => {
  const userId = req.session.userId;
  const commentId = req.params.id;

  const {
    content,
    location_embed,
    location_embed_latitude,
    location_embed_longitude,
    deletedImages
  } = req.body;

  const addedImages = req.files?.map((file) => {return { img_name: file.key, img_src : file.location }})

  try {
    // A user is only authorized to modify their own comment information
    const isUserAuthorized = await Comment.verifyCommentOwnership(
      commentId,
      userId
    );

    if (!isUserAuthorized) {
      return res.status(403).send({ message: "Unauthorized." });
    }

    const updatedComment = await Comment.updateComment({
      content,
      location_embed,
      location_embed_latitude,
      location_embed_longitude,
      commentId,
    }, addedImages, deletedImages);

    res.send(updatedComment);
  } catch (error) {
    console.error(error);
    res.send({ message: error });
  }
};

/*
DELETE api/posts/:id
Removes a post from the DB
*/
exports.deleteComment = async (req, res) => {
  const userId = req.session.userId;
  const commentId = req.params.id;
  try {
    // Verify user owns the post
    const isUserAuthorized = await Comment.verifyCommentOwnership(
      commentId,
      userId
    );

    if (!isUserAuthorized) {
      return res.status(403).send({ message: "Unauthorized." });
    }

    await Comment.deleteComment(commentId);
    res.status(200).send({ message: "Comment has been deleted" });
  } catch (error) {
    res.send({ message: error.message });
  }
};
