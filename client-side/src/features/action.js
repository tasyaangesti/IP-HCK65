import axios from "axios";
import { setRecipeList } from "./RecipeSlice";

export const getPopular = () => {
  return async (dispatch) => {
    try {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) {
        console.error("access token is missing.");
        return;
      }
      console.log('aaaa')

      const response = await axios.get("https://apis.tha-main.tech/recipe", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      console.log("masuk actions axios");

      console.log(response.data, "actions");
      dispatch(setRecipeList(response.data));
    } catch (error) {
      console.log(error, "error di card");
      throw error;
    }
  };
};

