import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../../features/products/productSlice";

const Dashboard = () => {
    const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchProducts());
}, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
    <div className="p-6">
      {/* <h1 className="text-2xl font-bold mb-6">Product List</h1> */}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            author={product.author}
            imageUrl={product.imageUrl}
            listPrice={product.listPrice}
            offerPrice={product.price50}
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
