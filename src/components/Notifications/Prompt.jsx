import { useEffect } from "react";

const Prompt = ({ isOpen, message, onConfirm, onCancel }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onCancel(); // Auto-cancel after 7 seconds
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onCancel]);

  return (
    <div
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-xl min-w-[300px] max-w-[400px] flex flex-col items-center bg-gray-900 text-white transition-all duration-300 ease-in-out ${
        isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
      }`}
    >
      <span className="text-sm font-medium mb-3">{message}</span>
      <div className="flex gap-3">
        <button
          onClick={onConfirm}
          className="bg-green-500 px-4 py-1 rounded text-white hover:bg-green-700 transition duration-300"
        >
          OK
        </button>
        <button
          onClick={onCancel}
          className="bg-red-500 px-4 py-1 rounded text-white hover:bg-red-700 transition duration-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Prompt;
