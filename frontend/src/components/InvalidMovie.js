import React from "react";

export default function InvalidMovie({ message }) {
  return (
    <div
      className="alert alert-danger d-flex align-items-center text-center"
      role="alert"
    >
      <div className="text-center">
        <i
          className="bi bi-file-earmark-lock-fill"
          style={{ fontSize: 20 }}
        ></i>

        <span>{message}</span>
      </div>
    </div>
  );
}
