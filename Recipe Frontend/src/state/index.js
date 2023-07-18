import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setRecipes: (state, action) => {
      state.items = action.payload;
    },
  }
});

export const {
  setRecipes,
} = recipeSlice.actions;

export default recipeSlice.reducer;