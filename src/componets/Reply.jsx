import { useState } from "react";

export default function Reply({ currentUser, usernameName, textReply }) {
  const [reply, setReply] = useState("@" + usernameName);
  const [replyText, setReplyText] = useState("");

  const inputComment = (event) => {
    setReply(event.target.value);
    setReplyText(event.target.value);
  };

  const sendReply = () => {
    textReply(replyText);
  };

  return (
    <>
      <div className=" bg-fe-white mb-4 p-4 rounded-lg font-feRubik">
        <input
          type="text"
          value={reply}
          onChange={inputComment}
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
    </>
  );
}
