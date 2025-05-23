// These functions all take in a body and return an options object
// with the provided body and the remaining options
import {
  fetchHandler,
  getPatchOptions,
  getFilePatchOptions,
  getPostOptions,
} from '../utils/fetchingUtils';

const baseUrl = '/api/users';

export const createUser = async ({ username, password }) => {
  return fetchHandler(baseUrl, getPostOptions({ username, password }));
};

export const getAllUsers = async () => {
  return await fetchHandler(baseUrl);
};

export const getUser = async (id) => {
  return fetchHandler(`${baseUrl}/${id}`);
};

export const updateUserProfile = async (id, userProfileInformation, deletingPfp) => {
  return fetchHandler(
    `${baseUrl}/${id}?del=${deletingPfp}`,
    getFilePatchOptions(userProfileInformation)
  );
};
