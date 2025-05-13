const User = require("../models/User");
const { s3 } = require("../awsConfig");
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();

/* 
GET /api/users
Returns an array of all users in the database
*/
exports.listUsers = async (req, res) => {
  try {
    const users = await User.list();
    res.send(users);
  } catch (error) {
    res.send({ Error: error.message });
  }
};

/* 
GET /api/users/:id
Returns a single user (if found)
*/
exports.showUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.find(id);
  if (!user) {
    return res.status(404).send({ message: "User not found." });
  }

  res.send(user);
};

/* 
PATCH /api/users/:id
Updates a single user (if found) and only if authorized
*/
exports.updateUser = async (req, res) => {  
  // A user is only authorized to modify their own user information
  // e.g. User 5 sends a PATCH /api/users/5 request -> success!
  // e.g. User 5 sends a PATCH /api/users/4 request -> 403!
  const userToModify = Number(req.params.id);
  const userRequestingChange = Number(req.session.userId);
  if (userRequestingChange !== userToModify) {
    return res.status(403).send({ message: "Unauthorized." });
  }

  const {
    username,
    about_me,
    location,
    location_latitude,
    location_longitude,
    saved_pets_count,
  } = req.body;

  // Check if user attached any files
  const pictureData = req?.file
  const isUserRemovingPfp = req.query.del
  
  const userInformation = {
    username,
    about_me,
    location,
    location_latitude,
    location_longitude,
    saved_pets_count,
  }

  // Check if user already has a picture
  const imageName = await User.getProfilePicture(userToModify)
  
  // Update S3
  if (isUserRemovingPfp || pictureData && imageName) {
    // Delete image from S3
    const command = new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: imageName,
    });
    await s3.send(command);
  }

  // Update database entry
  if (isUserRemovingPfp) {
    // Update information for database
    userInformation.profile_pic = null
    userInformation.profile_pic_name = null
  } else if (pictureData) {
    // Remove old picture from S3
    userInformation.profile_pic = pictureData.location
    userInformation.profile_pic_name = pictureData.key
  }

  const updatedUser = await User.update(userToModify, userInformation);
  return res.send(updatedUser)
};

exports.deleteUser = async (req, res) => {
  const userToModify = Number(req.params.id);
  const userRequestingChange = Number(req.session.userId);

  // User should only be able to delete their own account
  if (userToModify !== userRequestingChange) {
    return res.status(403).send({ message: "Unauthorized." });
  }

  try {
    await User.deleteUser(userRequestingChange);
    req.session = null; // "erase" the cookie
    res.status(200).send({ message: "User has been deleted" });
  } catch (error) {
    res.send({ message: error.message });
  }
};
