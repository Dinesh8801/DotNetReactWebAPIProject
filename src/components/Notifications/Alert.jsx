import { useEffect } from "react";

const Alert = ({ isOpen, message, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-xl min-w-[300px] max-w-[400px] flex items-center justify-between bg-gray-800 text-white transition-all duration-300 ease-in-out ${
        isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
      }`}
    >
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-4 bg-blue-500 px-3 py-1 rounded text-white hover:bg-blue-800 transition duration-300"
      >
        OK
      </button>
    </div>
  );
};

export default Alert;