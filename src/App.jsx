import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CommentsBox from "./componets/CommentsBox";
import CommentsData from "../data.json";

function App() {
  const [Data, setData] = useState(CommentsData);
  const [idNew, setIdNew] = useState(4);

  // recursive function to add replies

  const recursiveAddReplies = (comments, idReplies, newReply) =>
    comments.map((comment) =>
      // reply to original comment
      comment.id === idReplies
        ? { ...comment, replies: [...comment.replies, newReply] }
        : comment.replies && comment.replies.length > 0
        ? {
            ...comment,
            replies: recursiveAddReplies(comment.replies, idReplies, newReply),
          }
        : comment
    );

  const addReply = (item, idReplies) => {
    setIdNew((idNumber) => {
      const newReply = { ...item, id: idNumber + 1 };
      setData({
        ...Data,
        comments: recursiveAddReplies(Data.comments, idReplies, newReply),
      });
      return idNumber + 1;
    });
  };

  // callback function to save text
  const addTextReply = (item, idReplies) => {
    console.log("hy");
    console.log("id to reply" + idReplies);
    // add id to new reply
    setIdNew((idNo) => {
      const newReply = { ...item, id: idNo + 1 };
      //iterate comments to find the matching id to reply
      // should insert recursive inside to iterate all comments and replies.
      setData({
        ...Data,
        comments: Data.comments.map((reply, index) =>
          reply.id === idReplies
            ? { ...reply, replies: [...reply.replies, newReply] }
            : reply
        ),
      });

      // find the id, and index at Data
      //setData({ ...Data, comments: [...Data.comments[0].replies, newReply] });
      /*Data.comments.map((comment, index) => {
        comment.id === 1 &&
          setData({
            ...comment,
            comments: [...comment.replies, newReply],
          });
        console.log("id replyyy " + comment.id);
      });*/
      return idNo + 1;
    });
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
          addReply={addReply}
          saveCommentsText={addCommentsText}
        />
      </div>
    </>
  );
}

export default App;
