import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import PageRouter from "./routes/PageRouter";
import Footer from "./components/Footer/Footer";
import CustomToastBar from "./components/Toaster/CustToastBar";
import { useDispatch, useSelector } from "react-redux";
import AuthService from "./services/AuthService";
import { useEffect } from "react";
import { fetchUserDetail } from "./store/auth/auth";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  // Add a request interceptor
  axios.interceptors.request.use(
    (config) => {
      const token = AuthService.getAuthHeader();
      if (token) {
        config.headers["Authorization"] = token;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      const originalRequest = error.config;
      if (error.response.status === 403) {
        navigate("/");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  );
  const isAuthenticated = AuthService.isAuthenticated();
  const dispatch = useDispatch();
  useEffect(() => {
    isAuthenticated && dispatch(fetchUserDetail());
  });
  return (
    <div className="App">
      <Header></Header>
      <CustomToastBar />
      <PageRouter></PageRouter>
    </div>
  );
}

export default App;
