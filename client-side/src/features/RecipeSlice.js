import { createSlice } from "@reduxjs/toolkit";
import { getPopular } from "./action";

const initialState = {
  recipes: [],
};

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setRecipeList: (state, action) => {
      state.recipes = action.payload;
    },
  },
});

export const { setRecipeList } = recipeSlice.actions;
export default recipeSlice;
