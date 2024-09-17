import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [desc, setDesc] = useState("");


  console.log(name, email, desc);
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, desc }),
      });

      const result = await response.json();
      Navigate("/dashboard");
      console.log("Response:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <form
    onSubmit={handleSubmit}
      className="all bg-zinc-900 h-screen w-full text-white font-serif flex justify-center items-center"
    >
      <div className="flex flex-col gap-3 items-center justify-center">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-4 outline-none bg-transparent border rounded-md w-[40rem] border-gray-800"
          placeholder="Enter your name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-4 outline-none bg-transparent border rounded-md w-[40rem] border-gray-800"
          placeholder="Enter your email"
          required
        />
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="p-4 outline-none bg-transparent border rounded-md w-[40rem] border-gray-800"
          placeholder="Enter your password"
          required
        />
        <button
          type="submit"
          className="p-4 bg-indigo-600 rounded-md w-[10rem] text-white transition-transform transform hover:scale-105 hover:bg-indigo-700"
        >
          <Link to="/login">
          Submit
          </Link>
        </button>
      </div>
    </form>
  );
};

export default Login;
