import { useState } from "react";

export default function Reply({
  currentUser,
  usernameName,
  idToReply,
  textReply,
  closeReplyBox,
}) {
  const [reply, setReply] = useState("@" + usernameName);
  const [replyText, setReplyText] = useState("");
  const [showReply, setShowReply] = useState("true");
  const [replyData, setReplyData] = useState({
    id: null,
    content: replyText,
    createdAt: "Today",
    score: 0,
    replyingTo: usernameName,
    user: {
      image: {
        png: currentUser.image.png,
        webp: currentUser.image.webp,
      },
      username: currentUser.username,
    },
    replies: [],
  });

  // record input changes
  const InputComment = (event) => {
    setReplyData({ ...replyData, content: event.target.value });
  };

  // callback function to save reply
  const sendReply = () => {
    textReply(replyData, idToReply);
    setReplyData({ ...replyData, content: "" });
    setShowReply(false);
    closeReplyBox();
  };

  return (
    <>
      {showReply ? (
        <div className=" bg-fe-white mb-4 p-4 rounded-lg font-feRubik">
          <input
            type="text"
            value={replyData.content}
            onChange={InputComment}
            className="border border-fe-light-grayish-blue w-full h-28 p-4 mb-4"
          />
          <div className="flex justify-between items-center">
            <div>
              <img className="w-7 h-7" src={currentUser.image.png} alt="" />
            </div>
            <div
              className="bg-fe-moderate-blue px-6 py-3 text-fe-white text-base rounded-lg font-medium"
              onClick={sendReply}
            >
              SEND
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
