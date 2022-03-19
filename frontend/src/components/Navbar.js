import React from "react";
import { Link } from "react-router-dom";
import useApp from "../store/contexts/AppContext";

const {
  REACT_APP_PLATFORM_NAME,
  REACT_APP_FAV_MOVIES_URL,
  REACT_APP_AFTER_LOGIN_REDIRECT_URL,
} = process.env;

export default function Navbar() {
  const {
    searchMovie,
    resetSeachResult,
    appState: { user, userToken, isLoading, favoriteMovies },
  } = useApp();

  const handleMovieSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value;

    searchMovie(searchValue);
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark navbar-expand-sm fixed-top">
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to={REACT_APP_AFTER_LOGIN_REDIRECT_URL}
            onClick={resetSeachResult}
          >
            {REACT_APP_PLATFORM_NAME}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to={REACT_APP_AFTER_LOGIN_REDIRECT_URL}
                  onClick={resetSeachResult}
                >
                  Home
                </Link>
              </li>
            </ul>
            <form className="d-flex" onSubmit={handleMovieSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search movies names"
                aria-label="Search"
                name="search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}
