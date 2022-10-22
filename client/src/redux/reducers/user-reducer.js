import { userTypes } from "../types/user-types";

const { LOGIN } = userTypes;

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
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
