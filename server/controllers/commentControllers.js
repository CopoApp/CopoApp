const knex = require("../db/knex");
const Comment = require("../models/Comment");

/* 
POST /api/posts
Creates a new post and returns its information
*/
exports.createComment = async (req, res) => {
  const userId = req.session.userId;
  const postId = req.params.id;
  try {
    const comment = await Comment.create({
      // request body must be spread first in case a request tries to manipulate user or post id values
      ...req.body,
      // below user and post id replace any other potential id values
      user_id: userId,
      post_id: postId,
    });
    res.send(comment);
  } catch (error) {
    console.error(`An error occured while creating the comment`);
    res.status(404).send({
      message: error,
    });
  }
};

/* 
GET /api/posts
Returns an array of all posts in the database
*/
exports.listComments = async (req, res) => {
  const postId = req.params.id;
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
      ...req.body,
      commentId,
    });

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
