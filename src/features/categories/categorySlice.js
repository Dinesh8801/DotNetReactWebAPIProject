import { createSlice } from "@reduxjs/toolkit";
import API from "../../app/api";

const initialState = {
    categories: [
        {
            id : 1, 
            name : "", 
            displayOrder : 1,
            products : {}
        }
    ], 
    selectedCategory: null
}

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
      getCategories: (state, action) => {
        state.categories = action.payload;
      },
      getCategoryById: (state, action) => {
        state.selectedCategory = action.payload;
      },
      addCategory: (state, action) => {
        state.categories.push(action.payload);
      },
      updateCategory: (state, action) => {
        const index = state.categories.findIndex((cat) => cat.id === action.payload.id);
        if (index !== -1) state.categories[index] = action.payload;
      },
      deleteCategory: (state, action) => {
        state.categories = state.categories.filter((cat) => cat.id !== action.payload);
      },
    },
  });

  export const { getCategories, getCategoryById, addCategory, updateCategory, deleteCategory } = categorySlice.actions;

  export default categorySlice.reducer;

  export const fetchCategories = () => async (dispatch) => {
    try {
      const response = await API.get("/category");
      console.log(response)
      dispatch(getCategories(response.data));
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  export const fetchCategoryById = (id) => async (dispatch) => {
    try {
      const response = await API.get(`/category/${id}`);
      dispatch(getCategoryById(response.data));
    } catch (error) {
      console.error("Failed to fetch category", error);
    }
  };

  export const createCategory = (categoryData) => async (dispatch) => {
    try {
      const response = await API.post("/category", categoryData);
      dispatch(addCategory(response.data));
      return response;
    } catch (error) {
      console.error("Failed to add category", error);
      return false;
    }
  };

  export const modifyCategory = (id, categoryData) => async (dispatch) => {
    try {
      const response = await API.put(`/category/${id}`, categoryData);
      dispatch(updateCategory({ id, ...categoryData }));
      return response;
    } catch (error) {
      console.error("Failed to update category", error);
      return false;
    }
  };
  
  export const removeCategory = (id) => async (dispatch) => {
    try {
      await API.delete(`/category/${id}`);
      dispatch(deleteCategory(id));
    } catch (error) {
      console.error("Failed to delete category", error);
    }
  };