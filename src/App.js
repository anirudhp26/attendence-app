import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./Views/Auth";
import Home from "./Views/Home";
import { useSelector } from "react-redux";

function App() {
  const token = useSelector((state) => state.token);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Home /> : <Auth />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
