export default function DeleteComment({ id, idComment, cancelDelete }) {
  console.log("try delete" + id);
  const deleteId = (id) => idComment(id);
  const handleClickCancel = () => {
    cancelDelete();
  };

  return (
    <>
      <div className="fixed w-full h-full z-0  top-0 left-0 ">
        <div className="flex w-full h-full z-10 justify-center items-center bg-fe-dark-blue bg-opacity-50">
          <div className=" bg-fe-white p-6 w-fit mx-4 rounded-md ">
            <div className="font-bold pb-2 text-fe-dark-blue text-xl">
              Delete comment
            </div>
            <div className=" text-fe-grayish-Blue leading-normal  text-lg">
              Are you sure want to delete this comment? This will remove the
              comment and can't be undone.
            </div>
            <div className="flex justify-between pt-3">
              <button
                className=" bg-fe-grayish-Blue px-5 py-3 rounded-md text-fe-white font-medium text-base"
                onClick={handleClickCancel}
              >
                NO, CANCEL
              </button>
              <button
                className=" bg-fe-soft-red px-5 py-3 rounded-md text-fe-white font-medium text-base"
                onClick={() => deleteId(id)}
              >
                YES, DELETE
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
