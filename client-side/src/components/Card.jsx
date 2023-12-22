import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { getPopular } from "../features/action";

export function Popular() {
  const navigate = useNavigate();
  const recipes = useSelector((state) => state.recipes.recipes);

  const dispatch = useDispatch();

  // console.log(recipes, "redux card");

  useEffect(() => {
    dispatch(getPopular());
  }, []);

  // console.log(popularCard);

  const payment = async (id) => {
    try {
      console.log("masuk payment", id);
      const { data } = await axios({
        method: "POST",
        url: `http://localhost:3001/transaction-midtrans/${id}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      window.snap.pay(data.token, {
        onSuccess: function (result) {
          changeStatusRecipe(id);
        },
      });
    } catch (error) {
      console.log(error);

      // alert(error.response.data.message);
    }
  };

  const changeStatusRecipe = async (id) => {
    try {
      await axios({
        method: "put",
        url: `/recipe-status/edit/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      navigate(`/recipe/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="font-extrabold text-center text-2xl mt-14">
        <h3 className=""> Recipes Picks </h3>
      </div>
      <p className="text-center"> all recipes only Rp. 30.000/recipe</p>
      <div className="container mx-auto my-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="card card-compact bg-base-100 shadow-xl mb-8 mx-2 sm:mx-4 md:mx-2 lg:mx-2"
            >
              <figure className="relative overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.image}
                  className="object-cover w-full h-64"
                />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title text-lg font-semibold mb-2">
                  {recipe.title}
                </h2>
                <div className="card-actions flex justify-between items-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      if (recipe.status === "unavailable") {
                        payment(recipe.id);
                      } else {
                        navigate(`/recipe/${recipe.id}`);
                      }
                    }}
                  >
                    {recipe.status === "unavailable"
                      ? `${recipe.status} - Buy Recipe Now`
                      : "view detail"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      ;
      <Footer />
    </>
  );
}
