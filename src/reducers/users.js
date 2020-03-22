import { FETCH_USERS } from "../actions";

const initialState = {
  users: []
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        users: state.users.concat(action.payload)
      };
    default:
      return state;
  }
};
