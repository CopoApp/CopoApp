// These functions all take in a body and return an options object
// with the provided body and the remaining options
import {
  fetchHandler,
  getPatchOptions,
  getFilePostOptions,
  getPostOptions,
} from "../utils/fetchingUtils";

const baseUrl = "/api/posts";

export const createComment = async (postId, commentInformation) => {
  return fetchHandler(`${baseUrl}/${postId}/comments`, getFilePostOptions(commentInformation));
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

export const getPostDetails = async (id) => {
  return await fetchHandler(`${baseUrl}/${id}`)
}

export const getPostImages = async (id) => {
  return await fetchHandler(`${baseUrl}/${id}/images`)
}
