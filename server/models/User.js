const db = require("../db/knex.js");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 12;

class User {
  #passwordHash = null; // a private property

  // Create a User instance with the password hidden
  // Instances of User can be sent to clients without exposing the password
  constructor({
    id,
    email,
    username,
    password_hash,
    about_me,
    profile_pic,
    profile_pic_name,
    location,
    location_latitude,
    location_longitude,
    saved_pets_count,
  }) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.about_me = about_me;
    this.profile_pic = profile_pic;
    this.profile_pic_name = profile_pic_name;
    this.location = location;
    this.location_latitude = location_latitude;
    this.location_longitude = location_longitude;
    this.saved_pets_count = saved_pets_count;
    this.#passwordHash = password_hash;
  }

  // Controllers can use this instance method to validate passwords prior to sending responses
  isValidPassword = async (password) => {
    return await bcrypt.compare(password, this.#passwordHash);
  };

  // Hashes the given password and then creates a new user
  // in the users table. Returns the newly created user, using
  // the constructor to hide the passwordHash.
  static async create(email, username, password) {
    try {
      // hash the plain-text password using bcrypt before storing it in the database
      const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
      const result = await db("users")
        .insert({
          email,
          username,
          password_hash: passwordHash,
        })
        .returning("*");
      if (!result || result.length === 0) {
        throw new Error(`Query did not return the expected user data`);
      }
      const rawUserData = result[0];
      return new User(rawUserData);
    } catch (error) {
      console.error(`Error creating new user: ${error}`);
      throw error;
    }
  }

  // Fetches ALL users from the users table, uses the constructor
  // to format each user (and hide their password hash), and returns.
  static async list() {
    try {
      const result = await db("users").select("*");
      if (!result || result.length === 0)
        throw new Error(`Query returned no data`);
      return result.map((rawUserData) => new User(rawUserData));
    } catch (error) {
      throw error;
    }
  }

  // Fetches A single user from the users table that matches
  // the given user id. If it finds a user, uses the constructor
  // to format the user and returns or returns null if not.
  static async find(id) {
    const result = await db("users").select("*").where("id", id).first();
    return result ? new User(result) : null;
  }

  // Same as above but uses the username to find the user
  static async findByUsername(username) {
    const result = await db("users")
      .select("*")
      .where("username", username)
      .first();
    return result ? new User(result) : null;
  }

  // Same as above but uses the username to find the user
  static async findByEmail(email) {
    const result = await db("users").select("*").where("email", email).first();
    return result ? new User(result) : null;
  }

  // Updates the user that matches the given id with a new username.
  // Returns the modified user, using the constructor to hide the passwordHash.
  static async update(userToModify, userInformation) {
    // db methods (where, update, returning) to allow for partial user information updates
    const result = await db("users")
      .where("id", userToModify)
      .update(userInformation)
      .returning("*");

    return result[0] ? new User(result[0]) : null;
  }

  static async getProfilePicture(userId) {
    const result = await db("users")
      .select("profile_pic_name")
      .where("id", userId)
      .first();

    return result?.profile_pic_name ?? null;
  }

  static async deleteUser(userId) {
    try {
      await db("users").where("id", userId).del();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async deleteAll() {
    return db("users").del();
  }
}

module.exports = User;
