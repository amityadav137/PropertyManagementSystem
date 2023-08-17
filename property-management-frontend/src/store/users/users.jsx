import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { usersApi, adminApi } from "../../services/apis/Endpoints";
import { setLoading } from "../../store/loading/loading";
export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {
    setUsers: (state, { payload }) => {
      state.users = payload;
    },
  },
});

export const { setUsers } = userSlice.actions;

export function fetchUsers() {
  return async (dispatch) => {
    dispatch(setLoading(true));
    await axios
      .get(usersApi)
      .then((response) => {
        dispatch(setUsers(response.data.data));
        dispatch(setLoading(false));
      })
      .catch((er) => {
        dispatch(setLoading(false));
      });
  };
}

export function changeStatus(id) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    await axios
      .post(usersApi + "/active-inactive/" + id)
      .then((response) => {
        dispatch(fetchUsers());
        dispatch(setLoading(false));
      })
      .catch((er) => {
        dispatch(setLoading(false));
      });
  };
}

export function approveUser(id) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    await axios
      .patch(adminApi + "/approveUser/" + id)
      .then((response) => {
        dispatch(fetchUsers());
        dispatch(setLoading(false));
      })
      .catch((er) => {
        dispatch(setLoading(false));
      });
  };
}

export default userSlice.reducer;
