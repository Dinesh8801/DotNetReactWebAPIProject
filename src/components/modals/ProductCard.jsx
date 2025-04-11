import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({  id, title, author, imageUrl, listPrice, offerPrice }) => {
  return (
    <div className="max-w-xs bg-white rounded-lg shadow-md overflow-hidden border">
      <div className="p-2 pb-0">
        {imageUrl && imageUrl !== "" ? (
          <div className="w-full h-80 overflow-hidden flex items-center justify-center bg-white">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-contain"
          />
        </div>
        
        ) : (
          <div className="w-full h-64 bg-gray-300 flex items-center justify-center text-gray-500">
            No Image Available
          </div>
        )}
      </div>

      <div className="p-4 text-center">
        <h2 className="text-sm text-gray-600 font-semibold">{title.toUpperCase()}</h2>
        <p className="text-sm text-gray-600 mt-1">
          by <span className="text-amber-700 font-semibold">{author}</span>
        </p>
        <div className="mt-3 text-sm">
          <p className="text-gray-600">
            List Price: <span className="line-through">${listPrice}</span>
          </p>
          <p className="text-gray-800 font-semibold">
            As low as: ${offerPrice}
          </p>
        </div>

        <Link
          to={`/product/${id}`}    // Navigates to product details page with the product id in the URL
          className="mt-4 w-full bg-gray-800 hover:bg-gray-700 text-white text-sm font-semibold py-2 rounded text-center block"
        >
          DETAILS
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
