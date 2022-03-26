import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppProvider from "./store/providers/AppProvider";
import { ToastContainer } from "react-toastify";
import 'bootstrap-icons/font/bootstrap-icons.css';

ReactDOM.render(
  <AppProvider>
    <ToastContainer />
    <App />
  </AppProvider>,
  document.getElementById("root")
);