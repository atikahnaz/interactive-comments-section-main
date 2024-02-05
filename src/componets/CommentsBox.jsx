import { useState, useRef, useEffect } from "react";
import IconReply from "../assets/images/icon-reply.svg";
import IconPlus from "../assets/images/icon-plus.svg";
import IconMinus from "../assets/images/icon-minus.svg";
import WriteComment from "./WriteComment";
import Reply from "./Reply";
import IconDelete from "../assets/images/icon-delete.svg";
import IconEdit from "../assets/images/icon-edit.svg";
import Delete from "./Delete";

export default function CommentsBox({
  Data,
  addReply,
  saveCommentsText,
  deletePostFromParent,
  plusScore,
  minusScore,
  saveUpdatedTextComment,
}) {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [showReplyBoxIdBased, setShowReplyBoxIdBased] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [openEditText, setOpenEditText] = useState(false);
  const [idToEdit, setIdToEdit] = useState(null);
  const [textToEdit, setTextToEdit] = useState("");

  const textAreaRef = useRef(null);

  const closeReplyBox = () => {
    console.log("fefefe");
    setShowReplyBox(false);
  };

  const ReplyBoxId = (idNumber) => {
    setShowReplyBoxIdBased(idNumber);
    setShowReplyBox(true);
    console.log("frf");
    console.log(idNumber);
  };

  const addScore = (id) => {
    plusScore(id);
  };
  const addScoreReply = (id) => {
    plusScore(id);
  };

  const ButtonPlusMinusScore = ({ id, score }) => {
    return (
      <div className="flex bg-fe-light-gray items-center rounded-lg lg:flex-col  lg:h-fit lg:justify-start lg:mr-3 lg:p-2">
        <img
          className="object-contain p-2 cursor-pointer  "
          src={IconPlus}
          alt=""
          onClick={() => addScore(id)}
        />
        <div className="p-2  text-fe-moderate-blue font-medium">{score}</div>
        <img
          className="object-contain p-2 cursor-pointer "
          src={IconMinus}
          alt=""
          onClick={() => deleteScore(id)}
        />
      </div>
    );
  };

  const deleteScore = (id) => {
    minusScore(id);
  };

  const deleteScoreReply = (id) => {
    minusScore(id);
  };

  const deletePost = (id) => {
    console.log("delete");
    console.log("id" + id);
    setShowDeletePopup(true);
    setIdToDelete(id);
  };

  const idToDeleteComment = (id) => {
    deletePostFromParent(id);
    setShowDeletePopup(false);
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
  };

  const editText = (id, content) => {
    // if (textAreaRef.current) {
    //   textAreaRef.current.focus();
    // } else {
    console.log("gaol");
    console.log(content);
    // }
    setTextToEdit(content);
    setIdToEdit(id);
    setOpenEditText(true);
  };

  useEffect(() => {
    console.log("chnagibfg");
    console.log(textToEdit);
  }, [textToEdit]);

  const DeleteEdit = ({ id, content }) => {
    //console.log("content rpelise", content);
    return (
      <>
        <div className="flex items-center cursor-pointer">
          <div className="flex items-center hover:opacity-50">
            <div className="mr-2">
              <img src={IconDelete} alt="" />
            </div>
            <div
              className="font-medium text-fe-soft-red mr-3 cursor-pointer"
              onClick={() => deletePost(id)}
            >
              Delete
            </div>
          </div>
          <div className="flex items-center hover:opacity-50">
            <div className="mr-2 cursor-pointer">
              <img src={IconEdit} alt="" />
            </div>
            <div
              className="font-medium text-fe-moderate-blue"
              onClick={() => {
                editText(id, content);
                //console.log(textAreaRef.current.focus);
              }}
            >
              Edit
            </div>
          </div>
        </div>
      </>
    );
  };

  const saveUpdatedText = (text, id) => {
    console.log(textToEdit, idToEdit);
    saveUpdatedTextComment(text, id);
    setOpenEditText(false);
  };

  const ReplyIcon = ({ id }) => {
    return (
      <div className="flex items-center text-fe-moderate-blue hover:opacity-50">
        <img className="object-contain pr-2 " src={IconReply} alt="" />
        <div
          className="font-medium cursor-pointer "
          onClick={() => ReplyBoxId(id)}
        >
          Reply
        </div>
      </div>
    );
  };
  const RecursiveShowReplies = ({ data, idToReply, addScoreReply }) => {
    const [textToEditReply, setTextToEditReply] = useState(textToEdit);

    return (
      <div className="ml-4 border-l-2 pl-4 border-fe-light-gray">
        {data.map((reply) => (
          <div className=" bg-fe-white mb-4 p-4 rounded-lg lg:flex">
            <div className="hidden lg:flex">
              <ButtonPlusMinusScore id={reply.id} score={reply.score} />
            </div>
            <div className="w-full">
              {/**profile */}
              <div className="flex items-center justify-between">
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
                {reply.user.username == Data.currentUser.username ? (
                  <div className="hidden md:flex mb-4">
                    <DeleteEdit id={reply.id} content={reply.content} />
                  </div>
                ) : (
                  <div className="hidden md:flex mb-4">
                    <ReplyIcon id={reply.id} />
                  </div>
                )}
              </div>
              {/**replies content */}

              {reply.id === idToEdit && openEditText ? (
                <div className="flex-col justify-end">
                  <textarea
                    ref={textAreaRef}
                    value={textToEditReply}
                    onChange={(e) => setTextToEditReply(e.target.value)}
                    className="w-full  overflow-hidden resize-none text-fe-grayish-Blue text-base p-2"
                    rows={4}
                  />
                  <div className="w-full">
                    <button
                      className="bg-fe-moderate-blue px-6 py-3 mb-3 text-fe-white text-base rounded-lg font-medium cursor-pointer hover:opacity-50"
                      onClick={() => saveUpdatedText(textToEditReply, idToEdit)}
                    >
                      UPDATE
                    </button>
                  </div>
                </div>
              ) : (
                <div className=" text-fe-grayish-Blue text-base mb-4">
                  <span className=" text-fe-moderate-blue font-medium">
                    {"@" + reply.replyingTo}
                  </span>
                  {" " + reply.content}
                </div>
              )}

              {/**score and reply button */}
              <div className="flex justify-between items-center">
                <div className="lg:hidden">
                  <ButtonPlusMinusScore id={reply.id} score={reply.score} />
                </div>

                {reply.user.username == Data.currentUser.username ? (
                  <div className="md:hidden">
                    <DeleteEdit id={reply.id} content={reply.content} />
                  </div>
                ) : (
                  <div className="md:hidden">
                    <ReplyIcon id={reply.id} />
                  </div>
                )}
              </div>

              {/**reply box */}
              {showReplyBoxIdBased === reply.id && showReplyBox == true ? (
                <Reply
                  currentUser={Data.currentUser}
                  usernameName={reply.user.username}
                  idToReply={reply.id}
                  textReply={addReply}
                  closeReplyBox={closeReplyBox}
                />
              ) : (
                ""
              )}
              {reply.replies && (
                <RecursiveShowReplies
                  data={reply.replies}
                  idToReply={reply.id}
                  addScore={addScore}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className=" font-feRubik">
        {Data.comments.map((item) => (
          <>
            {/**container comments and reply/send container */}
            <div>
              {/**container comments */}
              <div className=" bg-fe-white mb-4 p-4 rounded-lg lg:flex">
                <div className="hidden lg:flex">
                  <ButtonPlusMinusScore id={item.id} score={item.score} />
                </div>

                <div className="w-full">
                  {/**Profile */}
                  <div className="flex justify-between">
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
                    {/**console.log(item.content)*/}
                    {Data.currentUser.username === item.user.username ? (
                      <div className="hidden md:flex items-center mb-4">
                        <DeleteEdit id={item.id} content={item.content} />
                      </div>
                    ) : (
                      <div className="hidden md:flex items-center mb-4">
                        <ReplyIcon id={item.id} />
                      </div>
                    )}
                  </div>

                  {/** edit this line to show update button 
                  {Data.currentUser.username === item.user.username ? (
                    <textarea
                      value={item.content}
                      className="w-full text-fe-grayish-Blue text-base"
                    />
                  ) : (
                    <div className=" text-fe-grayish-Blue text-base mb-4">
                      {item.content}
                    </div>
                  )}*/}

                  {item.id === idToEdit && openEditText ? (
                    <div className="flex-col justify-end">
                      <textarea
                        value={textToEdit}
                        onChange={(e) => setTextToEdit(e.target.value)}
                        className="w-full text-fe-grayish-Blue text-base p-2 resize-none"
                      />
                      <div className="w-full">
                        <button
                          className="bg-fe-moderate-blue px-6 py-3 mb-3 text-fe-white text-base rounded-lg font-medium cursor-pointer hover:opacity-50"
                          onClick={() => saveUpdatedText(textToEdit, idToEdit)}
                        >
                          UPDATE
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className=" text-fe-grayish-Blue text-base mb-4">
                      {item.content}
                    </div>
                  )}

                  {/**Comments */}

                  {/**score and reply button */}
                  <div className="flex justify-between items-center">
                    {/**score */}

                    <div className="lg:hidden">
                      <ButtonPlusMinusScore id={item.id} score={item.score} />
                    </div>

                    {/**reply */}

                    {Data.currentUser.username === item.user.username ? (
                      <div className="md:hidden">
                        <DeleteEdit id={item.id} content={item.content} />
                      </div>
                    ) : (
                      <div className="md:hidden">
                        <ReplyIcon id={item.id} />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/**reply box */}

              {showReplyBoxIdBased === item.id ? (
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
                <RecursiveShowReplies
                  data={item.replies}
                  idToReply={item.id}
                  addScoreReply={addScoreReply}
                  closeReplyBox={closeReplyBox}
                />
              </div>
            )}
          </>
        ))}
      </div>
      <WriteComment
        currentUser={Data.currentUser}
        saveComments={saveCommentsText}
      />
      {showDeletePopup && (
        <Delete
          id={idToDelete}
          idComment={idToDeleteComment}
          cancelDelete={cancelDelete}
        />
      )}
    </>
  );
}
