import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useAxios } from '../../hook/useAxios';

const Login = () => {
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    useAxios()
      .post("/api/auth/signin", { phone_number: number, password: password })
      .then((response) => {
        toast.success(response?.data?.message);
        e.target.reset();
        navigate("/category");
        localStorage.setItem("token", response?.data?.data?.tokens?.accessToken?.token);
      })
      .catch((err) => {
        const errorMessage = err.response?.data?.message;
        toast.error(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 w-[100%]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm px-3">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex justify-center">
            <input
              className="w-[90%] p-2 border border-gray-300 rounded hover:scale-105 hover:border-blue-500 focus:shadow-md text-blue-600 focus:shadow-blue-500 transition duration-300 outline-none caret-blue-500"
              onChange={(e) => setNumber(e.target.value)}
              type="number"
              value={number}
              minLength={3}
              placeholder="Number"
              aria-label="Phone Number"
              required
            />
          </div>
          <div className="mb-6 flex justify-center">
            <input
              className="w-[90%] p-2 border duration-300 border-gray-300 hover:scale-105 hover:border-blue-500 rounded outline-none caret-blue-500 focus:shadow-md text-blue-600 focus:shadow-blue-500"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              value={password}
              minLength={3}
              placeholder="Password"
              aria-label="Password"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full p-2 text-white bg-blue-500 rounded hover:scale-105 hover:bg-blue-600 transition duration-300 ${loading ? " cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <ClipLoader color="white" loading={loading} size={18} />
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
