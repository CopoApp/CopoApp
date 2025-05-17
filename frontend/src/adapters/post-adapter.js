// These functions all take in a body and return an options object
// with the provided body and the remaining options
import {
  fetchHandler,
  getPatchOptions,
  getFilePostOptions,
  getFilePatchOptions,
  getPostOptions,
  deleteOptions,
  getDeleteOptions,
} from '../utils/fetchingUtils';

const baseUrl = '/api/posts';

export const createPost = async (postInformation) => {
  return fetchHandler(baseUrl, getFilePostOptions(postInformation));
};

export const attachPostImages = async (postId, imageInformation) => {
  return fetchHandler(`${baseUrl}/${postId}/images`, getFilePostOptions(imageInformation));
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
  return await fetchHandler(`${baseUrl}/${id}`);
};

export const getPostImages = async (id) => {
  return await fetchHandler(`${baseUrl}/${id}/images`);
};

export const updatePostDetails = async (id, userPostInformation) => {
  return await fetchHandler(`${baseUrl}/${id}`, getFilePatchOptions(userPostInformation));
};

export const deletePostImages = async (id, userPostInformation) => {
  return await fetchHandler(`${baseUrl}/${id}/images`, getDeleteOptions(userPostInformation));
};

export const deletePost = async (id) => {
  return await fetchHandler(`${baseUrl}/${id}`, deleteOptions);
};
