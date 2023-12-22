import { configureStore } from "@reduxjs/toolkit";
import recipeSlice from "./src/features/RecipeSlice";

export default configureStore({
  reducer: {
    recipes: recipeSlice.reducer,
  },
});
