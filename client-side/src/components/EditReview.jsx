import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function EditReviewRecipe() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [formEdit, setformEdit] = useState({
    review: "",
    nama: "",
  });
  
  const editFeedback = async (e) => {
    try {
      e.preventDefault();
      console.log(id, "edit fb");

      console.log("masuk edit");
      console.log(formEdit, "ini di edit fb");
      const response = await axios.put(
        `http://localhost:3001/feedback/edit/${id}`,
        formEdit,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log(response, "response");

      navigate("/recipe/feedback");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getFeedback = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/feedback/edit/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log(response, ">> res from edit");

      setformEdit({
        review: response.data.review,
        nama: response.data.nama,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (e) => {
    const { value, name } = e.target;
    setformEdit({
      ...formEdit,
      [name]: value,
    });
  };

  useEffect(() => {
    getFeedback();
  }, [id]);

  return (
    <>
      <>
        {/* Comment Form */}
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          <div className="mx-auto max-w-2xl">
            <div className="text-center">
              <h2 className="text-xl text-gray-800 font-bold sm:text-3xl dark:text-white">
                Edit a Feedback
              </h2>
            </div>
            {/* Card */}
            <div className="mt-5 p-4 relative z-10 bg-white border rounded-xl sm:mt-10 md:p-10 dark:bg-gray-800 dark:border-gray-700">
              <form onSubmit={editFeedback}>
                <div className="mb-4 sm:mb-8">
                  <label
                    htmlFor="hs-feedback-post-comment-name-1"
                    className="block mb-2 text-sm font-medium dark:text-white"
                  >
                    Nama
                  </label>
                  <input
                    type="text"
                    id="nama"
                    name="nama"
                    value={formEdit.nama}
                    onChange={handleEdit}
                    className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                    placeholder="Full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="hs-feedback-post-comment-textarea-1"
                    className="block mb-2 text-sm font-medium dark:text-white"
                  >
                    Comment
                  </label>
                  <div className="mt-1">
                    <textarea
                      name="review"
                      id="review"
                      value={formEdit.review}
                      onChange={handleEdit}
                      rows={3}
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      placeholder="Leave your comment here..."
                    />
                  </div>
                </div>
                <div className="mt-6 grid">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
            {/* End Card */}
          </div>
        </div>
        {/* End Comment Form */}
      </>
    </>
  );
}
