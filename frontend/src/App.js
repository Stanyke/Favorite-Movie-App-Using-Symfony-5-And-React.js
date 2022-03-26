import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Movie from "./pages/Movie";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" exact={true} element={<Dashboard />} />
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="/movies/:id" exact element={<Movie />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
