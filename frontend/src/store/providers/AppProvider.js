import * as React from 'react';
import appReducer from '../reducers/AppReducer.js';
import { AppContext } from '../contexts/AppContext.js';

function AppProvider({children}) {

  const [state, dispatch] = React.useReducer(appReducer, {
    user: {},
    userToken: localStorage.getItem("userToken"),
    favoriteMovies: [],
    searchedMovie: [],
    moviesLoadedFrom: 'favorite',
    isLoading: false,
  });

  const value = [state, dispatch];

  return (
    <AppContext.Provider value={ value }>
      { children }
    </AppContext.Provider>
  )
}

export default AppProvider;