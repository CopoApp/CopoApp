///////////////////////////////
// Imports
///////////////////////////////

require("dotenv").config();
const path = require("path");
const express = require("express");
const upload = require("./awsConfig");

// middleware imports
const handleCookieSessions = require("./middleware/handleCookieSessions");
const checkAuthentication = require("./middleware/checkAuthentication");
const logRoutes = require("./middleware/logRoutes");
const logErrors = require("./middleware/logErrors");

// controller imports
const authControllers = require("./controllers/authControllers");
const userControllers = require("./controllers/userControllers");
const postControllers = require("./controllers/postControllers");
const commentControllers = require("./controllers/commentControllers");
const postImageControllers = require("./controllers/postImageControllers");
const app = express();

// middleware
app.use(handleCookieSessions); // adds a session property to each request representing the cookie
app.use(logRoutes); // print information about each incoming request
app.use(express.json()); // parse incoming request bodies as JSON
app.use(express.static(path.join(__dirname, "../frontend/dist"))); // Serve static assets from the dist folder of the frontend

///////////////////////////////
// Auth Routes
///////////////////////////////

app.post("/api/auth/register", authControllers.registerUser);
app.post("/api/auth/login", authControllers.loginUser);
app.get("/api/auth/me", authControllers.showMe);
app.delete("/api/auth/logout", authControllers.logoutUser);

///////////////////////////////
// User Routes
///////////////////////////////

// These actions require users to be logged in (authentication)
// Express lets us pass a piece of middleware to run for a specific endpoint
app.get("/api/users", checkAuthentication, userControllers.listUsers); // Sends back an array of users
app.get("/api/users/:id", checkAuthentication, userControllers.showUser); // Send specific user object
app.patch("/api/users/:id", checkAuthentication, userControllers.updateUser); // Sends updated user object
app.delete("/api/users/:id", checkAuthentication, userControllers.deleteUser); // Removes user

///////////////////////////////
// Post Routes
///////////////////////////////

// These actions require users to be logged in (authentication)
app.post("/api/posts", checkAuthentication, postControllers.createPost); // Creates a new post and sends its data back to the client
app.get("/api/posts", checkAuthentication, postControllers.listPosts); // Sends array of all posts
app.get("/api/posts/:id", checkAuthentication, postControllers.getPost); // Sends specific user post
app.patch("/api/posts/:id", checkAuthentication, postControllers.updatePost); // Updates specific user post
app.delete("/api/posts/:id", checkAuthentication, postControllers.deletePost); // Removes a Post
app.get(
  "/api/users/:id/posts",
  checkAuthentication,
  postControllers.getUserPosts
); // Gets all posts for a specific user

///////////////////////////////
// Comment Routes
///////////////////////////////

app.get(
  "/api/posts/:id/comments",
  checkAuthentication,
  commentControllers.listComments
); // List all comments for a post
app.post(
  "/api/posts/:id/comments",
  checkAuthentication,
  commentControllers.createComment
); // Create comments on a post
app.patch(
  "/api/comments/:id",
  checkAuthentication,
  commentControllers.updateComment
); // Update a comment
app.delete(
  "/api/comments/:id",
  checkAuthentication,
  commentControllers.deleteComment
); // Delete a comment

///////////////////////////////
// Post Images Routes
///////////////////////////////

// These actions require users to be logged in (authentication)
app.post(
  "/api/posts/:id/images",
  checkAuthentication,
  upload.array("files", 5),
  postImageControllers.createImageForPost
); // Creates a new image in the database for a post

app.get(
  "/api/posts/:id/images",
  checkAuthentication,
  postImageControllers.getImageForUserPosts
); // Creates a new image in the database for a post

app.get("/api/posts", checkAuthentication, postControllers.listPosts); // Sends array of all posts
app.get("/api/posts/:id", checkAuthentication, postControllers.getPost); // Sends specific user post
app.patch("/api/posts/:id", checkAuthentication, postControllers.updatePost); // Updates specific user post
app.delete("/api/posts/:id", checkAuthentication, postControllers.deletePost); // Removes a Post
app.get(
  "/api/users/:id/posts",
  checkAuthentication,
  postControllers.getUserPosts
); // Gets all posts for a specific user

///////////////////////////////
// Fallback Routes
///////////////////////////////

// Requests meant for the API will be sent along to the router.
// For all other requests, send back the index.html file in the dist folder.
app.get("*", (req, res, next) => {
  if (req.originalUrl.startsWith("/api")) return next();
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.use(logErrors);

///////////////////////////////
// Start Listening
///////////////////////////////

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
