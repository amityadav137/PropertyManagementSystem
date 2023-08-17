import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "../store/property/property";
import loadingReducer from "../store/loading/loading";
import myListingsReducer from "../store/myListings/myListings";
import authReducer from "../store/auth/auth";
import applicationReducer from "./application/application";
import favoriteReducer from "./favorite/favorite";
import myPropertyApplicationsReducer from "./myPropertyApplications/myPropertyApplications";
import usersReducer from "./users/users";
import dashboardReducer from "./dashboard/dashboard";

export default configureStore({
  reducer: {
    property: propertyReducer,
    loading: loadingReducer,
    myListings: myListingsReducer,
    auth: authReducer,
    application: applicationReducer,
    favorite: favoriteReducer,
    myPropertyApplications: myPropertyApplicationsReducer,
    users: usersReducer,
    dashboard: dashboardReducer,
  },
});
