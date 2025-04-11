import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { modifyCategory, createCategory } from "../../features/categories/categorySlice";
import Alert from "../Notifications/Alert";
import Warning from "../Notifications/Warning";

const CategoryModal = ({ 
    isOpen, 
    onClose,
    isCreate,
    categoryDetail
}) => {
    const [name, setCategoryName] = useState("");
    const [displayOrder, setDisplayOrder] = useState(0);
    const [id, setCategoryId] = useState(null);
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);

    const [isModalWarningOpen, setIsModalWarningOpen] = useState(false);
    const [warningMessage, setWarningMessage] = useState(null);

    useEffect(() => {
        if (categoryDetail) {
            setCategoryId(categoryDetail.id);
            setCategoryName(categoryDetail.name);
            setDisplayOrder(categoryDetail.displayOrder);
        } else {
            setCategoryId(null);
            setCategoryName(null);
            setDisplayOrder(null);
        }
    }, [categoryDetail]);

    const handleEdit = async (e) => {
        e.preventDefault();
        if (!name || !name.trim()) {
            setIsModalWarningOpen(true);
            setWarningMessage("Category name is required!");
            return;
        }
        
        if(!displayOrder) {
            setIsModalWarningOpen(true);
            setWarningMessage("Display Order is required!");
            return;
        }
        // @ts-ignore
        const result = await dispatch(modifyCategory(id, { id, name, displayOrder }));
        if(result.status === 204){
            setIsModalOpen(true);
            setSuccessMessage("Category updated successfully");
        } else {
            setIsModalOpen(true);
            setSuccessMessage("Failded to update Category");
        }
        onClose();
    };

    const onCloseAlert = () => {
        setIsModalOpen(false)
        setSuccessMessage(null)
    }

    const onCloseWarning = () => {
        setIsModalWarningOpen(false)
        setWarningMessage(null)
    }

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!name.trim()) {
            setIsModalWarningOpen(true);
            setWarningMessage("Category name is required!");
            return;
        }
        if(!displayOrder) {
            setIsModalWarningOpen(true);
            setWarningMessage("Display Order is required!");
            return;
        }
        // @ts-ignore
        const result = await dispatch(createCategory({ name, displayOrder }));
        if(result.status === 201){
            setIsModalOpen(true);
            setSuccessMessage("Catefory Created successfully");
        } else {
            setIsModalOpen(true);
            setSuccessMessage("Failded to create Category");
        }
        onClose();
    };

    return (
        <>
            {/* <Warning 
                isOpen = {isModalWarningOpen}
                message = {warningMessage}
                onClose={onCloseWarning}
            />
            <Alert 
                isOpen = {isModalOpen}
                message = {successMessage}
                onClose={onCloseAlert} 
            /> */}
            {isOpen && (
                <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-opacity-100">
                    <div className="relative p-4 w-full max-w-md rounded-lg shadow-3xl bg-gray-100">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 text-black">
                                {isCreate ? "Create New " : "Update "} Category
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
                        <form className="p-4" onSubmit={isCreate ? handleCreate : handleEdit}>
                            <div className="grid gap-4 mb-4">
                                <div className="col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 text-black">Category Name</label>
                                    <input 
                                        type="text" 
                                        className="w-full p-2 border rounded" 
                                        value={name ?? ""} 
                                        onChange={(e) => setCategoryName(e.target.value)}
                                        placeholder="Category Name" 
                                        required 
                                    />
                                    <label className="block mb-2 text-sm font-medium text-gray-900 text-black">Display Order</label>
                                    <input 
                                        type="number" 
                                        className="w-full p-2 border rounded" 
                                        value={displayOrder ?? ""} 
                                        onChange={(e) => setDisplayOrder(e.target.value)}
                                        placeholder="Display Order" 
                                        required 
                                    />
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-blue-900 text-white p-2 rounded hover:bg-blue-800">
                                {isCreate ? "Add New " : "Update "} Category
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default CategoryModal;
