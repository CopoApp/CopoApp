import {
    fetchHandler,
    getPostOptions,
    deleteOptions,
    basicFetchOptions,
} from "../utils/fetchingUtils";

export async function createBookmark(postId) {
  return await fetchHandler(`/api/post/${postId}/bookmarks`, getPostOptions());
}

export async function deleteBookmark(postId) {
  return await fetchHandler(`/api/post/${postId}/bookmarks`, deleteOptions);
}

export async function listBookmarks(userId) {
  return await fetchHandler(`/api/post/${userId}/bookmarks`, basicFetchOptions);
}