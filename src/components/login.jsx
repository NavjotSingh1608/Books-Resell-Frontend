import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("email", credentials.email);
    formData.append("password", credentials.password);

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.message === "Login successful") {
        localStorage.setItem("email", credentials.email);

        const role = response.data.user?.role;
        if (role === "seller") {
          navigate("/dashboard");
        } else if (role === "buyer") {
          navigate("/shop");
        }
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (

    <section className="min-h-screen bg-white dark:bg-gray-900 flex">

      <div className="hidden lg:block w-1/2 h-screen overflow-hidden">
        <img
          src="/login.jpg"
          alt="login Illustration"
          className="w-full h-full object-cover"
        />
      </div>


      <div className="flex items-center justify-center w-full lg:w-1/2 px-6">
        <section className="bg-white dark:bg-gray-900">
          <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
            <form className="w-full max-w-md" onSubmit={handleSubmit}>
              <div className="flex items-center justify-center mt-6">
                <Link
                  to="/login"
                  className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white"
                >
                  Sign In
                </Link>

                <Link
                  to="/signup"
                  className="w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300"
                >
                  Sign Up
                </Link>
              </div>

              {error && <p className="mt-4 text-center text-red-600">{error}</p>}

              <div className="relative flex items-center mt-8">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>

                <input
                  type="email"
                  placeholder="Email address"
                  className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  value={credentials.email}
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="relative flex items-center mt-4">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </span>

                <input
                  type="password"
                  placeholder="Password"
                  className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>

                <div className="mt-6 text-center">
                  <Link
                    to="/signup"
                    className="text-sm text-blue-500 hover:underline dark:text-blue-400"
                  >
                    Don’t have an account yet? Sign up
                  </Link>
                </div>
                {/* <div className="mt-6 text-center">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-500 hover:underline dark:text-blue-400"
              >
                Forgot your password?
              </Link>
            </div> */}
                <div className="mt-6 text-center w-full">
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="text-sm text-white hover:underline dark:text-gray-400 b-2 h-full py-2 px-2  bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">

                    Go to Home
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>

      </div>
    </section>

  );
};

export default Login;
