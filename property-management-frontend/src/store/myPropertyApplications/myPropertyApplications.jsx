import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getPropertiesOffers, updatePropertyApplicationStatus } from "../../services/apis/Endpoints"
import { setLoading } from "../loading/loading"

export const myPropertyApplicationsSlice = createSlice({
    name: "myPropertyApplications",
    initialState: {
        applications: [],
    },
    reducers: {
        setApplications: (state, { payload }) => {
            state.applications = payload;
        },
    }
});


export const { setApplications } = myPropertyApplicationsSlice.actions;

export function fetchPropertyOffers() {
    return async (dispatch) => {
        dispatch(setLoading(true))

        // Fetch All Property Applications for an owner
        try {
            const response = await axios.get(getPropertiesOffers)
            dispatch(setApplications(response.data.data));
            dispatch(setLoading(false))
        } catch {
            dispatch(setLoading(false))
        }

    };
}

export function updatePropertyOffersStatus(offerId, action) {

    return async (dispatch) => {
        dispatch(setLoading(true))

        try {
            const response = await axios.patch(updatePropertyApplicationStatus(offerId, action))
            // console.log(response.data.status)
            dispatch(setLoading(false))
        } catch {
            dispatch(setLoading(false))
        }
    }

}

export default myPropertyApplicationsSlice.reducer;
