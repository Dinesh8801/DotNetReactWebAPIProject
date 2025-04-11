import { createSlice } from "@reduxjs/toolkit";
import API from "../../app/api";

const initialState = {
    products: [
        {
            id : 1,
            title: "",
            description: "",
            isbn: "",
            author: "",
            listPrice: 1,
            price: 1,
            price50: 1,
            price100: 1,
            imageUrl: "",
            categoryId: 1
        }
    ],
    selectedProduct: null
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        getProducts: (state, action) => {
            state.products = action.payload;
        },
        getProductById: (state, action) => {
            state.selectedProduct = action.payload;
        },
        getProductsByCategory: (state, action) => {
            state.products = action.payload;
        },
        addProduct: (state, action) => {
            state.products.push(action.payload);
        },
        updateProduct: (state, action) => {
            const index = state.products.findIndex((prod) => prod.id === action.payload.id);
            if (index !== -1) state.products[index] = action.payload;
        },
        deleteProduct: (state, action) => {
            state.products = state.products.filter((prod) => prod.id !== action.payload);
        },
    },
});

export const { getProducts, getProductById, getProductsByCategory, addProduct, updateProduct, deleteProduct } = productSlice.actions;

export default productSlice.reducer;

// **Thunk Functions for API Calls**

export const fetchProducts = () => async (dispatch) => {
    try {
        const response = await API.get("/product");
        dispatch(getProducts(response.data));
    } catch (error) {
        console.error("Failed to fetch products", error);
    }
};

export const fetchProductById = (id) => async (dispatch) => {
    try {
        const response = await API.get(`/product/${id}`);
        dispatch(getProductById(response.data));
    } catch (error) {
        console.error("Failed to fetch product", error);
    }
};

// export const fetchProductsByCategory = (categoryId) => async (dispatch) => {
//     try {
//         const response = await API.get(`/products/category/${categoryId}`);
//         dispatch(getProductsByCategory(response.data));
//     } catch (error) {
//         console.error("Failed to fetch products by category", error);
//     }
// };

export const createProduct = (productData) => async (dispatch) => {
    try {
        console.log(productData)
        const response = await API.post("/product", productData);

        dispatch(addProduct(response.data));
        dispatch(fetchProducts());
        return response;
    } catch (error) {
        console.error("Failed to add product", error);
        return false;
    }
};

export const modifyProduct = (id, productData) => async (dispatch) => {
    try {
        const response = await API.put(`/product/${id}`, productData);
        dispatch(updateProduct({ id, ...productData }));
        return response;
    } catch (error) {
        console.error("Failed to update product", error);
        return false;
    }
};

export const removeProduct = (id) => async (dispatch) => {
    try {
        await API.delete(`/product/${id}`);
        dispatch(deleteProduct(id));
    } catch (error) {
        console.error("Failed to delete product", error);
    }
};
