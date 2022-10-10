import React from "react";
import ReactDOM from "react-dom/client";
import Show from "./components/embed/embed";
import SongFrame from "./components/songframe/frame";
// import WholeProcess from "./pages/home/download/download";

import "./main.css";
import HomePage2 from "./pages/home2/home";
// import FlaskData from "./pages/home/download/download";

// import HomePage from "./pages/home/home";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    {/* <HomePage /> */}
    {/* <WholeProcess /> */}
    {/* <FlaskData /> */}
    <SongFrame />
  </>
);
