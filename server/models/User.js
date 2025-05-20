const knex = require("../db/knex");
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
    const query = `INSERT INTO users (email, username, password_hash)
      VALUES (?, ?, ?) RETURNING *`;
    try {
      // hash the plain-text password using bcrypt before storing it in the database
      const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
      const result = await knex.raw(query, [email, username, passwordHash]);
      if (!result || result.length === 0) {
        throw new Error(`Query did not return the expected user data`);
      }
      const rawUserData = result.rows[0];
      return new User(rawUserData);
    } catch (error) {
      console.error(`Error creating new user: ${error}`);
      throw error;
    }
  }

  // Fetches ALL users from the users table, uses the constructor
  // to format each user (and hide their password hash), and returns.
  static async list() {
    const query = `SELECT * FROM users`;
    try {
      const result = await knex.raw(query);
      if (!result || result.length === 0)
        throw new Error(`Query returned no data`);
      return result.rows.map((rawUserData) => new User(rawUserData));
    } catch (error) {
      throw error;
    }
  }

  // Fetches A single user from the users table that matches
  // the given user id. If it finds a user, uses the constructor
  // to format the user and returns or returns null if not.
  static async find(id) {
    const result = await knex("users").where("id", id).returning("*");
    return result ? new User(result[0]) : null;
  }

  // Same as above but uses the username to find the user
  static async findByUsername(username) {
    const query = `SELECT * FROM users WHERE username = ?`;
    const result = await knex.raw(query, [username]);
    const rawUserData = result.rows[0];
    return rawUserData ? new User(rawUserData) : null;
  }

  // Same as above but uses the username to find the user
  static async findByEmail(email) {
    const query = `SELECT * FROM users WHERE email = ?`;
    const result = await knex.raw(query, [email]);
    const rawUserData = result.rows[0];
    return rawUserData ? new User(rawUserData) : null;
  }

  // Updates the user that matches the given id with a new username.
  // Returns the modified user, using the constructor to hide the passwordHash.
  static async update(userToModify, userInformation) {
    // Knex methods (where, update, returning) to allow for partial user information updates
    const result = await knex("users")
      .where("id", userToModify)
      .update(userInformation)
      .returning("*");

    const rawUpdatedUser = result[0];
    return rawUpdatedUser ? new User(rawUpdatedUser) : null;
  }

  static async getProfilePicture(userId) {
    const result = await knex
      .select("profile_pic_name")
      .from("users")
      .where("id", userId);
    return result[0].profile_pic_name ?? null;
  }

  static async deleteUser(userId) {
    try {
      await knex("users").where("id", userId).del();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async deleteAll() {
    return knex("users").del();
  }
}

module.exports = User;
