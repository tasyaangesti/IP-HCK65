import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Popular() {
  const [popularCard, setPopularCard] = useState([]);
  const navigate = useNavigate();

  // console.log(popularCard, ">> card");

  const getPopular = async () => {
    try {
      // const response = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.API_SPOONCULAR}&number=9`);
      // const response = await axios({
      //   method: "get",
      //   url: 'https://api.spoonacular.com/recipes/random?apiKey=04d05c33b034480e9e33bab2ce4ed012&number=9',
      // });

      const response = await axios.get("http://localhost:3001/recipe", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      console.log(response.data, ">> response dari card");
      setPopularCard(response.data);
    } catch (error) {
      console.log(error, "error di card");
    }
  };

  useEffect(() => {
    getPopular();
  }, []);

  // console.log(popularCard);

  const payment = async (id) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: `http://localhost:3001/transaction-midtrans/${id}`,
        headers: {
          access_token: localStorage.access_token,
        },
      });

      window.snap.pay(data.token, {
        onSuccess: function (result) {
          changeStatusRecipe(id);
        },
      });
    } catch (error) {
      console.log(error);

      // Gunakan Swal atau cara pemberitahuan lainnya sesuai kebutuhan Anda
      alert(error.response.data.message);
    }
  };

  const changeStatusRecipe = async (id) => {
    try {
      await axios({
        method: "put",
        url: `${base_url}/recipe/${id}`,
        headers: {
          access_token: localStorage.access_token,
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
          {popularCard.map((recipe) => (
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
                  <button className="btn btn-primary">
                    <Link to={`/recipe/${recipe.id}`}>Buy Recipe Now</Link>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      ;
    </>
  );
}
