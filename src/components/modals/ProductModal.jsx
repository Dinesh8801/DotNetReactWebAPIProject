import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  modifyProduct,
  createProduct,
} from "../../features/products/productSlice";
import Alert from "../Notifications/Alert";
import Warning from "../Notifications/Warning";

const ProductModal = ({
  isOpen,
  onClose,
  isCreate,
  productDetail,
  categories,
}) => {
  const [title, setTitle] = useState(null);
  const [id, setProductId] = useState(null);
  const [description, setDescription] = useState(null);
  const [isbn, setIsbn] = useState(null);
  const [author, setAuthor] = useState(null);
  const [listPrice, setListPrice] = useState(null);
  const [price, setPrice] = useState(null);
  const [price50, setPrice50] = useState(null);
  const [price100, setPrice100] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [categoryId, setProductCategory] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const [isModalWarningOpen, setIsModalWarningOpen] = useState(false);
  const [warningMessage, setWarningMessage] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (productDetail) {
      setProductId(productDetail.id);
      setTitle(productDetail.title);
      setDescription(productDetail.description);
      setIsbn(productDetail.isbn);
      setAuthor(productDetail.author);
      setListPrice(productDetail.listPrice);
      setPrice(productDetail.price);
      setPrice50(productDetail.price50);
      setPrice100(productDetail.price100);
      setImageUrl(productDetail.imageUrl);
      setProductCategory(productDetail.categoryId);
    } else {
      setProductId(null);
      setTitle(null);
      setDescription(null);
      setIsbn(null);
      setAuthor(null);
      setListPrice(null);
      setPrice(null);
      setPrice50(null);
      setPrice100(null);
      setImageUrl(null);
      setProductCategory(null);
    }
  }, [productDetail]);

  const handleEdit = async (e) => {
    e.preventDefault();

    if (
      !title?.trim() ||
      !description?.trim() ||
      !isbn?.trim() ||
      !author?.trim() ||
      listPrice == null ||
      listPrice === "" ||
      price == null ||
      price === "" ||
      price50 == null ||
      price50 === "" ||
      price100 == null ||
      price100 === "" ||
      !imageUrl?.trim() ||
      !categoryId
    ) {
      setIsModalWarningOpen(true);
      setWarningMessage("All fields are required!");
      return;
    }
    // @ts-ignore
    const result = await dispatch(
      modifyProduct(id, {
        id,
        title,
        description,
        isbn,
        author,
        listPrice,
        price,
        price50,
        price100,
        imageUrl,
        categoryId,
      })
    );
    if (result.status === 204) {
      setIsModalOpen(true);
      setSuccessMessage("Product updated successfully");
    } else {
      setIsModalOpen(true);
      setSuccessMessage("Failded to update Product");
    }
    onClose();
  };

  const onCloseAlert = () => {
    setIsModalOpen(false);
    setSuccessMessage(null);
  };

  const onCloseWarning = () => {
    setIsModalWarningOpen(false);
    setWarningMessage(null);
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (
      !title?.trim() ||
      !description?.trim() ||
      !isbn?.trim() ||
      !author?.trim() ||
      listPrice == null ||
      listPrice === "" ||
      price == null ||
      price === "" ||
      price50 == null ||
      price50 === "" ||
      price100 == null ||
      price100 === "" ||
      !imageUrl?.trim() ||
      !categoryId
    ) {
      setIsModalWarningOpen(true);
      setWarningMessage("All fields are required!");
      return;
    }
    // @ts-ignore
    const result = await dispatch(
      createProduct({
        id: Number(id),
        title: title.trim(),
        description: description.trim(),
        isbn: isbn.trim(),
        author: author.trim(),
        listPrice: Number(listPrice),
        price: Number(price),
        price50: Number(price50),
        price100: Number(price100),
        imageUrl: imageUrl.trim(),
        categoryId: Number(categoryId),
      })
    );
    if (result.status === 201) {
      setIsModalOpen(true);
      setSuccessMessage("Product Created successfully");
    } else {
      setIsModalOpen(true);
      setSuccessMessage("Failed to create Product");
    }
    onClose();
  };

  return (
    <>
      {/* <Warning
        isOpen={isModalWarningOpen}
        message={warningMessage}
        onClose={onCloseWarning}
      /> */}
      {/* <Alert
        isOpen={isModalOpen}
        message={successMessage}
        onClose={onCloseAlert}
      /> */}
      {isOpen && (
        <div className="fixed top-0 right-0 left-0 z-500 flex justify-center items-center w-full h-screen bg-opacity-100">
          <div className="relative p-4 w-full max-w-md rounded-lg shadow-3xl bg-gray-100">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 text-black">
                {isCreate ? "Create New " : "Update "}Product
              </h3>
              <button
                type="button"
                className="text-red-400 bg-gray-500 rounded-lg p-2 pt-1 hover:bg-gray-600 text-lg"
                style={{ cursor: "pointer" }}
                onClick={onClose}
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <form
              className="p-4"
              onSubmit={isCreate ? handleCreate : handleEdit}
            >
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 text-black">
                    Title
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={title ?? ""}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 text-black">
                    Description
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={description ?? ""}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 text-black">
                    ISBN
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={isbn ?? ""}
                    onChange={(e) => setIsbn(e.target.value)}
                    placeholder="ISBN"
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 text-black">
                    Author
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={author ?? ""}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Author"
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 text-black">
                    List Price
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={listPrice ?? ""}
                    onChange={(e) => setListPrice(e.target.value)}
                    placeholder="List Price"
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 text-black">
                    Price
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={price ?? ""}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 text-black">
                    Price50
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={price50 ?? ""}
                    onChange={(e) => setPrice50(e.target.value)}
                    placeholder="Price50"
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 text-black">
                    Price100
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={price100 ?? ""}
                    onChange={(e) => setPrice100(e.target.value)}
                    placeholder="Price100"
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 text-black">
                    ImageUel
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full p-2 border rounded"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        const fileName = file.name;

                        // Just store the path as /images/filename.jpg
                        setImageUrl(`/images/${fileName}`);
                      }
                    }}
                    required={isCreate}
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 text-black">
                    Category
                  </label>
                  <select
                    className="w-full p-2 border rounded"
                    value={categoryId ?? ""}
                    onChange={(e) => setProductCategory(e.target.value)}
                  >
                    <option value={""}>Select Category</option>
                    {categories.map((category) => (
                      <option key={category.name} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-700 text-white p-2 rounded hover:bg-blue-800"
              >
                {isCreate ? "Add New " : "Update "}Product
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductModal;
