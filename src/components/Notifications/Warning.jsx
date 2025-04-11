import { useEffect } from "react";

const Warning = ({ isOpen, message, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-xl min-w-[300px] max-w-[400px] flex items-center justify-between bg-yellow-500 text-black transition-all duration-300 ease-in-out ${
        isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none z-600"
      }`}
    >
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

export default Warning;
