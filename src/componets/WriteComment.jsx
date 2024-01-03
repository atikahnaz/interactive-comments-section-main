export default function WriteComment({ currentUser }) {
  return (
    <>
      <div className=" bg-fe-white mb-4 p-4 rounded-lg font-feRubik">
        <input
          type="text"
          placeholder="Add a comment..."
          className="border border-fe-light-grayish-blue w-full h-28 p-4 mb-4"
        />
        <div className="flex justify-between items-center">
          <div>
            <img className="w-7 h-7" src={currentUser.image.png} alt="" />
          </div>
          <div className="bg-fe-moderate-blue px-6 py-3 text-fe-white text-base rounded-lg font-medium">
            SEND
          </div>
        </div>
      </div>
    </>
  );
}
