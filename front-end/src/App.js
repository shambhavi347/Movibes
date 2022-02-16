import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Registration";
import Login from "./Login";
import NavBar1 from "./NavBar1";
import Error from "./Error";

const App = () => {
  return (
    <>
      <Router>
        <NavBar1 />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/reg" element={<Register />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
