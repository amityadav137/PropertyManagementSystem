import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { adminDashboardApi, ownerDashboardApi } from "../../services/apis/Endpoints";
import { setLoading } from "../../store/loading/loading";
export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    adminDashboardData: {},
    ownerDashboardData: {}
  },
  reducers: {
    setAdminDashboardData: (state, { payload }) => {
      state.adminDashboardData = payload;
    },
    setOwnerDashboardData: (state, { payload }) => {
      state.ownerDashboardData = payload;
    },
  },
});

export const { setAdminDashboardData } = dashboardSlice.actions;
export const { setOwnerDashboardData } = dashboardSlice.actions;

export function fetchAdminDashboardData() {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(adminDashboardApi);
      dispatch(setAdminDashboardData(response.data.data));
      dispatch(setLoading(false));
      return response.data.data;
    } catch (err) { }
  };
}

export function fetchOwnerDashboardData() {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(ownerDashboardApi);
      dispatch(setOwnerDashboardData(response.data.data));
      // console.log(response.data.data)
      dispatch(setLoading(false));
      return response.data.data;
    } catch (err) { }
  };
}

export default dashboardSlice.reducer;
