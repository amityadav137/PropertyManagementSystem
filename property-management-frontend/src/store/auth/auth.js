import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  getAllUsers,
  loginApi,
  signupApi,
  userDetailApi,
  passwordResetLink,
  resetPassword,
} from "../../services/apis/Endpoints";
import AuthService from "../../services/AuthService";
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user_detail: {},
    token: {},
  },
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload;
    },
    setUserDetail: (state, { payload }) => {
      state.user_detail = payload;
    },
  },
});

export const { setToken, setUserDetail } = authSlice.actions;

export function fetchTokenAfterLogin(email, password) {
  return async (dispatch) => {
    try {
      const response = await axios.post(loginApi, {
        username: email,
        password: password,
      });
      dispatch(
        setToken({
          access_token: response.data.data.accessToken,
          refresh_token: response.data.data.accessToken,
        })
      );
      localStorage.setItem("access_token", response.data.data.accessToken);
      localStorage.setItem("refresh_token", response.data.data.accessToken);
    } catch (err) {
      throw new Error(err);
    }
  };
}
export function handleSignUp(formData) {
  return async (dispatch) => {
    try {
      const response = await axios.post(signupApi, formData);
      return response;
    } catch (err) {
      throw new Error(err);
    }
  };
}

export function fetchUserDetail() {
  return async (dispatch) => {
    await axios.get(userDetailApi).then((response) => {
      dispatch(setUserDetail(response.data.data));
    });
  };
}

export function sendPasswordResetLink(username) {
  return async (dispatch) => {
    try {
      const response = await axios.patch(passwordResetLink(username));
    } catch (err) {
      throw new Error(err);
    }
  };
}

export function resetUserPassword(formData, token) {
  return async (dispatch) => {
    try {
      const response = await axios.put(resetPassword(token), formData);
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  };
}

export default authSlice.reducer;
