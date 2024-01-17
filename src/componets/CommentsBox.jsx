import { useState } from "react";
import IconReply from "../assets/images/icon-reply.svg";
import IconPlus from "../assets/images/icon-plus.svg";
import IconMinus from "../assets/images/icon-minus.svg";
import WriteComment from "./WriteComment";
import Reply from "./Reply";
import IconDelete from "../assets/images/icon-delete.svg";
import IconEdit from "../assets/images/icon-edit.svg";

export default function CommentsBox({ Data, addReply, saveCommentsText }) {
  const [showReplyBox, setShowReplyBox] = useState(null);
  const [idReplies, setIdReplies] = useState(null);
  const [showReplyBoxIdBased, setShowReplyBoxIdBased] = useState(null);

  const ReplyBox = (index) => {
    setShowReplyBox(index);
    console.log("fefefe");
  };

  const ReplyBoxId = (idNumber) => {
    setShowReplyBoxIdBased(idNumber);
    console.log("frf");
    console.log(idNumber);
  };

  const RecursiveShowReplies = ({ data, idToReply }) => {
    console.log("id to reply" + idToReply);
    return (
      <div className="ml-4 border-l-2 pl-4 border-fe-light-gray">
        {data.map((reply, key) => (
          <div className=" bg-fe-white mb-4 p-4 rounded-lg">
            {/**profile */}
            {reply.replies && (
              <RecursiveShowReplies data={reply.replies} idToReply={reply.id} />
            )}
            {console.log("id to reply inside" + idToReply)}
            <div className="flex items-center mb-4">
              <div className="pr-5">
                <img className=" w-8 h-8" src={reply.user.image.png} alt="" />
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
                <img className="object-contain p-2" src={IconPlus} alt="" />
                <div className="p-2  text-fe-moderate-blue font-medium">
                  {reply.score}
                </div>
                <img className="object-contain p-2" src={IconMinus} alt="" />
              </div>

              {reply.user.username == Data.currentUser.username ? (
                <div className="flex items-center ">
                  <div className="mr-2">
                    <img src={IconDelete} alt="" />
                  </div>
                  <div className="font-medium text-fe-soft-red mr-3 ">
                    Delete
                  </div>
                  <div className="mr-2">
                    <img src={IconEdit} alt="" />
                  </div>
                  <div className="font-medium text-fe-moderate-blue">Edit</div>
                </div>
              ) : (
                <div className="flex items-center text-fe-moderate-blue">
                  <img className="object-contain pr-2" src={IconReply} alt="" />
                  <div
                    className="font-medium"
                    onClick={() => ReplyBoxId(reply.id)}
                  >
                    Reply
                  </div>
                </div>
              )}
            </div>

            {/**reply box */}
            {showReplyBoxIdBased === reply.id ? (
              <Reply
                currentUser={Data.currentUser}
                usernameName={reply.user.username}
                idToReply={reply.id}
                textReply={addReply}
              />
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    );
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
                  {Data.currentUser.username === item.user.username ? (
                    <div className="mr-5 px-1 text-xs  bg-fe-moderate-blue text-fe-white">
                      you
                    </div>
                  ) : (
                    ""
                  )}
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

                  {Data.currentUser.username === item.user.username ? (
                    <div className="flex items-center ">
                      <div className="mr-2">
                        <img src={IconDelete} alt="" />
                      </div>
                      <div className="font-medium text-fe-soft-red mr-3 ">
                        Delete
                      </div>
                      <div className="mr-2">
                        <img src={IconEdit} alt="" />
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
                      <div
                        className="font-medium"
                        onClick={() => ReplyBox(index)}
                      >
                        Reply
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/**reply box */}
              {showReplyBox === index ? (
                <Reply
                  currentUser={Data.currentUser}
                  usernameName={item.user.username}
                  idToReply={item.id}
                  textReply={addReply}
                />
              ) : (
                ""
              )}
            </div>

            {item.replies.length === 0 ? (
              ""
            ) : (
              <div>
                {/**<RecursiveShowReplies data={item.replies} />*/}
                <RecursiveShowReplies data={item.replies} idToReply={item.id} />
                <div>non recursive</div>
                <div className="ml-4 border-l-2 pl-4 border-fe-light-gray">
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
                            <div className="mr-2">
                              <img src={IconDelete} alt="" />
                            </div>
                            <div className="font-medium text-fe-soft-red mr-3 ">
                              Delete
                            </div>
                            <div className="mr-2">
                              <img src={IconEdit} alt="" />
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
                            <div
                              className="font-medium"
                              onClick={() => ReplyBoxId(reply.id)}
                            >
                              Reply
                            </div>
                          </div>
                        )}
                      </div>

                      {/**reply box */}
                      {showReplyBoxIdBased === reply.id ? (
                        <Reply
                          currentUser={Data.currentUser}
                          usernameName={item.user.username}
                          idToReply={item.id}
                          textReply={addReply}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ))}
      </div>
      <WriteComment
        currentUser={Data.currentUser}
        saveComments={saveCommentsText}
      />
    </>
  );
}
