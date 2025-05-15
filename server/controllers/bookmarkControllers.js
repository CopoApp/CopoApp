const Post  = require("../models/Post");
const User  = require("../models/User");

// Create a bookmark
async function createBookmark(req, res) {
    try {
      const userId = req.session.userId;
      const { id } = req.params;

      // Check if the user even exists
      const user = await User.find(userId);
      if (!user) return res.status(404).json({ error: "User not found" });
  
      // Check if the post exists
      const post = await Post.findPost(id);
      if (!post) return res.status(404).json({ error: "Post not found" });

      // Save the bookmark in the database
      const bookmark = await Post.saveBookmark(userId, id)
  
      res.status(201).json(bookmark);
    } catch (err) {
      console.error(err); // Log the error for debugging
      res.status(500).json({ error: "Failed to save bookmark" });
    }
  }
  

// // Get all bookmarks for a user
// Get all bookmarks for a user
async function listBookmarks(req, res) {
    try {
      const userId = req.session.userId;
  
      // Check if the user exists
      const user = await User.find(userId);
      if (!user) return res.status(404).json({ error: "User not found" });
  
      // Fetch bookmarks using the method from posts.js
      const bookmarks = await Post.getBookmarks(userId);
  
      // Retrieve the associated posts
      const posts = await Promise.all(
        bookmarks.map(async (bookmark) => {
          return await Post.findPost(bookmark.post_id);
        })
      );

      res.json(posts);
    } catch (err) {
      console.error("Error fetching bookmarks:", err);
      res.status(500).json({ error: "Failed to fetch bookmarks" });
    }
  }
  
// Delete a bookmark
async function deleteBookmark(req, res) {
    try {
      const userId = req.session.userId;
      const { id } = req.params;
    
      // Check if the user exists
      const user = await User.find(userId);
      if (!user) return res.status(404).json({ error: "User not found" });
  
      // Attempt to delete the bookmark
      const deleted = await Post.deleteBookmark(userId, id);
      if (!deleted) return res.status(404).json({ error: "Bookmark not found" });
  
      res.status(204).send({message : "successfully deleted"});
    } catch (err) {
      console.error("Error in deleteBookmark controller:", err);
      res.status(500).json({ error: "Failed to delete bookmark" });
    }
  }  


module.exports = { createBookmark, listBookmarks, deleteBookmark };
