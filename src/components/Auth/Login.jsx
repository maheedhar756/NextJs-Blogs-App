"use client";
import React, { useState } from 'react'
import { signIn } from "next-auth/react";

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handlelogin = async (e) => {
    e.preventDefault();

    const result = await signIn("Credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    })
    if(result.error){
      console.log(result.error);
    }
    if(result.ok){
      console.log(result);
      window.location.href = "/";
    }
  }

  return (
    <>
      <form onSubmit={handlelogin} className="max-w-md mx-auto mt-10 p-6 border border-grey-300 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input 
            className="w-full p-2 border border-gray-300 rounded-md"
            type="email"
            placeholder="Enter your Email" />
        </div>
      </form>
    </>
  )
}

export default Login
