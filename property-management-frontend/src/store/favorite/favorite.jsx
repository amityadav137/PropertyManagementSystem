import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {customerFavoriteApi} from "../../services/apis/Endpoints"
import {setLoading} from "../../store/loading/loading"
export const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    properties: [],
  },
  reducers: {
    setProperties: (state, { payload }) => {
        state.properties = payload;
      },
    }
});


export const { setProperties } = favoriteSlice.actions;

export function fetchFavorites() {
    return async (dispatch) => {
      dispatch(setLoading(true))
      await axios
        .get(customerFavoriteApi)
        .then((response) => {
          dispatch(setProperties(response.data.data));
          dispatch(setLoading(false))
        })
        .catch((er) => {
          dispatch(setLoading(false))
        });
    };
  }

  export function addToFavorites(id) {
    return async (dispatch) => {
      dispatch(setLoading(true))
      try{
        const response = await axios
        .post(customerFavoriteApi+"/property/"+id)
        dispatch(setLoading(false))
        return response;

      }
      catch(error){
          dispatch(setLoading(false))
          throw new Error(error)
    };
  }
}

export function removeFromFavorites(id) {
  return async (dispatch) => {
    dispatch(setLoading(true))
    try{
      const response = await axios
      .post(customerFavoriteApi+"/property/"+id)
      dispatch(setLoading(false))
      return response;

    }
    catch(error){
        dispatch(setLoading(false))
        throw new Error(error)
  };
}
}
  

export default favoriteSlice.reducer;
