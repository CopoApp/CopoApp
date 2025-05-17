// These functions all take in a body and return an options object
// with the provided body and the remaining options
import {
  fetchHandler,
  getFilePostOptions,
  getFilePatchOptions,
  getDeleteOptions,
  deleteOptions
} from "../utils/fetchingUtils";

const baseUrl = "/api/posts";

export const createComment = async (postId, commentInformation) => {
  return fetchHandler(`${baseUrl}/${postId}/comments`, getFilePostOptions(commentInformation));
};

export const updateComment = async (commentId, commentInformation) => {
  return fetchHandler(`/api/comments/${commentId}`, getFilePatchOptions(commentInformation));
};

export const deleteCommentImages = async (commentId, imageInformation) => {
  return fetchHandler(`/api/comments/${commentId}/images`, getDeleteOptions(imageInformation));
};

export const deleteComment = async (commentId) => {
  return fetchHandler(`/api/comments/${commentId}`, deleteOptions);
};

export const getPostComments = async (postId) => {
  return await fetchHandler(`${baseUrl}/${postId}/comments`);
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
