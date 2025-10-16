"use client";
import React from "react";
import { signIn } from "next-auth/react";

const Login = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (result.error) {
      console.log(result.error);
    }

    if (result.ok) {
      console.log("Login successful");
      window.location.href = "/";
    }
  };

  return (
    <>
      <form
        onSubmit={handleLogin}
        className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => {
              e.preventDefault();
              setFormData({ ...formData, email: e.target.value });
            }}
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            value={formData.password}
            placeholder="Enter your password"
            onChange={(e) => {
              e.preventDefault();
              setFormData({ ...formData, password: e.target.value });
            }}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;