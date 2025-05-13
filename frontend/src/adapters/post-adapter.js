// These functions all take in a body and return an options object
// with the provided body and the remaining options
import {
  fetchHandler,
  getPatchOptions,
  getPostOptions,
} from "../utils/fetchingUtils";

const baseUrl = "/api/posts";

export const createPost = async (postInformation) => {
  return fetchHandler(baseUrl, getPostOptions(postInformation));
};

export const getAllPosts = async () => {
  return await fetchHandler(baseUrl);
};

export const getUserPosts = async (id) => {
  return await fetchHandler(`/api/users/${id}/posts`);
};

export const getPostDetails = async (id) => {
  return await fetchHandler(`${baseUrl}/${id}`)
}