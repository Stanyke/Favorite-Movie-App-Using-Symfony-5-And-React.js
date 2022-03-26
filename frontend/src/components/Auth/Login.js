import React, { useState, useRef } from "react";
import useApp from "../../store/contexts/AppContext";

const noticeStyle = {
  fontSize: "12px",
  color: "tomato",
  textAlign: "center",
};

const tempLink = {
  cursor: "pointer",
  color: "white",
};

export default function Login({ handleForms }) {
  const { loginUser } = useApp();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  let submitBtnRef = useRef();

  const [passwordStatus, setPasswordStatus] = useState("bi bi-eye-slash");

  const handleLogin = async (event) => {
    event.preventDefault();
    if (submitBtnRef.current) {
      submitBtnRef.current.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Login in progress';
      submitBtnRef.current.setAttribute("disabled", true);
    }
    await loginUser(user);
    if (submitBtnRef.current) {
      submitBtnRef.current.innerHTML = 'Login';
      submitBtnRef.current.removeAttribute("disabled");
    }
  };

  const togglePassword = () => {
    if (passwordStatus === "bi bi-eye-slash") {
      setPasswordStatus("bi bi-eye-fill");
    } else {
      setPasswordStatus("bi bi-eye-slash");
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <h2 className="text-white text-center mb-4">Login</h2>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            <i className="bi bi-envelope" style={{ fontSize: 20 }}></i>
          </span>
          <input
            type="email"
            className="form-control"
            placeholder="Example@mail.com"
            aria-label="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon2">
            <i className="bi bi-lock-fill" style={{ fontSize: 20 }}></i>
          </span>
          <input
            aria-label="password"
            label="Password"
            className="form-control"
            name="password"
            type={passwordStatus === "bi bi-eye-slash" ? "password" : "text"}
            placeholder="Password"
            required
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <span className="input-group-text" onClick={() => togglePassword()}>
            <i className={passwordStatus} style={{ fontSize: 20 }}></i>
          </span>
        </div>

        <button
          ref={submitBtnRef}
          type="submit"
          className="form-control btn btn-danger"
        >
          Login
        </button>

        <p className="mt-3" style={noticeStyle}>
          Dont have an account?{" "}
          <span style={tempLink} onClick={() => handleForms("register")}>
            Register
          </span>
        </p>
      </form>
    </>
  );
}
