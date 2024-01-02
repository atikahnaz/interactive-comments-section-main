import IconReply from "../assets/images/icon-reply.svg";
import IconPlus from "../assets/images/icon-plus.svg";
import IconMinus from "../assets/images/icon-minus.svg";

export default function CommentsBox({ Data }) {
  return (
    <>
      <div className="">
        {Data.comments.map((item, key) => (
          <>
            {/**Profile */}
            <div className="flex">
              <img src={item.user.image.png} alt="" />
              <div>{item.user.username}</div>
              <div>{item.createdAt}</div>
            </div>

            {/**Comments */}
            <div>{item.content}</div>

            {/**score and reply button */}
            <div className="flex justify-between">
              <div className="flex ">
                <img className="object-contain" src={IconPlus} alt="" />
                <div>{item.score}</div>
                <img className="object-contain" src={IconMinus} alt="" />
              </div>
              <div className="flex">
                <img className="object-contain" src={IconReply} alt="" />
                <div>Reply</div>
              </div>
            </div>

            {/**replies */}

            {item.replies.length === 0 ? (
              ""
            ) : (
              <div>
                {item.replies.map((reply, key) => (
                  <div>
                    <div>
                      <img src={reply.user.image.png} alt="" />
                      <div>{reply.user.username}</div>
                      <div>{reply.createdAt}</div>
                    </div>
                    <div>{reply.replyingTo}</div>
                    <div>{reply.content}</div>

                    <div className="flex ">
                      <img className="object-contain" src={IconPlus} alt="" />
                      <div>{reply.score}</div>
                      <img className="object-contain" src={IconMinus} alt="" />
                    </div>
                    <div className="flex">
                      <img className="object-contain" src={IconReply} alt="" />
                      <div>Reply</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ))}
      </div>
    </>
  );
}
