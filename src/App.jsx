import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CommentsBox from "./componets/CommentsBox";
import Data from "../data.json";

function App() {
  // callback function to save text
  const addTextData = () => {
    console.log("hy");
  };
  return (
    <>
      <div className="">
        <CommentsBox Data={Data} addText={addTextData} />
      </div>
    </>
  );
}

export default App;
