import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApp from "../store/contexts/AppContext";
import Navbar from "../components/Navbar";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";

const { REACT_APP_AFTER_LOGIN_REDIRECT_URL } = process.env;
const style = {
  maxWidth: "500px",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export default function Auth() {
  const {
    appState: { userToken },
  } = useApp();
  const [currentForm, setCurrentForm] = useState("login");
  let navigate = useNavigate();

  const handleForms = async (form) => {
    setCurrentForm(form);
  };

  useEffect(() => {
    if (userToken) {
      navigate(REACT_APP_AFTER_LOGIN_REDIRECT_URL);
    }
  }, [userToken, navigate]);

  return (
    <>
      <Navbar />

      <div className="container" style={style}>
        {currentForm === "login" ? (
          <Login handleForms={handleForms} />
        ) : (
          <Register handleForms={handleForms} />
        )}
      </div>
    </>
  );
}
