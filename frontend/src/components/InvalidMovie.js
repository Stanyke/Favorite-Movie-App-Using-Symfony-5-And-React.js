import React from "react";

export default function InvalidMovie() {
  return (
    <div className="alert alert-danger d-flex align-items-center text-center" role="alert">
      <i className="bi bi-file-earmark-lock-fill" style={{ fontSize: 20 }}></i>

      <div>Movie does not exist</div>
    </div>
  );
}
