import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import React from "react";
import Alert from "../components/Notifications/Alert";
import Warning from "../components/Notifications/Warning";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const [isModalWarningOpen, setIsModalWarningOpen] = useState(false);
  const [warningMessage, setWarningMessage] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    //@ts-ignore
    const result = await dispatch(
      registerUser({ firstName, lastName, email, password, confirmPassword, role })
    );
    if (result) {
      setSuccess(true);
      setIsModalOpen(true);
      setSuccessMessage("Registered successfully");
    } else {
      setSuccess(false);
      setIsModalWarningOpen(true);
      setWarningMessage("Registration failed user already exists");
    }
  };

  const onClose = () => {
    setIsModalOpen(false);
    setIsModalWarningOpen(false);
    setSuccessMessage(null);
    setWarningMessage(null);
    if (success) navigate("/login");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(""); // Clear error when user types
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);

    // Check if passwords match
    if (password !== e.target.value) {
      setError("Passwords do not match!");
    } else {
      setError(""); // Clear error if they match
    }
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
      <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-md overflow-hidden">
        <div className="bg-gradient-to-b from-gray-600 to-gray-700 text-white py-6 text-center">
          <h2 className="text-2xl font-semibold">Register</h2>
        </div>
        <form onSubmit={handleRegister} className="p-6 space-y-4">
          <p className="text-center text-gray-700 text-lg">
            Create a new account.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-2 border rounded mb-2"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-2 border rounded mb-2"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded mb-2"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full p-2 border rounded mb-2"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="w-full p-2 border rounded mb-2"
              required
            />
            <select
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="input-field"
            >
              <option value="">-Select Role-</option>
              <option value="Customer">Customer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white font-semibold py-2 rounded-md hover:bg-gray-900 mt-4"
          >
            REGISTER
          </button>
        </form>
      </div>
      </div>
    </>
  );
};

export default Register;
