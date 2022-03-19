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
  SET_FAVORITE_MOVIES_DATA,
} = ACTIONS;

const { REACT_APP_SERVER_URL, REACT_APP_AFTER_LOGIN_REDIRECT_URL } =
  process.env;

export const AppContext = React.createContext();

function useApp() {
  const context = React.useContext(AppContext);
  const location = useLocation();

  const [appState, dispatch] = context;

  const { userToken, isLoading, favoriteMovies } = appState;

  axios.defaults.baseURL = REACT_APP_SERVER_URL;
  axios.defaults.headers["Content-Type"] = "application/json";
  axios.defaults.headers["x-access-token"] = userToken;

  React.useEffect(() => {
    //Only fetch all users when user is logged in and user is in dashboard and no movie is available in state
    const movieExists = Object.values(favoriteMovies).length ? true : false;
    userToken &&
      location.pathname === REACT_APP_AFTER_LOGIN_REDIRECT_URL &&
      !movieExists &&
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
      pageLoaderhandler(true);
      const { data } = await axios.post("/auth/login", options);
      showToast(data.message);
      dispatch({
        type: SET_USER,
        payload: data.data,
      });
    } catch (err) {
      pageLoaderhandler(false);
      showToast(err.response.data.message);
    }
  };

  const registerUser = async (options) => {
    try {
      const { data } = await axios.post("/auth/register", options);
      showToast(data.message);
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
      pageLoaderhandler(true);
      const { data } = await axios.get(`/api/movies/favorite`);

      console.log('823222222', data.data);
      getMyFavoriteMoviesFromOMDb(data.data);
    } catch (err) {
      pageLoaderhandler(false);
      showToast(err.response.data.message);
    }
  };

  const getMyFavoriteMoviesFromOMDb = async (movies) => {
    try {
      //rewrite token and url
      axios.defaults.baseURL = null;
      axios.defaults.headers["x-access-token"] = null;
      let updatedMovies = [];

      for await (const movie of movies) {
        //Added corsanywhere for CORS bypass
        const movieURL = `https://corsanywhere.herokuapp.com/https://www.omdbapi.com?apikey=9066e28e&i=${movie.movie_id}`;
        const { data } = await axios.get(movieURL);
        const movieData = {
          ...movie,
          title: data.Title,
          year: data.Year,
          type: data.Type,
          poster: data.Poster,
        };
        updatedMovies.push(movieData);
      }
      pageLoaderhandler(false);

      dispatch({
        type: SET_FAVORITE_MOVIES,
        payload: updatedMovies,
      });

      //return token and url
      axios.defaults.baseURL = REACT_APP_SERVER_URL;
      axios.defaults.headers["x-access-token"] = userToken;
    } catch (err) {
      pageLoaderhandler(false);
      showToast(err.response.data.message);
    }
  };

  const addFavoriteMovieToDb = async (movie_id) => {
    try {
      const { data } = await axios.post(`/api/movies/favorite`, {
        movie_id,
      });

      getMyFavoriteMoviesFromDb();
      showToast(data.message);
      return true;
    } catch (err) {
      showToast(err.response.data.message);
    }
  };

  const searchMovie = async (search) => {
    try {
      if (!search) {
        showToast("Movie name is invalid");
      } else {
        pageLoaderhandler(true);

        //rewrite token and url
        axios.defaults.baseURL = null;
        axios.defaults.headers["x-access-token"] = null;

        search = search.toLowerCase();
        let updatedMovies = [];

        //Added corsanywhere for CORS bypass
        const movieURL = `https://corsanywhere.herokuapp.com/https://www.omdbapi.com?apikey=9066e28e&s=${search}`;
        const { data } = await axios.get(movieURL);
        pageLoaderhandler(false);

        //Remove invalid movies
        data.Search = data.Search.filter((movie) => movie.Poster !== "N/A");

        for await (const movie of data.Search) {
          const movieData = {
            movie_id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            type: movie.Type,
            poster: movie.Poster,
          };
          updatedMovies.push(movieData);
        }

        dispatch({
          type: SET_SEARCHED_MOVIE,
          payload: updatedMovies,
        });

        //return token and url
        axios.defaults.baseURL = REACT_APP_SERVER_URL;
        axios.defaults.headers["x-access-token"] = userToken;
      }
    } catch (err) {
      pageLoaderhandler(false);
      showToast(err.response.data.message);
    }
  };

  const getMovieById = async (id) => {
    try {
      //rewrite token and url
      axios.defaults.baseURL = null;
      axios.defaults.headers["x-access-token"] = null;

      //Added corsanywhere for CORS bypass
      const movieURL = `https://corsanywhere.herokuapp.com/https://www.omdbapi.com?apikey=9066e28e&i=${id}`;
      const { data } = await axios.get(movieURL);

      const movieData = {
        movie_id: id,
        title: data.Title,
        year: data.Year,
        rated: data.Rated,
        released: data.Released,
        runtime: data.Runtime,
        genre: data.Genre,
        type: data.Type,
        language: data.Language,
        country: data.Country,
        actors: data.Actors,
        poster: data.Poster,
        plot: data.Plot,
      };

      //return token and url
      axios.defaults.baseURL = REACT_APP_SERVER_URL;
      axios.defaults.headers["x-access-token"] = userToken;

      return movieData;
    } catch (err) {
      showToast(err.response.data.message);
    }
  };

  const resetSeachResult = () => {
    dispatch({
      type: SET_FAVORITE_MOVIES_DATA,
      payload: favoriteMovies,
    });
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
      removeUser();
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
    isLoading,
    searchMovie,
    getMovieById,
    resetSeachResult,
    addFavoriteMovieToDb,
  };
}

export default useApp;
