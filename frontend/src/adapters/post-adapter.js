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
