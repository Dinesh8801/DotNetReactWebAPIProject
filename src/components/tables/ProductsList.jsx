import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  removeProduct,
} from "../../features/products/productSlice";
import { fetchCategories } from "../../features/categories/categorySlice";
import ProductModal from "../modals/ProductModal";
import Prompt from "../Notifications/Prompt";

const ProductsList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(true);
  const [productDetail, setProductDetail] = useState(null);

  const [isModalPromptOpen, setIsModalPromptOpen] = useState(false);
  const [promptMessage, setPromptMessage] = useState(null);
  const [productDelete, setProductDelete] = useState(null);

  const dispatch = useDispatch();
  // @ts-ignore
  const products = useSelector((state) => state.products.products);
  // @ts-ignore
  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchProducts());
    // @ts-ignore
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleEditModal = (id) => {
    setIsModalOpen(true);
    setIsCreate(false);
    const product = products.find((product) => product.id === id);
    setProductDetail(product);
  };

  const handleDeletePrompt = (id) => {
    const product = products.find((product) => product.id === id);
    setIsModalPromptOpen(true);
    setPromptMessage(`Are you sure you want to delete ${product.name}?`);
    setProductDelete(id);
  };

  const handleDelete = () => {
    // @ts-ignore
    dispatch(removeProduct(productDelete));
    setIsModalPromptOpen(false);
    setPromptMessage(null);
    setProductDelete(null);
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === Number(categoryId));
    return category ? category.name : "Category Not Found";
  };

  const handleCreateModal = () => {
    setIsModalOpen(true);
    setIsCreate(true);
    setProductDetail(null);
  };

  return (
    <>
      <Prompt
        isOpen={isModalPromptOpen}
        message={promptMessage}
        onConfirm={handleDelete}
        onCancel={() => setIsModalPromptOpen(false)}
      />
      <div className="h-screen">
        <div className="max-w-6xl mx-auto mt-10 bg-white shadow-md rounded-md overflow-hidden">
          <div className="bg-gradient-to-b from-gray-600 to-gray-700 text-white text-center py-4 text-2xl font-semibold">
            Product List
          </div>

          <div className="flex justify-between items-center px-6 py-4">
            <div>
              <label className="mr-2 text-sm">Show</label>
              <select className="border rounded px-2 py-1 text-sm">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <span className="ml-2 text-sm">entries per page</span>
            </div>
            <button
              onClick={handleCreateModal}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800"
            >
              <FaPlus /> Create New Product
            </button>
            {/* <div>
            <label className="mr-2 text-sm">Search:</label>
            <input
              type="text"
              className="border px-2 py-1 text-sm rounded"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div> */}
          </div>

          <div className="overflow-x-auto px-6 pb-4">
            <table className="min-w-full border">
              <thead>
                <tr className="bg-gray-100 text-left text-sm">
                  <th className="px-4 py-2 border">Title</th>
                  <th className="px-4 py-2 border">ISBN</th>
                  <th className="px-4 py-2 border">Price</th>
                  <th className="px-4 py-2 border">Author</th>
                  <th className="px-4 py-2 border">Category</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.isbn} className="border-t even:bg-gray-50">
                    <td className="px-4 py-2 border">{product.title}</td>
                    <td className="px-4 py-2 border">{product.isbn}</td>
                    <td className="px-4 py-2 border">${product.price}</td>
                    <td className="px-4 py-2 border">{product.author}</td>
                    <td className="px-4 py-2 border">{product.categoryId}</td>
                    <td className="px-4 py-2 border">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditModal(product.id)}
                          className="flex items-center gap-1 px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          onClick={() => handleDeletePrompt(product.id)}
                          className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500"
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-4 text-sm text-gray-500"
                    >
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="px-6 pb-4 text-sm text-gray-600">
            Showing {products.length} of {products.length} entries
          </div>
        </div>
      </div>
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isCreate={isCreate}
        productDetail={productDetail}
        categories={categories}
      />
    </>
  );
};

export default ProductsList;
