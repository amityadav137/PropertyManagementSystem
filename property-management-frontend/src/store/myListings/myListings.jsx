import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  changeToContingentApi,
  getProperties,
  getPropertyById,
  ownerPropertiesApi,
  revokeContingentApi,
  updatePropertyStatusApi,
  uploadPropertyImageApi,
} from "../../services/apis/Endpoints";
import { setLoading } from "../../store/loading/loading";
export const myListingsSlice = createSlice({
  name: "myListings",
  initialState: {
    listings: [],
  },
  reducers: {
    setListings: (state, { payload }) => {
      state.listings = payload;
    },
  },
});

export const { setListings } = myListingsSlice.actions;

export function fetchListings() {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const response = await axios.get(ownerPropertiesApi);
      dispatch(setListings(response.data.data));
      dispatch(setLoading(false));
    } catch (e) {
      console.log(e.message);
      dispatch(setLoading(true));
      throw new Error(e.response.data.message);
    }
  };
}

export const fetchPropertyById = (propertyId) => {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const res = await axios.get(getPropertyById(propertyId));
      dispatch(setLoading(false));
      return res.data;
    } catch (e) {
      throw new Error(e.response.data.message);
    }
  };
};

export const addProperty = (property) => {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const res = await axios.post(getProperties, property);
      dispatch(setLoading(false));
      return res.data;
    } catch (e) {
      throw new Error(e.response.data.message);
    }
  };
};

export const addPropertyImage = (propertyId, file) => {
  return async (dispatch) => {
    dispatch(setLoading(true));

    const form = new FormData();
    form.append("propertyId", propertyId);
    form.append("file", file);

    try {
      const res = await axios({
        method: "post",
        url: uploadPropertyImageApi,
        data: form,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(setLoading(false));
      return res.data;
    } catch (e) {
      throw new Error(e.response.data.message);
    }
  };
};

export const updatePropertyById = (propertyId, propertyData) => {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const res = await axios.put(getPropertyById(propertyId), propertyData);
      dispatch(setLoading(false));
      return res.data;
    } catch (e) {
      throw new Error(e.response.data.message);
    }
  };
};

export const updatePropertyStatus = (propertyId, action) => {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const res = await axios.patch(
        updatePropertyStatusApi(propertyId, action)
      );
      dispatch(setLoading(false));
      return res.data;
    } catch (e) {
      dispatch(setLoading(false));
      throw new Error(e.response.data.message);
    }
  };
};

export const changeToContingent = (propertyId) => {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const res = await axios.patch(changeToContingentApi(propertyId));
      console.log(res);
      dispatch(setLoading(false));
      return res.data;
    } catch (e) {
      dispatch(setLoading(false));
      throw new Error(e.response.data.message);
    }
  };
};

export const revokeContingent = (propertyId) => {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const res = await axios.patch(revokeContingentApi(propertyId));
      dispatch(setLoading(false));
      return res.data;
    } catch (e) {
      dispatch(setLoading(false));
      throw new Error(e.response.data.message);
    }
  };
};

export default myListingsSlice.reducer;
