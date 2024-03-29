import { useState, useEffect } from "react";
import "./App.css";
import CommentsBox from "./componets/CommentsBox";
import CommentsData from "../data.json";
import { comment } from "postcss";

function App() {
  const [Data, setData] = useState(CommentsData);
  const [idNew, setIdNew] = useState(4);

  const recursiveAddReplies = (comments, idReplies, newReply) => {
    if (newReply.content !== "") {
      return comments.map((comment, index) =>
        comment.id === idReplies
          ? { ...comment, replies: [...(comment.replies || []), newReply] }
          : comment.replies && comment.replies.length > 0
          ? {
              ...comment,
              replies: recursiveAddReplies(
                comment.replies,
                idReplies,
                newReply
              ),
            }
          : comment
      );
    } else {
      return comments;
    }
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

  const recursiveSaveUpdatedText = (comments, text, id) =>
    comments.map((comment) =>
      comment.id === id
        ? { ...comment, content: text }
        : comment.replies && comment.replies.length > 0
        ? {
            ...comment,
            replies: recursiveSaveUpdatedText(comment.replies, text, id),
          }
        : comment
    );

  const saveUpdatedTextComment = (text, id) => {
    setData({
      ...Data,
      comments: recursiveSaveUpdatedText(Data.comments, text, id),
    });

    // const updatedComments = Data.comments.map((comment) =>
    //   comment.id === id ? { ...comment, content: text } : comment
    // );
    // setData({ ...Data, comments: updatedComments });
  };

  const plusScore = (id) => {
    const recursiveAddScore = (comments, id) =>
      comments.map((comment) =>
        comment.id === id
          ? { ...comment, score: comment.score + 1 }
          : comment.replies && comment.replies.length > 0
          ? { ...comment, replies: recursiveAddScore(comment.replies, id) }
          : comment
      );

    setData({ ...Data, comments: recursiveAddScore(Data.comments, id) });
  };

  const minusScore = (id) => {
    const recursiveDeleteScore = (comments, id) =>
      comments.map((comment) =>
        comment.id === id && comment.score > 0
          ? { ...comment, score: comment.score - 1 }
          : comment.replies && comment.replies.length > 0
          ? { ...comment, replies: recursiveDeleteScore(comment.replies, id) }
          : comment
      );
    setData({ ...Data, comments: recursiveDeleteScore(Data.comments, id) });
  };

  return (
    <>
      <div className="font-feRubik lg:w-1/2 mx-auto">
        <CommentsBox
          Data={Data}
          addReply={addReply}
          saveCommentsText={addCommentsText}
          deletePostFromParent={deleteCommentsText}
          plusScore={plusScore}
          minusScore={minusScore}
          saveUpdatedTextComment={saveUpdatedTextComment}
        />
      </div>
    </>
  );
}

export default App;
