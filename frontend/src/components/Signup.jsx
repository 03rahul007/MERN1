import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response =
      await fetch(`http://localhost:3000/`
      // await fetch(`${window.location.origin}`
      , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, desc }),
      });

      // Check if the response is in JSON format
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();

        if (!response.ok) {
          // Set error from server response
          setError(result.error || "An error occurred");
        } else {
          // Reset form values and clear the error
          setError("");
          setName("");
          setEmail("");
          setDesc("");
          // Navigate to /posts
          navigate("/posts");
        }
      } else {
        // Handle non-JSON responses
        const errorText = await response.text(); // Fetch the plain text error
        setError(errorText || "An error occurred");
        console.error("Expected JSON but received:", errorText);
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("Error:", error);
      setError("An unexpected error occurred");
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(""); // Clear the error after 3 seconds
      }, 3000);

      // Clear timeout if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [error]);
  return (
    <>
 {error && (
        <span className="p-4 my-4 rounded-lg bg-red-400 text-md self-center flex">
          {error}
        </span>
      )}
              <div className="bg-zinc-900 h-screen w-full text-white font-serif flex  flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex justify-center border border-gray-800 w-[50rem] rounded-lg p-7"
        >
        <div className="flex flex-col gap-3 items-center justify-center">
        <h1 className="text-4xl">Create a Post</h1>
          <input
            type="text"
            username="username"
            value={username}
            onChange={(e) => setName(e.target.value)}
            className="p-4 outline-none bg-transparent border rounded-md w-[40rem] border-gray-800"
            placeholder="Enter your username..."
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
            placeholder="Enter your Description..."
            required
          />
          <button
            type="submit"
            className="p-4 bg-indigo-600 rounded-md w-[10rem] text-white transition-transform transform hover:scale-105 hover:bg-indigo-700"
          >
            Submit
          </button>
        </div>
      </form>
        </div>
    </>
  );
};

export default Signup;