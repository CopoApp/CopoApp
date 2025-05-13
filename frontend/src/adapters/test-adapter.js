// These functions all take in a body and return an options object
// with the provided body and the remaining options
import {
  fetchHandler,
  getPatchOptions,
  getFilePostOptions,
  getPostOptions,
} from "../utils/fetchingUtils";

const baseUrl = "/api/posts";

export const getImagePosts = async (postId) => {
  return await fetchHandler(`${baseUrl}/${postId}/images`);
};
