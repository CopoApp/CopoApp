// These functions all take in a body and return an options object
// with the provided body and the remaining options
import {
  fetchHandler,
  getPatchOptions,
  getFilePostOptions,
  getPostOptions,
} from "../utils/fetchingUtils";

const baseUrl = "/api/posts";

export const createPost = async (postInformation) => {
  return fetchHandler(baseUrl, getPostOptions(postInformation));
};

export const attachPostImages = async (postId, imageInformation) => {
  return fetchHandler(
    `${baseUrl}/${postId}/images`,
    getFilePostOptions(imageInformation)
  );
};

export const getUserPostImages = async (postId) => {
  return await fetchHandler(`${baseUrl}/${postId}/images`);
};

export const getAllPosts = async () => {
  return await fetchHandler(baseUrl);
};

export const getUserPosts = async (id) => {
  return await fetchHandler(`/api/users/${id}/posts`);
};
