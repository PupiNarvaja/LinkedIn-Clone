import { userTypes } from "../types/user-types";

const { LOGIN, ADD_USER, UPDATE_USER, UPDATE_PROFILE_PICTURE, FORM_SUBMITION_STATUS } = userTypes;

const initialState = {
  user: {
    firstname: "",
    lastname: "",
    phone: "",
    age: "",
    email: "",
    address: "",
    profile: "",
  },
  formSubmitted: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload.user,
        formSubmitted: false, // after update user formsubmition reset
      };
    case ADD_USER:
      return {
        ...state,
        user: action.payload.user,
        formSubmitted: false, // after update user formsubmition reset
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload.user,
        formSubmitted: false, // after update user formsubmition reset
      };
    case UPDATE_PROFILE_PICTURE:
      return {
        ...state,
        user: {
          ...state.profile,
          profileImage: action.payload.image,
        },
      };
    case FORM_SUBMITION_STATUS:
      return {
        ...state,
        formSubmitted: action.payload.status,
      };
    default:
      return state;
  }
};

export default userReducer;
