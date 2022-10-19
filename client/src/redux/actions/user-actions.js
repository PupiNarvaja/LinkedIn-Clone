import { userTypes } from "../types/user-types";

const { LOGIN, ADD_USER, UPDATE_PROFILE_PICTURE, UPDATE_USER,FORM_SUBMITION_STATUS } = userTypes;

export const userActions = {
  addProfile: (user) => ({
    type: ADD_USER,
    payload: { user }
  }),

  updateProfileImage: (image) => ({
    type: UPDATE_PROFILE_PICTURE,
    payload: { image },
  }),

  updateProfile: (user) => ({
    type: UPDATE_USER,
    payload: { user }
  }),

  formSubmittionStatus: (status) => ({
    type: FORM_SUBMITION_STATUS,
    payload: { status },
  }),

  login: (user) => ({
    type: LOGIN,
    payload: { user }
  }),
};
