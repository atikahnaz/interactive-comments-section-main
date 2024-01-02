import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CommentsBox from "./componets/CommentsBox";
import Data from "../data.json";

function App() {
  return (
    <>
      <div className=" border-2 border-x-fe-soft-red">
        <CommentsBox Data={Data} />
      </div>
    </>
  );
}

export default App;
