import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Notifications/Alert";
import Warning from "../components/Notifications/Warning";
import { fetchProducts } from "../features/products/productSlice";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const dispatch = useDispatch();
     const navigate = useNavigate();

  const [isModalWarningOpen, setIsModalWarningOpen] = useState(false);
  const [warningMessage, setWarningMessage] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    // Handle login logic here
    const result = await dispatch(loginUser({ email, password }));

    if (result) {
      setSuccess(true);
      setIsModalOpen(true);
      setSuccessMessage("Logged in successfully");
      // @ts-ignore
      console.log("Logged in successfully");
      dispatch(fetchProducts());
    } else {
      setSuccess(false);
      setIsModalWarningOpen(true);
      setWarningMessage("Login failed, Invalid Username or Password");
      return;
    }
  };

  const onClose = () => {
    setIsModalOpen(false);
    setIsModalWarningOpen(false);
    setSuccessMessage(null);
    setWarningMessage(null);
    if (success) navigate("/dashboard");
  };

  return (
    <>
      <Warning
        isOpen={isModalWarningOpen}
        message={warningMessage}
        onClose={onClose}
      />
      <Alert isOpen={isModalOpen} message={successMessage} onClose={onClose} />

      <div className="h-screen">
        <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-md overflow-hidden">
          <div className="bg-gradient-to-b from-gray-600 to-gray-700 text-white py-6 text-center">
            <h2 className="text-2xl font-semibold">Log in</h2>
          </div>
          <form onSubmit={handleLogin} className="p-6 space-y-4">
            <p className="text-center text-gray-700 mb-2">
              Welcome to BulkyBooks
            </p>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            />

            <button
              type="submit"
              className="w-full bg-gray-800 text-white font-semibold py-2 rounded-md hover:bg-gray-900"
            >
              LOG IN
            </button>

            <div className="flex justify-between text-sm mt-2 text-green-600">
              <a href="/register" className="hover:underline">
                Register as a new user
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
