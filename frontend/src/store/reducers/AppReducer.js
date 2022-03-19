import ACTIONS from "../actions";
const {
  SET_USER,
  LOGOUT_USER,
  DATA_LOADED,
  SET_FAVORITE_MOVIES,
  SET_NEW_MOVIE,
  SET_SEARCHED_MOVIE,
  SET_FAVORITE_MOVIES_DATA,
} = ACTIONS;

export default function appReducer(state, action) {
  switch (action.type) {
    case SET_USER:
      localStorage.setItem("userToken", action.payload.token);
      return {
        ...state,
        user: action.payload,
        userToken: action.payload.token,
      };
    case LOGOUT_USER:
      localStorage.removeItem("userToken");
      return {
        ...state,
        user: {},
        userToken: "",
      };
    case DATA_LOADED:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_FAVORITE_MOVIES:
      let obj = {};
      action.payload.forEach((data, i) => {
        obj[i] = data;
      });
      const updatedData = {
        ...obj,
      };
      return {
        ...state,
        favoriteMovies: updatedData,
        searchedMovie: {},
        moviesLoadedFrom: "favorite",
      };
    case SET_FAVORITE_MOVIES_DATA:
      return {
        ...state,
        favoriteMovies: action.payload,
        searchedMovie: {},
        moviesLoadedFrom: "favorite",
      };
    case SET_NEW_MOVIE:
      let newDataObj = {};
      newDataObj[action.payload._id] = action.payload;
      return {
        ...state,
        favoriteMovies: { ...newDataObj, ...state.favoriteMovies },
        moviesLoadedFrom: "favorite",
        searchedMovie: {},
      };
    case SET_SEARCHED_MOVIE:
      let obj2 = {};
      action.payload.forEach((data, i) => {
        obj2[i] = data;
      });
      const updatedData2 = {
        ...obj2,
      };
      return {
        ...state,
        searchedMovie: updatedData2,
        moviesLoadedFrom: "search",
      };
    default:
      return state;
  }
}
