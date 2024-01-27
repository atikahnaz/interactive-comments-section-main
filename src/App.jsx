import { useState, useEffect } from "react";
import "./App.css";
import CommentsBox from "./componets/CommentsBox";
import CommentsData from "../data.json";
import { comment } from "postcss";

function App() {
  const [Data, setData] = useState(CommentsData);
  const [idNew, setIdNew] = useState(4);

  // recursive function to add replies

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

  const recursiveDeleteReplies = (id) => {
    // map array of comments
    // if comments.replies.length > 0
    // use recursive to loop
    // find the matching id
    // if id matched delete the id and content
    // else if comments.replies == 0
    // check if comment.id match with id
    // // if id matched delete the id and content

    console.log("testfing deletedd");
    const updatedComments = Data.comments.filter((comment) => {
      if (comment.id !== id) {
        console.log("first comment");
        return true;
      }
      if (comment.replies && comment.replies.length > 0) {
        console.log("relplies");
        return false;
      } else if (comment.id !== id) {
        return true;
      }
    });
    //   if (comment.id !== id) {
    //     console.log(comment);
    //     return true;
    //   }
    //   if (comment.replies && comment.replies.length > 0) {
    //     console.log("hhhhhh" + comment);
    //   }
    // });
    // console.log("udhy");
    return updatedComments;
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

  const testDelete = (id) => {
    setData({ ...Data, comments: recursiveDeleteReplies(id) });
  };

  const deleteComment = (id) => {
    console.log("delete");

    const updatedComments = Data.comments.filter(
      (comment) => comment.id !== id
    );

    setData({ ...Data, comments: updatedComments });
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
      <div className=" font-feRubik">
        <CommentsBox
          Data={Data}
          addReply={addReply}
          saveCommentsText={addCommentsText}
          deletePostFromParent={testDelete}
        />
      </div>
    </>
  );
}

export default App;
