import { useState } from "react";

export default function WriteComment({ currentUser, saveComments }) {
  const [commentText, setCommentText] = useState("");

  const [commentData, setCommentData] = useState({
    id: null,
    content: commentText,
    createdAt: "Today",
    score: 0,
    user: {
      image: {
        png: currentUser.image.png,
        webp: currentUser.image.webp,
      },
      username: currentUser.username,
    },
    replies: [],
  });

  const InputComment = (event) => {
    setCommentData({ ...commentData, content: event.target.value });
  };

  // callback function to save comments
  const sendComments = () => {
    //setCommentData(updatedContent);
    if (commentData.content !== "") {
      saveComments(commentData);
      setCommentData({ ...commentData, content: "" });
    }
  };

  return (
    <>
      <div className=" bg-fe-white mb-4 p-4 rounded-lg font-feRubik">
        <input
          type="text"
          placeholder="Add a comment..."
          className="border border-fe-light-grayish-blue w-full h-28 p-4 mb-4"
          value={commentData.content}
          onChange={InputComment}
        />
        <div className="flex justify-between items-center">
          <div>
            <img className="w-7 h-7" src={currentUser.image.png} alt="" />
          </div>
          <div
            className="bg-fe-moderate-blue px-6 py-3 text-fe-white text-base rounded-lg font-medium cursor-pointer"
            onClick={sendComments}
          >
            SEND
          </div>
        </div>
      </div>
    </>
  );
}
