import { userTypes } from "../types/user-types";

const { LOGIN  } = userTypes;

export const userActions = {
  setLogin: (user) => ({
    type: LOGIN,
    payload: user,
  }),
};
