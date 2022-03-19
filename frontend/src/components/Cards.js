import React from "react";
import { Link } from "react-router-dom";

const badgeStatus = ["primary", "danger", "success", "dark"];
const posterContainerStyle = {
  width: "90%",
  margin: "auto",
  background: "none",
};
const posterImageStyle = { width: "100%", height: "100%" };
const movieTitleStyle = {
  width: "90%",
  margin: "auto",
  background: "none",
  position: "relative",
  bottom: "20px",
  textAlign: "center",
};

export default function Cards({ movies }) {
  return (
    <div className="row no-gutters">
      {Object.values(movies).length
        ? Object.keys(movies).map((item, i) => {
            const movie = {
              title: movies[item].title,
              poster: movies[item].poster,
              movieId: movies[item].movie_id,
            };

            return (
              <div
                className="card mb-3 col-6 col-md-3 col-sm-4 p-0 text-white"
                key={movie.movieId}
                style={{ background: "transparent" }}
              >
                <div style={posterContainerStyle}>
                  <Link
                    to={`/movie/${movie.movieId}`}
                  >
                    <img
                      src={movie.poster}
                      className="card-img"
                      alt={movie.title}
                      style={posterImageStyle}
                    />
                  </Link>
                </div>
                <div style={movieTitleStyle}>
                  <div
                    className={`bg-${
                      badgeStatus[
                        Math.floor(Math.random() * badgeStatus.length)
                      ]
                    }`}
                  >
                    {movie.title}
                  </div>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
}
