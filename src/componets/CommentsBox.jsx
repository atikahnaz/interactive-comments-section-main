import { useState } from "react";
import IconReply from "../assets/images/icon-reply.svg";
import IconPlus from "../assets/images/icon-plus.svg";
import IconMinus from "../assets/images/icon-minus.svg";
import WriteComment from "./WriteComment";
import Reply from "./Reply";

export default function CommentsBox({ Data, addText }) {
  const [showReplyBox, setShowReplyBox] = useState(null);
  const ReplyBox = (index) => {
    setShowReplyBox(index);
  };

  return (
    <>
      <div className=" font-feRubik">
        {Data.comments.map((item, index) => (
          <>
            {/**container comments and reply/send container */}
            <div>
              {/**container comments */}
              <div className=" bg-fe-white mb-4 p-4 rounded-lg">
                {/**Profile */}
                <div className="flex items-center mb-4">
                  <div className="pr-5">
                    <img
                      className=" w-8 h-8"
                      src={item.user.image.png}
                      alt=""
                    />
                  </div>
                  <div className="text-base pr-5 font-medium">
                    {item.user.username}
                  </div>
                  <div className="text-base text-fe-grayish-Blue">
                    {item.createdAt}
                  </div>
                </div>

                {/**Comments */}
                <div className=" text-fe-grayish-Blue text-base mb-4">
                  {item.content}
                </div>

                {/**score and reply button */}
                <div className="flex justify-between">
                  {/**score */}
                  <div className="flex bg-fe-light-gray items-center rounded-lg">
                    <img className="object-contain p-2" src={IconPlus} alt="" />
                    <div className="p-2  text-fe-moderate-blue font-medium">
                      {item.score}
                    </div>
                    <img
                      className="object-contain p-2"
                      src={IconMinus}
                      alt=""
                    />
                  </div>
                  {/**reply */}
                  <div className="flex items-center text-fe-moderate-blue">
                    <img
                      className="object-contain pr-2"
                      src={IconReply}
                      alt=""
                    />
                    <div
                      className="font-medium"
                      onClick={() => ReplyBox(index)}
                    >
                      Reply
                    </div>
                  </div>
                </div>
              </div>

              {/**reply box */}
              {showReplyBox === index ? (
                <Reply
                  currentUser={Data.currentUser}
                  usernameName={item.user.username}
                  textReply={addText}
                />
              ) : (
                ""
              )}
            </div>

            {item.replies.length === 0 ? (
              ""
            ) : (
              <div>
                {item.replies.map((reply, key) => (
                  <div className=" bg-fe-white mb-4 p-4 rounded-lg">
                    {/**profile */}
                    <div className="flex items-center mb-4">
                      <div className="pr-5">
                        <img
                          className=" w-8 h-8"
                          src={reply.user.image.png}
                          alt=""
                        />
                      </div>
                      <div className="text-base pr-2 font-medium">
                        {reply.user.username}
                      </div>

                      {/**current user */}
                      {reply.user.username == Data.currentUser.username ? (
                        <div className="mr-5 px-1 text-xs  bg-fe-moderate-blue text-fe-white">
                          you
                        </div>
                      ) : (
                        ""
                      )}

                      <div className="text-base text-fe-grayish-Blue">
                        {reply.createdAt}
                      </div>
                    </div>

                    {/**replies content */}
                    <div>{reply.replyingTo}</div>
                    <div className=" text-fe-grayish-Blue text-base mb-4">
                      {reply.content}
                    </div>

                    {/**score and reply button */}
                    <div className="flex justify-between">
                      <div className="flex bg-fe-light-gray items-center rounded-lg">
                        <img
                          className="object-contain p-2"
                          src={IconPlus}
                          alt=""
                        />
                        <div className="p-2  text-fe-moderate-blue font-medium">
                          {reply.score}
                        </div>
                        <img
                          className="object-contain p-2"
                          src={IconMinus}
                          alt=""
                        />
                      </div>

                      {reply.user.username == Data.currentUser.username ? (
                        <div className="flex items-center ">
                          <div>
                            <img src="" alt="" />
                          </div>
                          <div className="font-medium text-fe-soft-red">
                            Delete
                          </div>
                          <div>
                            <img src="" alt="" />
                          </div>
                          <div className="font-medium text-fe-moderate-blue">
                            Edit
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center text-fe-moderate-blue">
                          <img
                            className="object-contain pr-2"
                            src={IconReply}
                            alt=""
                          />
                          <div className="font-medium">Reply</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ))}
      </div>
      <WriteComment currentUser={Data.currentUser} />
    </>
  );
}
