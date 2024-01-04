import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CommentsBox from "./componets/CommentsBox";
import CommentsData from "../data.json";

function App() {
  const [Data, setData] = useState(CommentsData);
  const [idNew, setIdNew] = useState(4);

  // callback function to save text
  const addTextComment = () => {
    console.log("hy");
  };

  //callback function to save comments
  const addCommentsText = (item) => {
    console.log("send comments");
    console.log(item);
    // add id to comments
    setIdNew((idNo) => {
      const newComments = { ...item, id: idNo + 1 };
      console.log(newComments);

      setData({ ...Data, comments: [...Data.comments, newComments] });
      return idNo + 1;
    });
  };

  useEffect(() => {
    console.log(Data);
  }, [Data]);
  return (
    <>
      <div className="">
        <CommentsBox
          Data={Data}
          addText={addTextComment}
          saveCommentsText={addCommentsText}
        />
      </div>
    </>
  );
}

export default App;
