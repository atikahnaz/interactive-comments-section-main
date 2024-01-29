import { useState } from "react";
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
}) {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [showReplyBoxIdBased, setShowReplyBoxIdBased] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

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
    console.log("sfefff");
    plusScore(id);
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

  const DeleteEdit = ({ id }) => {
    return (
      <>
        <div className="flex items-center cursor-pointer">
          <div className="mr-2">
            <img src={IconDelete} alt="" />
          </div>
          <div
            className="font-medium text-fe-soft-red mr-3 cursor-pointer"
            onClick={() => deletePost(id)}
          >
            Delete
          </div>
          <div className="mr-2 cursor-pointer">
            <img src={IconEdit} alt="" />
          </div>
          <div className="font-medium text-fe-moderate-blue">Edit</div>
        </div>
      </>
    );
  };

  const ReplyIcon = ({ id }) => {
    return (
      <div className="flex items-center text-fe-moderate-blue ">
        <img className="object-contain pr-2 " src={IconReply} alt="" />
        <div
          className="font-medium cursor-pointer"
          onClick={() => ReplyBoxId(id)}
        >
          Reply
        </div>
      </div>
    );
  };
  const RecursiveShowReplies = ({ data, idToReply, addScoreReply }) => {
    return (
      <div className="ml-4 border-l-2 pl-4 border-fe-light-gray">
        {data.map((reply) => (
          <div className=" bg-fe-white mb-4 p-4 rounded-lg">
            {/**profile */}
            <div className="flex items-center justify-between">
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
              {reply.user.username == Data.currentUser.username ? (
                <div className="hidden md:flex mb-4">
                  <DeleteEdit id={reply.id} />
                </div>
              ) : (
                <div className="hidden md:flex mb-4">
                  <ReplyIcon id={reply.id} />
                </div>
              )}
            </div>
            {/**replies content */}
            {/* <div>{reply.replyingTo}</div> */}
            {reply.user.username == Data.currentUser.username ? (
              <textarea
                value={"@" + reply.replyingTo + " " + reply.content}
                className="w-full text-fe-grayish-Blue text-base"
              />
            ) : (
              <div className=" text-fe-grayish-Blue text-base mb-4">
                {"@" + reply.replyingTo + " " + reply.content}
              </div>
            )}
            {/**score and reply button */}
            <div className="flex justify-between">
              <div className="flex bg-fe-light-gray items-center rounded-lg">
                <img
                  className="object-contain p-2 cursor-pointer"
                  src={IconPlus}
                  alt=""
                  onClick={() => addScoreReply(reply.id)}
                />
                <div className="p-2  text-fe-moderate-blue font-medium">
                  {reply.score}
                </div>
                <img
                  className="object-contain p-2 cursor-pointer"
                  src={IconMinus}
                  alt=""
                  onClick={() => deleteScoreReply(reply.id)}
                />
              </div>

              {reply.user.username == Data.currentUser.username ? (
                // <div className="flex items-center cursor-pointer">
                //   <div className="mr-2">
                //     <img src={IconDelete} alt="" />
                //   </div>
                //   <div
                //     className="font-medium text-fe-soft-red mr-3 cursor-pointer"
                //     onClick={() => deletePost(reply.id)}
                //   >
                //     Delete
                //   </div>
                //   <div className="mr-2 cursor-pointer">
                //     <img src={IconEdit} alt="" />
                //   </div>
                //   <div className="font-medium text-fe-moderate-blue">Edit</div>
                // </div>
                <div className="md:hidden">
                  <DeleteEdit id={reply.id} />
                </div>
              ) : (
                // <div className="flex items-center text-fe-moderate-blue">
                //   <img
                //     className="object-contain pr-2 "
                //     src={IconReply}
                //     alt=""
                //   />
                //   <div
                //     className="font-medium cursor-pointer"
                //     onClick={() => ReplyBoxId(reply.id)}
                //   >
                //     Reply
                //   </div>
                // </div>
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
              <div className=" bg-fe-white mb-4 p-4 rounded-lg">
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
                  {Data.currentUser.username === item.user.username ? (
                    <div className="hidden md:flex items-center mb-4">
                      <DeleteEdit id={item.id} />
                    </div>
                  ) : (
                    <div className="hidden md:flex items-center mb-4">
                      <ReplyIcon id={item.id} />
                    </div>
                  )}
                </div>

                {Data.currentUser.username === item.user.username ? (
                  <textarea
                    value={item.content}
                    className="w-full text-fe-grayish-Blue text-base"
                  />
                ) : (
                  <div className=" text-fe-grayish-Blue text-base mb-4">
                    {item.content}
                  </div>
                )}

                {/**Comments */}
                {/* <div className=" text-fe-grayish-Blue text-base mb-4">
                  {item.content}
                </div> */}

                {/* {Data.currentUser.username === item.user.username && (
                  <textarea
                    value={item.content}
                    className="w-full text-fe-grayish-Blue text-base"
                  />
                )} */}

                {/**score and reply button */}
                <div className="flex justify-between">
                  {/**score */}
                  <div className="flex bg-fe-light-gray items-center rounded-lg">
                    <img
                      className="object-contain p-2 cursor-pointer"
                      src={IconPlus}
                      alt=""
                      onClick={() => addScore(item.id)}
                    />
                    <div className="p-2  text-fe-moderate-blue font-medium">
                      {item.score}
                    </div>
                    <img
                      className="object-contain p-2 cursor-pointer"
                      src={IconMinus}
                      alt=""
                      onClick={() => deleteScore(item.id)}
                    />
                  </div>
                  {/**reply */}

                  {Data.currentUser.username === item.user.username ? (
                    // <div className="flex items-center cursor-pointer">
                    //   <div className="mr-2">
                    //     <img src={IconDelete} alt="" />
                    //   </div>
                    //   <div
                    //     className="font-medium text-fe-soft-red mr-3"
                    //     onClick={() => deletePost(item.id)}
                    //   >
                    //     Delete
                    //   </div>
                    //   <div className="mr-2">
                    //     <img src={IconEdit} alt="" />
                    //   </div>
                    //   <div className="font-medium text-fe-moderate-blue">
                    //     Edit
                    //   </div>
                    // </div>
                    <div className="md:hidden">
                      <DeleteEdit id={item.id} />
                    </div>
                  ) : (
                    // <div className="flex items-center text-fe-moderate-blue ">
                    //   <img
                    //     className="object-contain pr-2 "
                    //     src={IconReply}
                    //     alt=""
                    //   />
                    //   <div
                    //     className="font-medium cursor-pointer"
                    //     onClick={() => ReplyBoxId(item.id)}
                    //   >
                    //     Reply
                    //   </div>
                    // </div>
                    <div className="md:hidden">
                      <ReplyIcon id={item.id} />
                    </div>
                  )}
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
