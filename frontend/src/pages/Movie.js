import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import useApp from "../store/contexts/AppContext";
import Loader from "../components/Loader";

const badgeStatus = ["primary", "danger", "success", "warning"];

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
    appState: { user, userToken, isLoading, favoriteMovies },
  } = useApp();

  const [movie, setMovie] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const movieId = id;

  const addFavoriteMovie = () => {
    const result = addFavoriteMovieToDb(movieId);
    setIsFavorite(result);
  };

  useEffect(() => {
    async function fetchMovie() {
      const movie = await getMovieById(movieId);
      setMovie(movie);
    }

    fetchMovie();

    let isFavoriteResult =
      Object.values(favoriteMovies).length &&
      Object.keys(favoriteMovies).find(
        (item, i) => favoriteMovies[item].movie_id === movieId
      );

    setIsFavorite(isFavoriteResult);
    console.log("========", favoriteMovies);
  }, []);

  return (
    <>
      <Navbar />

      <div className="container" style={style}>
        {!movie ? (
          <Loader counts="4" />
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
                      {!isFavorite ? (
                        <i
                          className="bi bi-bookmark-heart-fill"
                          style={wishIconStyle.white}
                          title="Add to favorites"
                          onClick={addFavoriteMovie}
                        ></i>
                      ) : (
                        <i
                          className="bi bi-heart-fill"
                          style={wishIconStyle.red}
                          title="Already in favorites"
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
