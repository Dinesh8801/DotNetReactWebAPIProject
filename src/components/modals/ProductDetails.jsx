import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

const ProductDetails = () => {
  const { id } = useParams();
  const product = useSelector((state) =>
    state.products.products.find((p) => p.id === parseInt(id))
  );

  if (!product) return <div>Product not found!</div>;

  return (
    <div className="h-screen">
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md mt-6 border">
        <div className="bg-gradient-to-b from-gray-600 to-gray-700 text-white text-center py-4 mb-6 text-2xl font-semibold">
          <h1 className="text-3xl font-bold text-center">{product.title}</h1>
          <p className="text-center text-gray-600 font-semibold mb-4">
            by <span className="text-green-600">{product.author}</span>
          </p>
        </div>

        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 bg-gray-700 text-white hover:bg-gray-300 px-4 py-2 mb-4 rounded-lg shadow-sm transition"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Home
        </Link>

        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={`${product.imageUrl}`} // match your image path strategy
            alt={product.title}
            className="w-64 h-auto object-cover mx-auto"
          />

          <div className="flex-1">
            <p className="text-gray-500 mb-2">ISBN: {product.isbn}</p>
            <p className="text-gray-400 line-through mb-1">
              List Price: ${product.listPrice}
            </p>

            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="font-semibold text-gray-600">Quantity</div>
              <div className="text-orange-600 font-bold">1-50</div>
              <div className="text-orange-600 font-bold">51-100</div>
              <div className="text-orange-600 font-bold">100+</div>

              <div className="font-semibold text-gray-600">Price</div>
              <div className="text-orange-700 font-bold">${product.price}</div>
              <div className="text-orange-700 font-bold">
                ${product.price50}
              </div>
              <div className="text-orange-700 font-bold">
                ${product.price100}
              </div>
            </div>

            <p className="text-gray-600">
              {product.description || "Product description goes here..."}
            </p>

            <div className="flex items-center mt-6">
              <span className="bg-gray-800 text-white px-4 py-2 rounded-l">
                Count
              </span>
              <input
                type="number"
                value={1}
                min={1}
                className="border border-gray-300 p-2 rounded-r w-20"
              />
            </div>

            <button
              disabled
              className="mt-6 w-full bg-gray-400 text-white font-semibold py-2 px-4 rounded cursor-not-allowed"
            >
              ADD TO CART (COMING SOON…)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
