import ACTIONS from "../actions";
const {
  SET_USER,
  LOGOUT_USER,
  DATA_LOADED,
  SET_FAVORITE_MOVIES,
  SET_SEARCHED_MOVIE,
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
      return {
        ...state,
        favoriteMovies: action.payload,
        searchedMovie: {},
        moviesLoadedFrom: "favorite",
      };
    case SET_SEARCHED_MOVIE:
      return {
        ...state,
        searchedMovie: action.payload,
        moviesLoadedFrom: "search",
      };
    default:
      return state;
  }
}
