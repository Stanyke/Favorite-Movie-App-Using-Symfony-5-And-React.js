import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import useApp from "../store/contexts/AppContext";
import Loader from "../components/Loader";
import InvalidMovie from "../components/InvalidMovie";
import { useNavigate } from "react-router-dom";

const badgeStatus = ["primary", "danger", "success"];

const style = {
  marginTop: "100px",
};

const movieContainerStyle = {
  background: "#212529",
  margin: "auto",
  boxShadow:
    "0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12)",
};

const wishIconStyle = {
  white: {
    fontSize: 15,
    color: "white",
    cursor: "pointer",
    position: "relative",
    float: "right",
    bottom: "40px",
  },
  red: {
    fontSize: 15,
    color: "tomato",
    cursor: "pointer",
    position: "relative",
    float: "right",
    bottom: "40px",
  },
};

export default function Movie() {
  const { id } = useParams();
  const {
    getMovieById,
    addFavoriteMovieToDb,
    removeFavoriteMovieFromDb,
    appState: { userToken, isLoading, favoriteMovies },
  } = useApp();

  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [invalidMovie, setInvalidMovie] = useState(false);
  const [isFavorite, setIsFavorite] = useState("Checking...");

  const movieId = id;

  const addFavoriteMovie = () => {
    const result = addFavoriteMovieToDb(movieId);
    setIsFavorite(result ? "Yes" : "No");
  };

  const removeFavoriteMovie = () => {
    const result = removeFavoriteMovieFromDb(movieId);
    setIsFavorite(result ? "No" : "Yes");
  };

  useEffect(() => {
    async function fetchMovie() {
      const movie = await getMovieById(movieId);
      movie.title ? setMovie(movie) : setInvalidMovie(true);
    }

    fetchMovie();
  }, []);

  useEffect(() => {
    if (favoriteMovies.length) {
      let isFavoriteResult = favoriteMovies.find(
        (item, i) => item.movie_id === movieId
      );

      setIsFavorite(isFavoriteResult ? "Yes" : "No");
    }
  }, [favoriteMovies]);

  useEffect(() => {
    if (!userToken) {
      return navigate(process.env.REACT_APP_BEFORE_LOGIN_REDIRECT_URL);
    }
  }, [userToken, favoriteMovies, navigate, isLoading]);

  return (
    <>
      <Navbar />

      <div className="container" style={style}>
        {!movie && !invalidMovie ? (
          <Loader counts="4" />
        ) : invalidMovie ? (
          <InvalidMovie />
        ) : (
          <div className="col-12" style={movieContainerStyle}>
            <div
              className="card mb-3 text-white"
              style={{ background: "transparent" }}
            >
              <div className="row g-0">
                <div className="col-md-4 col-sm-3 text-center">
                  <img
                    src={movie.poster}
                    className="img-fluid rounded-start"
                    alt={movie.title}
                  />
                </div>
                <div className="col-md-8 col-sm-9">
                  <div className="card-body">
                    <h3 className="card-title">
                      <b>{movie.title}</b>
                    </h3>
                    <div>
                      {isFavorite === "No" || isFavorite === "Checking..." ? (
                        <i
                          className="bi bi-bookmark-heart-fill"
                          style={wishIconStyle.white}
                          title="Add to favorites"
                          onClick={addFavoriteMovie}
                        ></i>
                      ) : (
                        <i
                          className="bi bi-trash3-fill ml-2"
                          style={wishIconStyle.red}
                          title="Remove from favorites"
                          onClick={removeFavoriteMovie}
                        ></i>
                      )}
                    </div>
                    <p className="card-text text-small">
                      <i>{movie.plot}</i>
                    </p>
                    <div className="card-text">
                      <div>
                        <b>Actors:</b>{" "}
                        <span className="small">{movie.actors}</span>
                      </div>

                      <div>
                        <b>Duration:</b>{" "}
                        <span className="small">{movie.runtime}</span>
                      </div>

                      <div>
                        <b>Genre:</b>{" "}
                        <span
                          className={`badge bg-${
                            badgeStatus[
                              Math.floor(Math.random() * badgeStatus.length)
                            ]
                          }`}
                        >
                          {movie.genre}
                        </span>
                      </div>

                      <div>
                        <b>Country:</b>{" "}
                        <span className="small">{movie.country}</span>
                      </div>

                      <div>
                        <b>Language:</b>{" "}
                        <span className="small">{movie.language}</span>
                      </div>

                      <div>
                        <b>Rated:</b>{" "}
                        <span className="small">{movie.rated}</span>
                      </div>

                      <div>
                        <b>Release Date:</b>{" "}
                        <span className="small">{movie.released}</span>
                      </div>

                      <div>
                        <b>Type:</b> <span className="small">{movie.type}</span>
                      </div>

                      <div>
                        <b>Year:</b> <span className="small">{movie.year}</span>
                      </div>

                      <div>
                        <b>Status:</b>{" "}
                        <span className="small">
                          {isFavorite === "Checking..."
                            ? isFavorite
                            : isFavorite === "Yes"
                            ? "Added to favorites"
                            : "Not in favorites"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
