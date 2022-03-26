import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import useApp from "../store/contexts/AppContext";
import Cards from "../components/Cards";
import InvalidMovie from "../components/InvalidMovie";

const style = {
  marginTop: "100px",
};

export default function Dashboard() {
  const {
    appState: {
      userToken,
      isLoading,
      favoriteMovies,
      moviesLoadedFrom,
      searchedMovie,
    },
    resetSeachResult,
  } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken) {
      return navigate(process.env.REACT_APP_BEFORE_LOGIN_REDIRECT_URL);
    }
  }, [userToken, favoriteMovies, navigate, isLoading]);

  return (
    <>
      {userToken && (
        <>
          <Navbar />
          <div className="container" style={style}>
            {isLoading ? (
              <>
                <h3 className="text-center text-white mb-5">
                  {moviesLoadedFrom === "favorite"
                    ? "My Movies"
                    : "Search Result"}
                </h3>
                <Loader counts="4" />
              </>
            ) : favoriteMovies.length || searchedMovie.length ? (
              <>
                <h3 className="text-center text-white mb-5">
                  {moviesLoadedFrom === "favorite" ? (
                    "My Movies"
                  ) : (
                    <>
                      Search Result{" "}
                      <div>
                        <button
                          className="btn btn-primary btn-sm"
                          type="button"
                          onClick={resetSeachResult}
                        >
                          Go Back
                        </button>
                      </div>
                    </>
                  )}
                </h3>
                <Cards
                  movies={
                    moviesLoadedFrom === "favorite"
                      ? favoriteMovies
                      : searchedMovie
                  }
                />
              </>
            ) : (
              <InvalidMovie
                message={
                  "Favorite movies list is empty, please search for movies and add them to the list"
                }
              />
            )}
          </div>
        </>
      )}
    </>
  );
}
