import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DetailRecipe() {
  const { id } = useParams();
  console.log(id, ">id");
  const [detailRecipe, setDetailRecipe] = useState();

  const recipes = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/recipe/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setDetailRecipe(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    recipes();
  }, [id]);

  return (
    <>
      <div className="container-detail-page">
        <>
          {/*  Article */}
          <div className="max-w-3xl px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto">
            <div className="max-w-2xl">
              {/* Avatar Media */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex w-full sm:items-center gap-x-5 sm:gap-x-3">
                  <div className="flex-shrink-0"></div>
                </div>
              </div>
              {/* Content */}
              <div className="space-y-5 md:space-y-8">
                <div className="space-y-3">
                  <h2
                    className="text-2xl font-bold md:text-3xl dark:text-white"
                    style={{ textAlign: "center" }}
                  >
                    {detailRecipe?.title}
                  </h2>
                </div>
                <figure>
                  <img
                    className="w-full object-cover rounded-xl"
                    src={detailRecipe?.image}
                  />
                </figure>
                <p className="text-lg text-gray-800 dark:text-gray-200">
                  <strong> Ingredients</strong> : {detailRecipe?.ingredients}
                </p>
                <p className="text-lg text-gray-800 dark:text-gray-200">
                  <strong> Instruction</strong> : {detailRecipe?.instruction}
                </p>
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
}

export default DetailRecipe;
