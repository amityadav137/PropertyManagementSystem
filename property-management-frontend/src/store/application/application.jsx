import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { customerApplicationApi } from "../../services/apis/Endpoints";
import { setLoading } from "../../store/loading/loading";
export const applicationSlice = createSlice({
  name: "application",
  initialState: {
    showMakeAnOfferModal: false,
    applications: [],
  },
  reducers: {
    setMakeAnOfferModal: (state, { payload }) => {
      state.showMakeAnOfferModal = payload;
    },
    setApplications: (state, { payload }) => {
      state.applications = payload;
    },
  },
});

export const { setMakeAnOfferModal, setApplications } =
  applicationSlice.actions;

export function fetchApplications() {
  return async (dispatch) => {
    dispatch(setLoading(true));
    await axios
      .get(customerApplicationApi + "/myApplication")
      .then((response) => {
        dispatch(setApplications(response.data.data));
        dispatch(setLoading(false));
      })
      .catch((er) => {
        dispatch(setLoading(false));
        throw new Error(er);
      });
  };
}
export function submitApplication(formData) {
  return async (dispatch) => {
    try {
      const response = await axios.post(customerApplicationApi, formData);
    } catch (err) {
      throw new Error(err);
    }
  };
}

export function deleteApplication(id) {
  return async () => {
    try {
      const response = await axios.delete(customerApplicationApi + "/" + id);
      return response.data;
    } catch (er) {
      throw new Error(er.response.data.message);
    }
  };
}

export function downloadSalesPdf(id) {
  return async () => {
    try {
      const response = await axios.get(
        customerApplicationApi + "/" + id + "/download",
        {
          responseType: "blob",
        }
      );
      const file = new Blob([response.data], { type: "application/pdf" });
      //Build a URL from the file
      const fileURL = URL.createObjectURL(file);
      //Open the URL on new Window
      const pdfWindow = window.open();
      pdfWindow.location.href = fileURL;
      return response.data;
    } catch (er) {
      throw new Error(er.response.data.message);
    }
  };
}

export default applicationSlice.reducer;
