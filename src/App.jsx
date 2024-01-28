import { useState, useEffect } from "react";
import "./App.css";
import CommentsBox from "./componets/CommentsBox";
import CommentsData from "../data.json";
import { comment } from "postcss";

function App() {
  const [Data, setData] = useState(CommentsData);
  const [idNew, setIdNew] = useState(4);

  const recursiveAddReplies = (comments, idReplies, newReply) =>
    comments.map((comment, index) =>
      comment.id === idReplies
        ? { ...comment, replies: [...(comment.replies || []), newReply] }
        : comment.replies && comment.replies.length > 0
        ? {
            ...comment,
            replies: recursiveAddReplies(comment.replies, idReplies, newReply),
          }
        : comment
    );

  const recursiveDeleteReplies = (comments, id) => {
    return comments.filter((comment) => {
      if (comment.id === id) {
        return false;
      }
      if (comment.replies && comment.replies.length > 0) {
        comment.replies = recursiveDeleteReplies(comment.replies, id);
      }
      return true;
    });
  };

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

  const deleteCommentsText = (id) => {
    setData({ ...Data, comments: recursiveDeleteReplies(Data.comments, id) });
  };

  //callback function to save comments
  const addCommentsText = (item) => {
    // add id to comments
    setIdNew((idNo) => {
      const newComments = { ...item, id: idNo + 1 };
      setData({ ...Data, comments: [...Data.comments, newComments] });
      return idNo + 1;
    });
  };

  const recursiveAddScore = (comments, id) =>
    comments.map((comment) =>
      comment.id === id
        ? { ...comment, score: comment.score + 1 }
        : comment.replies && comment.replies.length > 0
        ? { ...comment, replies: recursiveAddScore(comment.replies, id) }
        : comment
    );

  const plusScore = (id) => {
    setData({ ...Data, comments: recursiveAddScore(Data.comments, id) });
  };
  useEffect(() => {
    console.log(Data);
  }, [Data]);
  return (
    <>
      <div className=" font-feRubik">
        <CommentsBox
          Data={Data}
          addReply={addReply}
          saveCommentsText={addCommentsText}
          deletePostFromParent={deleteCommentsText}
          plusScore={plusScore}
        />
      </div>
    </>
  );
}

export default App;
