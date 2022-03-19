import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Auth from "./pages/Auth";
// import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        {/* <Route path="/dashboard" exact element={<Dashboard />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
