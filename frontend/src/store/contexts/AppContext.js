import * as React from "react";
import axios from "axios";
import ACTIONS from "../actions";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const {
  DATA_LOADED,
  SET_FAVORITE_MOVIES,
  SET_USER,
  LOGOUT_USER,
  SET_NEW_MOVIE,
  SET_SEARCHED_MOVIE,
} = ACTIONS;

const { REACT_APP_SERVER_URL, REACT_APP_AFTER_LOGIN_REDIRECT_URL } =
  process.env;

export const AppContext = React.createContext();

function useApp() {
  const context = React.useContext(AppContext);
  const location = useLocation();

  const [appState, dispatch] = context;

  const { userToken } = appState;

  axios.defaults.baseURL = REACT_APP_SERVER_URL;
  axios.defaults.headers["Content-Type"] = "application/json";
  axios.defaults.headers["x-access-token"] = userToken;

  React.useEffect(() => {
    //Only fetch all users when user is logged in and user is in dashboard
    userToken &&
      location.pathname === REACT_APP_AFTER_LOGIN_REDIRECT_URL &&
      getMyProfileFromDb() &&
      getMyFavoriteMoviesFromDb();
  }, []);

  const pageLoaderhandler = (status) => {
    dispatch({
      type: DATA_LOADED,
      payload: status,
    });
  };

  const loginUser = async (options) => {
    try {
      console.log('[p[[[[[[[[[[[[')
      const { data } = await axios.post("/auth/login", options);
      showToast("Login Successful");
      console.log('22222222222', data)
      // dispatch({
      //   type: SET_USER,
      //   payload: data.data,
      // });
    } catch (err) {
      showToast(err.response.data.message);
    }
  };

  const registerUser = async (options) => {
    try {
      const { data } = await axios.post("/auth/register", options);
      showToast("Registration Successful");
      dispatch({
        type: SET_USER,
        payload: data.data,
      });
    } catch (err) {
      showToast(err.response.data.message);
    }
  };

  const showToast = async (message) => {
    toast(message);
  };

  const getMyFavoriteMoviesFromDb = async () => {
    try {
      const { data } = await axios.get(`/api/me`);
      pageLoaderhandler(true);
      dispatch({
        type: SET_FAVORITE_MOVIES,
        payload: data.data,
      });
    } catch (err) {
      showToast(err.response.data.message);
    }
  };

  const getMyProfileFromDb = async () => {
    try {
      const { data } = await axios.get(`/api/me`);
      dispatch({
        type: SET_USER,
        payload: data.data,
      });
    } catch (err) {
      showToast(err.response.data.message);
    }
  };

  const removeUser = async () => {
    showToast("Logout Successful");
    dispatch({
      type: LOGOUT_USER,
      payload: "",
    });
  };

  return {
    appState,
    dispatch,
    loginUser,
    registerUser,
    removeUser,
  };
}

export default useApp;
