export default function DeleteComment() {
  console.log("try delete");
  return (
    <>
      <div className="fixed w-full h-full z-0  top-0 left-0 ">
        <div className="flex w-full h-full z-10 justify-center items-center bg-fe-dark-blue bg-opacity-50">
          <div className=" bg-fe-white p-4 w-3/4 h-1/4">
            <div>Delete comment</div>
            <div>
              Are you sure want to delete this comment? This will remove the
              comment and can't be undone
            </div>
            <div className="flex justify-between">
              <button className=" bg-fe-grayish-Blue px-3 py-2">
                NO, CANCEL
              </button>
              <button className=" bg-fe-soft-red px-3 py-2">YES, DELETE</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
