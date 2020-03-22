import axios from "axios";
import { FETCH_USERS } from ".";

export const fetchUsers = delay => dispatch => {
  axios
    .get(`https://reqres.in/api/users?delay=${delay}`)
    .then(res => {
      const users = res.data.data;
      dispatch({
        type: FETCH_USERS,
        payload: users
      });
    })
    .catch(() => alert("Oops!"));
};
