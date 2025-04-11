import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  removeCategory,
} from "../../features/categories/categorySlice";
import CategoryModal from "../modals/CategoryModal";
import Prompt from "../Notifications/Prompt";

const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(true);
  const [categoryDetail, setCategoryDetail] = useState(null);

  const [isModalPromptOpen, setIsModalPromptOpen] = useState(false);
  const [promptMessage, setPromptMessage] = useState(null);
  const [categoryDelete, setCatgoryDelete] = useState(null);

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDeletePrompt = (id) => {
    const category = categories.find((cat) => cat.id === Number(id));
    setIsModalPromptOpen(true);
    setPromptMessage(
      `Are you sure you want to delete ${category.name}? It will delete all the products related to ${category.name}`
    );
    setCatgoryDelete(id);
  };

  const handleDelete = () => {
    // @ts-ignore
    dispatch(removeCategory(categoryDelete));
    setIsModalPromptOpen(false);
    setPromptMessage(null);
    setCatgoryDelete(null);
  };

  const handleCreateModal = () => {
    setIsModalOpen(true);
    setIsCreate(true);
    setCategoryDetail(null);
  };

  const handleEditModal = (id) => {
    setIsModalOpen(true);
    setIsCreate(false);
    const product = categories.find((category) => category.id === id);
    setCategoryDetail(product);
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
        <div className="max-w-4xl mx-auto mt-10 bg-white shadow-md rounded-md overflow-hidden">
          <div className="bg-gradient-to-b from-gray-600 to-gray-700 text-white text-center py-4 text-2xl font-semibold">
            Category List
          </div>

          <div className="flex justify-end px-6 pt-4">
            <button
              onClick={handleCreateModal}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800"
            >
              <FaPlus /> Create New Category
            </button>
          </div>

          <div className="overflow-x-auto px-6 py-4">
            <table className="min-w-full table-auto border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left px-4 py-2 border">Category Name</th>
                  <th className="text-left px-4 py-2 border">Display Order</th>
                  <th className="text-left px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.displayOrder} className="border-t even:bg-gray-50">
                    <td className="px-4 py-2 border">{cat.name}</td>
                    <td className="px-4 py-2 border">{cat.displayOrder}</td>
                    <td className="px-4 py-2 border">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditModal(cat.id)}
                          className="flex items-center gap-1 px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          onClick={() => handleDeletePrompt(cat.id)}
                          className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500"
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <CategoryModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            isCreate={isCreate}
            categoryDetail = {categoryDetail}
        />
    </>
  );
};

export default CategoryList;
